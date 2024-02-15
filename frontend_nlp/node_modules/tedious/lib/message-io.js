"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativeDuplexpair = _interopRequireDefault(require("native-duplexpair"));

var tls = _interopRequireWildcard(require("tls"));

var _events = require("events");

var _message = _interopRequireDefault(require("./message"));

var _packet = require("./packet");

var _incomingMessageStream = _interopRequireDefault(require("./incoming-message-stream"));

var _outgoingMessageStream = _interopRequireDefault(require("./outgoing-message-stream"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageIO extends _events.EventEmitter {
  constructor(socket, packetSize, debug) {
    super();
    this.socket = void 0;
    this.debug = void 0;
    this.tlsNegotiationComplete = void 0;
    this.incomingMessageStream = void 0;
    this.outgoingMessageStream = void 0;
    this.securePair = void 0;
    this.incomingMessageIterator = void 0;
    this.socket = socket;
    this.debug = debug;
    this.tlsNegotiationComplete = false;
    this.incomingMessageStream = new _incomingMessageStream.default(this.debug);
    this.incomingMessageIterator = this.incomingMessageStream[Symbol.asyncIterator]();
    this.outgoingMessageStream = new _outgoingMessageStream.default(this.debug, {
      packetSize: packetSize
    });
    this.socket.pipe(this.incomingMessageStream);
    this.outgoingMessageStream.pipe(this.socket);
  }

  packetSize(...args) {
    if (args.length > 0) {
      const packetSize = args[0];
      this.debug.log('Packet size changed from ' + this.outgoingMessageStream.packetSize + ' to ' + packetSize);
      this.outgoingMessageStream.packetSize = packetSize;
    }

    if (this.securePair) {
      this.securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
    }

    return this.outgoingMessageStream.packetSize;
  } // Negotiate TLS encryption.


  startTls(credentialsDetails, hostname, trustServerCertificate) {
    if (!credentialsDetails.maxVersion || !['TLSv1.2', 'TLSv1.1', 'TLSv1'].includes(credentialsDetails.maxVersion)) {
      credentialsDetails.maxVersion = 'TLSv1.2';
    }

    const secureContext = tls.createSecureContext(credentialsDetails);
    return new Promise((resolve, reject) => {
      const duplexpair = new _nativeDuplexpair.default();
      const securePair = this.securePair = {
        cleartext: tls.connect({
          socket: duplexpair.socket1,
          servername: hostname,
          secureContext: secureContext,
          rejectUnauthorized: !trustServerCertificate
        }),
        encrypted: duplexpair.socket2
      };

      const onSecureConnect = () => {
        securePair.encrypted.removeListener('readable', onReadable);
        securePair.cleartext.removeListener('error', onError);
        securePair.cleartext.removeListener('secureConnect', onSecureConnect); // If we encounter any errors from this point on,
        // we just forward them to the actual network socket.

        securePair.cleartext.once('error', err => {
          this.socket.destroy(err);
        });
        const cipher = securePair.cleartext.getCipher();

        if (cipher) {
          this.debug.log('TLS negotiated (' + cipher.name + ', ' + cipher.version + ')');
        }

        this.emit('secure', securePair.cleartext);
        securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
        this.outgoingMessageStream.unpipe(this.socket);
        this.socket.unpipe(this.incomingMessageStream);
        this.socket.pipe(securePair.encrypted);
        securePair.encrypted.pipe(this.socket);
        securePair.cleartext.pipe(this.incomingMessageStream);
        this.outgoingMessageStream.pipe(securePair.cleartext);
        this.tlsNegotiationComplete = true;
        resolve();
      };

      const onError = err => {
        securePair.encrypted.removeListener('readable', onReadable);
        securePair.cleartext.removeListener('error', onError);
        securePair.cleartext.removeListener('secureConnect', onSecureConnect);
        securePair.cleartext.destroy();
        securePair.encrypted.destroy();
        reject(err);
      };

      const onReadable = () => {
        // When there is handshake data on the encryped stream of the secure pair,
        // we wrap it into a `PRELOGIN` message and send it to the server.
        //
        // For each `PRELOGIN` message we sent we get back exactly one response message
        // that contains the server's handshake response data.
        const message = new _message.default({
          type: _packet.TYPE.PRELOGIN,
          resetConnection: false
        });
        let chunk;

        while (chunk = securePair.encrypted.read()) {
          message.write(chunk);
        }

        this.outgoingMessageStream.write(message);
        message.end();
        this.readMessage().then(async response => {
          // Setup readable handler for the next round of handshaking.
          // If we encounter a `secureConnect` on the cleartext side
          // of the secure pair, the `readable` handler is cleared
          // and no further handshake handling will happen.
          securePair.encrypted.once('readable', onReadable);

          for await (const data of response) {
            // We feed the server's handshake response back into the
            // encrypted end of the secure pair.
            securePair.encrypted.write(data);
          }
        }).catch(onError);
      };

      securePair.cleartext.once('error', onError);
      securePair.cleartext.once('secureConnect', onSecureConnect);
      securePair.encrypted.once('readable', onReadable);
    });
  } // TODO listen for 'drain' event when socket.write returns false.
  // TODO implement incomplete request cancelation (2.2.1.6)


  sendMessage(packetType, data, resetConnection) {
    const message = new _message.default({
      type: packetType,
      resetConnection: resetConnection
    });
    message.end(data);
    this.outgoingMessageStream.write(message);
    return message;
  }
  /**
   * Read the next incoming message from the socket.
   */


  async readMessage() {
    const result = await this.incomingMessageIterator.next();

    if (result.done) {
      throw new Error('unexpected end of message stream');
    }

    return result.value;
  }

}

var _default = MessageIO;
exports.default = _default;
module.exports = MessageIO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNZXNzYWdlSU8iLCJFdmVudEVtaXR0ZXIiLCJjb25zdHJ1Y3RvciIsInNvY2tldCIsInBhY2tldFNpemUiLCJkZWJ1ZyIsInRsc05lZ290aWF0aW9uQ29tcGxldGUiLCJpbmNvbWluZ01lc3NhZ2VTdHJlYW0iLCJvdXRnb2luZ01lc3NhZ2VTdHJlYW0iLCJzZWN1cmVQYWlyIiwiaW5jb21pbmdNZXNzYWdlSXRlcmF0b3IiLCJJbmNvbWluZ01lc3NhZ2VTdHJlYW0iLCJTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwiT3V0Z29pbmdNZXNzYWdlU3RyZWFtIiwicGlwZSIsImFyZ3MiLCJsZW5ndGgiLCJsb2ciLCJjbGVhcnRleHQiLCJzZXRNYXhTZW5kRnJhZ21lbnQiLCJzdGFydFRscyIsImNyZWRlbnRpYWxzRGV0YWlscyIsImhvc3RuYW1lIiwidHJ1c3RTZXJ2ZXJDZXJ0aWZpY2F0ZSIsIm1heFZlcnNpb24iLCJpbmNsdWRlcyIsInNlY3VyZUNvbnRleHQiLCJ0bHMiLCJjcmVhdGVTZWN1cmVDb250ZXh0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkdXBsZXhwYWlyIiwiRHVwbGV4UGFpciIsImNvbm5lY3QiLCJzb2NrZXQxIiwic2VydmVybmFtZSIsInJlamVjdFVuYXV0aG9yaXplZCIsImVuY3J5cHRlZCIsInNvY2tldDIiLCJvblNlY3VyZUNvbm5lY3QiLCJyZW1vdmVMaXN0ZW5lciIsIm9uUmVhZGFibGUiLCJvbkVycm9yIiwib25jZSIsImVyciIsImRlc3Ryb3kiLCJjaXBoZXIiLCJnZXRDaXBoZXIiLCJuYW1lIiwidmVyc2lvbiIsImVtaXQiLCJ1bnBpcGUiLCJtZXNzYWdlIiwiTWVzc2FnZSIsInR5cGUiLCJUWVBFIiwiUFJFTE9HSU4iLCJyZXNldENvbm5lY3Rpb24iLCJjaHVuayIsInJlYWQiLCJ3cml0ZSIsImVuZCIsInJlYWRNZXNzYWdlIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwic2VuZE1lc3NhZ2UiLCJwYWNrZXRUeXBlIiwicmVzdWx0IiwibmV4dCIsImRvbmUiLCJFcnJvciIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLWlvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEdXBsZXhQYWlyIGZyb20gJ25hdGl2ZS1kdXBsZXhwYWlyJztcblxuaW1wb3J0IHsgRHVwbGV4IH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCAqIGFzIHRscyBmcm9tICd0bHMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmV0JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCBEZWJ1ZyBmcm9tICcuL2RlYnVnJztcblxuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tZXNzYWdlJztcbmltcG9ydCB7IFRZUEUgfSBmcm9tICcuL3BhY2tldCc7XG5cbmltcG9ydCBJbmNvbWluZ01lc3NhZ2VTdHJlYW0gZnJvbSAnLi9pbmNvbWluZy1tZXNzYWdlLXN0cmVhbSc7XG5pbXBvcnQgT3V0Z29pbmdNZXNzYWdlU3RyZWFtIGZyb20gJy4vb3V0Z29pbmctbWVzc2FnZS1zdHJlYW0nO1xuXG5jbGFzcyBNZXNzYWdlSU8gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgZGVidWc6IERlYnVnO1xuXG4gIHRsc05lZ290aWF0aW9uQ29tcGxldGU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBpbmNvbWluZ01lc3NhZ2VTdHJlYW06IEluY29taW5nTWVzc2FnZVN0cmVhbTtcbiAgb3V0Z29pbmdNZXNzYWdlU3RyZWFtOiBPdXRnb2luZ01lc3NhZ2VTdHJlYW07XG5cbiAgc2VjdXJlUGFpcj86IHtcbiAgICBjbGVhcnRleHQ6IHRscy5UTFNTb2NrZXQ7XG4gICAgZW5jcnlwdGVkOiBEdXBsZXg7XG4gIH1cblxuICBpbmNvbWluZ01lc3NhZ2VJdGVyYXRvcjogQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPE1lc3NhZ2U+O1xuXG4gIGNvbnN0cnVjdG9yKHNvY2tldDogU29ja2V0LCBwYWNrZXRTaXplOiBudW1iZXIsIGRlYnVnOiBEZWJ1Zykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICB0aGlzLmRlYnVnID0gZGVidWc7XG5cbiAgICB0aGlzLnRsc05lZ290aWF0aW9uQ29tcGxldGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaW5jb21pbmdNZXNzYWdlU3RyZWFtID0gbmV3IEluY29taW5nTWVzc2FnZVN0cmVhbSh0aGlzLmRlYnVnKTtcbiAgICB0aGlzLmluY29taW5nTWVzc2FnZUl0ZXJhdG9yID0gdGhpcy5pbmNvbWluZ01lc3NhZ2VTdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG5cbiAgICB0aGlzLm91dGdvaW5nTWVzc2FnZVN0cmVhbSA9IG5ldyBPdXRnb2luZ01lc3NhZ2VTdHJlYW0odGhpcy5kZWJ1ZywgeyBwYWNrZXRTaXplOiBwYWNrZXRTaXplIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQucGlwZSh0aGlzLmluY29taW5nTWVzc2FnZVN0cmVhbSk7XG4gICAgdGhpcy5vdXRnb2luZ01lc3NhZ2VTdHJlYW0ucGlwZSh0aGlzLnNvY2tldCk7XG4gIH1cblxuICBwYWNrZXRTaXplKC4uLmFyZ3M6IFtudW1iZXJdKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcGFja2V0U2l6ZSA9IGFyZ3NbMF07XG4gICAgICB0aGlzLmRlYnVnLmxvZygnUGFja2V0IHNpemUgY2hhbmdlZCBmcm9tICcgKyB0aGlzLm91dGdvaW5nTWVzc2FnZVN0cmVhbS5wYWNrZXRTaXplICsgJyB0byAnICsgcGFja2V0U2l6ZSk7XG4gICAgICB0aGlzLm91dGdvaW5nTWVzc2FnZVN0cmVhbS5wYWNrZXRTaXplID0gcGFja2V0U2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWN1cmVQYWlyKSB7XG4gICAgICB0aGlzLnNlY3VyZVBhaXIuY2xlYXJ0ZXh0LnNldE1heFNlbmRGcmFnbWVudCh0aGlzLm91dGdvaW5nTWVzc2FnZVN0cmVhbS5wYWNrZXRTaXplKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vdXRnb2luZ01lc3NhZ2VTdHJlYW0ucGFja2V0U2l6ZTtcbiAgfVxuXG4gIC8vIE5lZ290aWF0ZSBUTFMgZW5jcnlwdGlvbi5cbiAgc3RhcnRUbHMoY3JlZGVudGlhbHNEZXRhaWxzOiB0bHMuU2VjdXJlQ29udGV4dE9wdGlvbnMsIGhvc3RuYW1lOiBzdHJpbmcsIHRydXN0U2VydmVyQ2VydGlmaWNhdGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIWNyZWRlbnRpYWxzRGV0YWlscy5tYXhWZXJzaW9uIHx8ICFbJ1RMU3YxLjInLCAnVExTdjEuMScsICdUTFN2MSddLmluY2x1ZGVzKGNyZWRlbnRpYWxzRGV0YWlscy5tYXhWZXJzaW9uKSkge1xuICAgICAgY3JlZGVudGlhbHNEZXRhaWxzLm1heFZlcnNpb24gPSAnVExTdjEuMic7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VjdXJlQ29udGV4dCA9IHRscy5jcmVhdGVTZWN1cmVDb250ZXh0KGNyZWRlbnRpYWxzRGV0YWlscyk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZHVwbGV4cGFpciA9IG5ldyBEdXBsZXhQYWlyKCk7XG4gICAgICBjb25zdCBzZWN1cmVQYWlyID0gdGhpcy5zZWN1cmVQYWlyID0ge1xuICAgICAgICBjbGVhcnRleHQ6IHRscy5jb25uZWN0KHtcbiAgICAgICAgICBzb2NrZXQ6IGR1cGxleHBhaXIuc29ja2V0MSBhcyBTb2NrZXQsXG4gICAgICAgICAgc2VydmVybmFtZTogaG9zdG5hbWUsXG4gICAgICAgICAgc2VjdXJlQ29udGV4dDogc2VjdXJlQ29udGV4dCxcbiAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6ICF0cnVzdFNlcnZlckNlcnRpZmljYXRlXG4gICAgICAgIH0pLFxuICAgICAgICBlbmNyeXB0ZWQ6IGR1cGxleHBhaXIuc29ja2V0MlxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25TZWN1cmVDb25uZWN0ID0gKCkgPT4ge1xuICAgICAgICBzZWN1cmVQYWlyLmVuY3J5cHRlZC5yZW1vdmVMaXN0ZW5lcigncmVhZGFibGUnLCBvblJlYWRhYmxlKTtcbiAgICAgICAgc2VjdXJlUGFpci5jbGVhcnRleHQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHNlY3VyZVBhaXIuY2xlYXJ0ZXh0LnJlbW92ZUxpc3RlbmVyKCdzZWN1cmVDb25uZWN0Jywgb25TZWN1cmVDb25uZWN0KTtcblxuICAgICAgICAvLyBJZiB3ZSBlbmNvdW50ZXIgYW55IGVycm9ycyBmcm9tIHRoaXMgcG9pbnQgb24sXG4gICAgICAgIC8vIHdlIGp1c3QgZm9yd2FyZCB0aGVtIHRvIHRoZSBhY3R1YWwgbmV0d29yayBzb2NrZXQuXG4gICAgICAgIHNlY3VyZVBhaXIuY2xlYXJ0ZXh0Lm9uY2UoJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuc29ja2V0LmRlc3Ryb3koZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2lwaGVyID0gc2VjdXJlUGFpci5jbGVhcnRleHQuZ2V0Q2lwaGVyKCk7XG4gICAgICAgIGlmIChjaXBoZXIpIHtcbiAgICAgICAgICB0aGlzLmRlYnVnLmxvZygnVExTIG5lZ290aWF0ZWQgKCcgKyBjaXBoZXIubmFtZSArICcsICcgKyBjaXBoZXIudmVyc2lvbiArICcpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ3NlY3VyZScsIHNlY3VyZVBhaXIuY2xlYXJ0ZXh0KTtcblxuICAgICAgICBzZWN1cmVQYWlyLmNsZWFydGV4dC5zZXRNYXhTZW5kRnJhZ21lbnQodGhpcy5vdXRnb2luZ01lc3NhZ2VTdHJlYW0ucGFja2V0U2l6ZSk7XG5cbiAgICAgICAgdGhpcy5vdXRnb2luZ01lc3NhZ2VTdHJlYW0udW5waXBlKHRoaXMuc29ja2V0KTtcbiAgICAgICAgdGhpcy5zb2NrZXQudW5waXBlKHRoaXMuaW5jb21pbmdNZXNzYWdlU3RyZWFtKTtcblxuICAgICAgICB0aGlzLnNvY2tldC5waXBlKHNlY3VyZVBhaXIuZW5jcnlwdGVkKTtcbiAgICAgICAgc2VjdXJlUGFpci5lbmNyeXB0ZWQucGlwZSh0aGlzLnNvY2tldCk7XG5cbiAgICAgICAgc2VjdXJlUGFpci5jbGVhcnRleHQucGlwZSh0aGlzLmluY29taW5nTWVzc2FnZVN0cmVhbSk7XG4gICAgICAgIHRoaXMub3V0Z29pbmdNZXNzYWdlU3RyZWFtLnBpcGUoc2VjdXJlUGFpci5jbGVhcnRleHQpO1xuXG4gICAgICAgIHRoaXMudGxzTmVnb3RpYXRpb25Db21wbGV0ZSA9IHRydWU7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnI/OiBFcnJvcikgPT4ge1xuICAgICAgICBzZWN1cmVQYWlyLmVuY3J5cHRlZC5yZW1vdmVMaXN0ZW5lcigncmVhZGFibGUnLCBvblJlYWRhYmxlKTtcbiAgICAgICAgc2VjdXJlUGFpci5jbGVhcnRleHQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHNlY3VyZVBhaXIuY2xlYXJ0ZXh0LnJlbW92ZUxpc3RlbmVyKCdzZWN1cmVDb25uZWN0Jywgb25TZWN1cmVDb25uZWN0KTtcblxuICAgICAgICBzZWN1cmVQYWlyLmNsZWFydGV4dC5kZXN0cm95KCk7XG4gICAgICAgIHNlY3VyZVBhaXIuZW5jcnlwdGVkLmRlc3Ryb3koKTtcblxuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uUmVhZGFibGUgPSAoKSA9PiB7XG4gICAgICAgIC8vIFdoZW4gdGhlcmUgaXMgaGFuZHNoYWtlIGRhdGEgb24gdGhlIGVuY3J5cGVkIHN0cmVhbSBvZiB0aGUgc2VjdXJlIHBhaXIsXG4gICAgICAgIC8vIHdlIHdyYXAgaXQgaW50byBhIGBQUkVMT0dJTmAgbWVzc2FnZSBhbmQgc2VuZCBpdCB0byB0aGUgc2VydmVyLlxuICAgICAgICAvL1xuICAgICAgICAvLyBGb3IgZWFjaCBgUFJFTE9HSU5gIG1lc3NhZ2Ugd2Ugc2VudCB3ZSBnZXQgYmFjayBleGFjdGx5IG9uZSByZXNwb25zZSBtZXNzYWdlXG4gICAgICAgIC8vIHRoYXQgY29udGFpbnMgdGhlIHNlcnZlcidzIGhhbmRzaGFrZSByZXNwb25zZSBkYXRhLlxuICAgICAgICBjb25zdCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoeyB0eXBlOiBUWVBFLlBSRUxPR0lOLCByZXNldENvbm5lY3Rpb246IGZhbHNlIH0pO1xuXG4gICAgICAgIGxldCBjaHVuaztcbiAgICAgICAgd2hpbGUgKGNodW5rID0gc2VjdXJlUGFpci5lbmNyeXB0ZWQucmVhZCgpKSB7XG4gICAgICAgICAgbWVzc2FnZS53cml0ZShjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdXRnb2luZ01lc3NhZ2VTdHJlYW0ud3JpdGUobWVzc2FnZSk7XG4gICAgICAgIG1lc3NhZ2UuZW5kKCk7XG5cbiAgICAgICAgdGhpcy5yZWFkTWVzc2FnZSgpLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgLy8gU2V0dXAgcmVhZGFibGUgaGFuZGxlciBmb3IgdGhlIG5leHQgcm91bmQgb2YgaGFuZHNoYWtpbmcuXG4gICAgICAgICAgLy8gSWYgd2UgZW5jb3VudGVyIGEgYHNlY3VyZUNvbm5lY3RgIG9uIHRoZSBjbGVhcnRleHQgc2lkZVxuICAgICAgICAgIC8vIG9mIHRoZSBzZWN1cmUgcGFpciwgdGhlIGByZWFkYWJsZWAgaGFuZGxlciBpcyBjbGVhcmVkXG4gICAgICAgICAgLy8gYW5kIG5vIGZ1cnRoZXIgaGFuZHNoYWtlIGhhbmRsaW5nIHdpbGwgaGFwcGVuLlxuICAgICAgICAgIHNlY3VyZVBhaXIuZW5jcnlwdGVkLm9uY2UoJ3JlYWRhYmxlJywgb25SZWFkYWJsZSk7XG5cbiAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGRhdGEgb2YgcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIFdlIGZlZWQgdGhlIHNlcnZlcidzIGhhbmRzaGFrZSByZXNwb25zZSBiYWNrIGludG8gdGhlXG4gICAgICAgICAgICAvLyBlbmNyeXB0ZWQgZW5kIG9mIHRoZSBzZWN1cmUgcGFpci5cbiAgICAgICAgICAgIHNlY3VyZVBhaXIuZW5jcnlwdGVkLndyaXRlKGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2gob25FcnJvcik7XG4gICAgICB9O1xuXG4gICAgICBzZWN1cmVQYWlyLmNsZWFydGV4dC5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgc2VjdXJlUGFpci5jbGVhcnRleHQub25jZSgnc2VjdXJlQ29ubmVjdCcsIG9uU2VjdXJlQ29ubmVjdCk7XG4gICAgICBzZWN1cmVQYWlyLmVuY3J5cHRlZC5vbmNlKCdyZWFkYWJsZScsIG9uUmVhZGFibGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETyBsaXN0ZW4gZm9yICdkcmFpbicgZXZlbnQgd2hlbiBzb2NrZXQud3JpdGUgcmV0dXJucyBmYWxzZS5cbiAgLy8gVE9ETyBpbXBsZW1lbnQgaW5jb21wbGV0ZSByZXF1ZXN0IGNhbmNlbGF0aW9uICgyLjIuMS42KVxuICBzZW5kTWVzc2FnZShwYWNrZXRUeXBlOiBudW1iZXIsIGRhdGE/OiBCdWZmZXIsIHJlc2V0Q29ubmVjdGlvbj86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoeyB0eXBlOiBwYWNrZXRUeXBlLCByZXNldENvbm5lY3Rpb246IHJlc2V0Q29ubmVjdGlvbiB9KTtcbiAgICBtZXNzYWdlLmVuZChkYXRhKTtcbiAgICB0aGlzLm91dGdvaW5nTWVzc2FnZVN0cmVhbS53cml0ZShtZXNzYWdlKTtcbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkIHRoZSBuZXh0IGluY29taW5nIG1lc3NhZ2UgZnJvbSB0aGUgc29ja2V0LlxuICAgKi9cbiAgYXN5bmMgcmVhZE1lc3NhZ2UoKTogUHJvbWlzZTxNZXNzYWdlPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5pbmNvbWluZ01lc3NhZ2VJdGVyYXRvci5uZXh0KCk7XG5cbiAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgbWVzc2FnZSBzdHJlYW0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0LnZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VJTztcbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZUlPO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBSUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsU0FBTixTQUF3QkMsb0JBQXhCLENBQXFDO0VBZ0JuQ0MsV0FBVyxDQUFDQyxNQUFELEVBQWlCQyxVQUFqQixFQUFxQ0MsS0FBckMsRUFBbUQ7SUFDNUQ7SUFENEQsS0FmOURGLE1BZThEO0lBQUEsS0FkOURFLEtBYzhEO0lBQUEsS0FaOURDLHNCQVk4RDtJQUFBLEtBVnREQyxxQkFVc0Q7SUFBQSxLQVQ5REMscUJBUzhEO0lBQUEsS0FQOURDLFVBTzhEO0lBQUEsS0FGOURDLHVCQUU4RDtJQUc1RCxLQUFLUCxNQUFMLEdBQWNBLE1BQWQ7SUFDQSxLQUFLRSxLQUFMLEdBQWFBLEtBQWI7SUFFQSxLQUFLQyxzQkFBTCxHQUE4QixLQUE5QjtJQUVBLEtBQUtDLHFCQUFMLEdBQTZCLElBQUlJLDhCQUFKLENBQTBCLEtBQUtOLEtBQS9CLENBQTdCO0lBQ0EsS0FBS0ssdUJBQUwsR0FBK0IsS0FBS0gscUJBQUwsQ0FBMkJLLE1BQU0sQ0FBQ0MsYUFBbEMsR0FBL0I7SUFFQSxLQUFLTCxxQkFBTCxHQUE2QixJQUFJTSw4QkFBSixDQUEwQixLQUFLVCxLQUEvQixFQUFzQztNQUFFRCxVQUFVLEVBQUVBO0lBQWQs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