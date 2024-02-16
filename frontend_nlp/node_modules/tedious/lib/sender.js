"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendInParallel = sendInParallel;
exports.sendMessage = sendMessage;

var _dgram = _interopRequireDefault(require("dgram"));

var _net = _interopRequireDefault(require("net"));

var punycode = _interopRequireWildcard(require("punycode"));

var _abortError = _interopRequireDefault(require("./errors/abort-error"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function sendInParallel(addresses, port, request, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }

  return await new Promise((resolve, reject) => {
    const sockets = [];
    let errorCount = 0;

    const onError = err => {
      errorCount++;

      if (errorCount === addresses.length) {
        signal.removeEventListener('abort', onAbort);
        clearSockets();
        reject(err);
      }
    };

    const onMessage = message => {
      signal.removeEventListener('abort', onAbort);
      clearSockets();
      resolve(message);
    };

    const onAbort = () => {
      clearSockets();
      reject(new _abortError.default());
    };

    const clearSockets = () => {
      for (const socket of sockets) {
        socket.removeListener('error', onError);
        socket.removeListener('message', onMessage);
        socket.close();
      }
    };

    signal.addEventListener('abort', onAbort, {
      once: true
    });

    for (let j = 0; j < addresses.length; j++) {
      const udpType = addresses[j].family === 6 ? 'udp6' : 'udp4';

      const socket = _dgram.default.createSocket(udpType);

      sockets.push(socket);
      socket.on('error', onError);
      socket.on('message', onMessage);
      socket.send(request, 0, request.length, port, addresses[j].address);
    }
  });
}

async function sendMessage(host, port, lookup, signal, request) {
  if (signal.aborted) {
    throw new _abortError.default();
  }

  let addresses;

  if (_net.default.isIP(host)) {
    addresses = [{
      address: host,
      family: _net.default.isIPv6(host) ? 6 : 4
    }];
  } else {
    addresses = await new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new _abortError.default());
      };

      signal.addEventListener('abort', onAbort);
      lookup(punycode.toASCII(host), {
        all: true
      }, (err, addresses) => {
        signal.removeEventListener('abort', onAbort);
        err ? reject(err) : resolve(addresses);
      });
    });
  }

  return await sendInParallel(addresses, port, request, signal);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZW5kSW5QYXJhbGxlbCIsImFkZHJlc3NlcyIsInBvcnQiLCJyZXF1ZXN0Iiwic2lnbmFsIiwiYWJvcnRlZCIsIkFib3J0RXJyb3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNvY2tldHMiLCJlcnJvckNvdW50Iiwib25FcnJvciIsImVyciIsImxlbmd0aCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkFib3J0IiwiY2xlYXJTb2NrZXRzIiwib25NZXNzYWdlIiwibWVzc2FnZSIsInNvY2tldCIsInJlbW92ZUxpc3RlbmVyIiwiY2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsImoiLCJ1ZHBUeXBlIiwiZmFtaWx5IiwiZGdyYW0iLCJjcmVhdGVTb2NrZXQiLCJwdXNoIiwib24iLCJzZW5kIiwiYWRkcmVzcyIsInNlbmRNZXNzYWdlIiwiaG9zdCIsImxvb2t1cCIsIm5ldCIsImlzSVAiLCJpc0lQdjYiLCJwdW55Y29kZSIsInRvQVNDSUkiLCJhbGwiXSwic291cmNlcyI6WyIuLi9zcmMvc2VuZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZ3JhbSBmcm9tICdkZ3JhbSc7XG5pbXBvcnQgZG5zIGZyb20gJ2Rucyc7XG5pbXBvcnQgbmV0IGZyb20gJ25ldCc7XG5pbXBvcnQgKiBhcyBwdW55Y29kZSBmcm9tICdwdW55Y29kZSc7XG5pbXBvcnQgeyBBYm9ydFNpZ25hbCB9IGZyb20gJ25vZGUtYWJvcnQtY29udHJvbGxlcic7XG5cbmltcG9ydCBBYm9ydEVycm9yIGZyb20gJy4vZXJyb3JzL2Fib3J0LWVycm9yJztcblxudHlwZSBMb29rdXBGdW5jdGlvbiA9IChob3N0bmFtZTogc3RyaW5nLCBvcHRpb25zOiBkbnMuTG9va3VwQWxsT3B0aW9ucywgY2FsbGJhY2s6IChlcnI6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbiB8IG51bGwsIGFkZHJlc3NlczogZG5zLkxvb2t1cEFkZHJlc3NbXSkgPT4gdm9pZCkgPT4gdm9pZDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRJblBhcmFsbGVsKGFkZHJlc3NlczogZG5zLkxvb2t1cEFkZHJlc3NbXSwgcG9ydDogbnVtYmVyLCByZXF1ZXN0OiBCdWZmZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpIHtcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEFib3J0RXJyb3IoKTtcbiAgfVxuXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzb2NrZXRzOiBkZ3JhbS5Tb2NrZXRbXSA9IFtdO1xuXG4gICAgbGV0IGVycm9yQ291bnQgPSAwO1xuXG4gICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBlcnJvckNvdW50Kys7XG5cbiAgICAgIGlmIChlcnJvckNvdW50ID09PSBhZGRyZXNzZXMubGVuZ3RoKSB7XG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQWJvcnQpO1xuICAgICAgICBjbGVhclNvY2tldHMoKTtcblxuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25NZXNzYWdlID0gKG1lc3NhZ2U6IEJ1ZmZlcikgPT4ge1xuICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25BYm9ydCk7XG4gICAgICBjbGVhclNvY2tldHMoKTtcblxuICAgICAgcmVzb2x2ZShtZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25BYm9ydCA9ICgpID0+IHtcbiAgICAgIGNsZWFyU29ja2V0cygpO1xuXG4gICAgICByZWplY3QobmV3IEFib3J0RXJyb3IoKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsZWFyU29ja2V0cyA9ICgpID0+IHtcbiAgICAgIGZvciAoY29uc3Qgc29ja2V0IG9mIHNvY2tldHMpIHtcbiAgICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25BYm9ydCwgeyBvbmNlOiB0cnVlIH0pO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhZGRyZXNzZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHVkcFR5cGUgPSBhZGRyZXNzZXNbal0uZmFtaWx5ID09PSA2ID8gJ3VkcDYnIDogJ3VkcDQnO1xuXG4gICAgICBjb25zdCBzb2NrZXQgPSBkZ3JhbS5jcmVhdGVTb2NrZXQodWRwVHlwZSk7XG4gICAgICBzb2NrZXRzLnB1c2goc29ja2V0KTtcbiAgICAgIHNvY2tldC5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICBzb2NrZXQuc2VuZChyZXF1ZXN0LCAwLCByZXF1ZXN0Lmxlbmd0aCwgcG9ydCwgYWRkcmVzc2VzW2pdLmFkZHJlc3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZShob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlciwgbG9va3VwOiBMb29rdXBGdW5jdGlvbiwgc2lnbmFsOiBBYm9ydFNpZ25hbCwgcmVxdWVzdDogQnVmZmVyKSB7XG4gIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBBYm9ydEVycm9yKCk7XG4gIH1cblxuICBsZXQgYWRkcmVzc2VzOiBkbnMuTG9va3VwQWRkcmVzc1tdO1xuXG4gIGlmIChuZXQuaXNJUChob3N0KSkge1xuICAgIGFkZHJlc3NlcyA9IFtcbiAgICAgIHsgYWRkcmVzczogaG9zdCwgZmFtaWx5OiBuZXQuaXNJUHY2KGhvc3QpID8gNiA6IDQgfVxuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgYWRkcmVzc2VzID0gYXdhaXQgbmV3IFByb21pc2U8ZG5zLkxvb2t1cEFkZHJlc3NbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb25BYm9ydCA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBBYm9ydEVycm9yKCkpO1xuICAgICAgfTtcblxuICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25BYm9ydCk7XG5cbiAgICAgIGxvb2t1cChwdW55Y29kZS50b0FTQ0lJKGhvc3QpLCB7IGFsbDogdHJ1ZSB9LCAoZXJyLCBhZGRyZXNzZXMpID0+IHtcbiAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25BYm9ydCk7XG5cbiAgICAgICAgZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKGFkZHJlc3Nlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBhd2FpdCBzZW5kSW5QYXJhbGxlbChhZGRyZXNzZXMsIHBvcnQsIHJlcXVlc3QsIHNpZ25hbCk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBR0E7Ozs7Ozs7O0FBSU8sZUFBZUEsY0FBZixDQUE4QkMsU0FBOUIsRUFBOERDLElBQTlELEVBQTRFQyxPQUE1RSxFQUE2RkMsTUFBN0YsRUFBa0g7RUFDdkgsSUFBSUEsTUFBTSxDQUFDQyxPQUFYLEVBQW9CO0lBQ2xCLE1BQU0sSUFBSUMsbUJBQUosRUFBTjtFQUNEOztFQUVELE9BQU8sTUFBTSxJQUFJQyxPQUFKLENBQW9CLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtJQUNwRCxNQUFNQyxPQUF1QixHQUFHLEVBQWhDO0lBRUEsSUFBSUMsVUFBVSxHQUFHLENBQWpCOztJQUVBLE1BQU1DLE9BQU8sR0FBSUMsR0FBRCxJQUFnQjtNQUM5QkYsVUFBVTs7TUFFVixJQUFJQSxVQUFVLEtBQUtWLFNBQVMsQ0FBQ2EsTUFBN0IsRUFB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