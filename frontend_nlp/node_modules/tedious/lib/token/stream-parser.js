"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _colmetadataTokenParser = _interopRequireDefault(require("./colmetadata-token-parser"));

var _doneTokenParser = require("./done-token-parser");

var _envChangeTokenParser = _interopRequireDefault(require("./env-change-token-parser"));

var _infoerrorTokenParser = require("./infoerror-token-parser");

var _fedauthInfoParser = _interopRequireDefault(require("./fedauth-info-parser"));

var _featureExtAckParser = _interopRequireDefault(require("./feature-ext-ack-parser"));

var _loginackTokenParser = _interopRequireDefault(require("./loginack-token-parser"));

var _orderTokenParser = _interopRequireDefault(require("./order-token-parser"));

var _returnstatusTokenParser = _interopRequireDefault(require("./returnstatus-token-parser"));

var _returnvalueTokenParser = _interopRequireDefault(require("./returnvalue-token-parser"));

var _rowTokenParser = _interopRequireDefault(require("./row-token-parser"));

var _nbcrowTokenParser = _interopRequireDefault(require("./nbcrow-token-parser"));

var _sspiTokenParser = _interopRequireDefault(require("./sspi-token-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tokenParsers = {
  [_token.TYPE.DONE]: _doneTokenParser.doneParser,
  [_token.TYPE.DONEINPROC]: _doneTokenParser.doneInProcParser,
  [_token.TYPE.DONEPROC]: _doneTokenParser.doneProcParser,
  [_token.TYPE.ENVCHANGE]: _envChangeTokenParser.default,
  [_token.TYPE.ERROR]: _infoerrorTokenParser.errorParser,
  [_token.TYPE.FEDAUTHINFO]: _fedauthInfoParser.default,
  [_token.TYPE.FEATUREEXTACK]: _featureExtAckParser.default,
  [_token.TYPE.INFO]: _infoerrorTokenParser.infoParser,
  [_token.TYPE.LOGINACK]: _loginackTokenParser.default,
  [_token.TYPE.ORDER]: _orderTokenParser.default,
  [_token.TYPE.RETURNSTATUS]: _returnstatusTokenParser.default,
  [_token.TYPE.RETURNVALUE]: _returnvalueTokenParser.default,
  [_token.TYPE.SSPI]: _sspiTokenParser.default
};

class StreamBuffer {
  constructor(iterable) {
    this.iterator = void 0;
    this.buffer = void 0;
    this.position = void 0;
    this.iterator = (iterable[Symbol.asyncIterator] || iterable[Symbol.iterator]).call(iterable);
    this.buffer = Buffer.alloc(0);
    this.position = 0;
  }

  async waitForChunk() {
    const result = await this.iterator.next();

    if (result.done) {
      throw new Error('unexpected end of data');
    }

    if (this.position === this.buffer.length) {
      this.buffer = result.value;
    } else {
      this.buffer = Buffer.concat([this.buffer.slice(this.position), result.value]);
    }

    this.position = 0;
  }

}

class Parser {
  static async *parseTokens(iterable, debug, options, colMetadata = []) {
    let token;

    const onDoneParsing = t => {
      token = t;
    };

    const streamBuffer = new StreamBuffer(iterable);
    const parser = new Parser(streamBuffer, debug, options);
    parser.colMetadata = colMetadata;

    while (true) {
      try {
        await streamBuffer.waitForChunk();
      } catch (err) {
        if (streamBuffer.position === streamBuffer.buffer.length) {
          return;
        }

        throw err;
      }

      if (parser.suspended) {
        // Unsuspend and continue from where ever we left off.
        parser.suspended = false;
        const next = parser.next;
        next(); // Check if a new token was parsed after unsuspension.

        if (!parser.suspended && token) {
          if (token instanceof _token.ColMetadataToken) {
            parser.colMetadata = token.columns;
          }

          yield token;
        }
      }

      while (!parser.suspended && parser.position + 1 <= parser.buffer.length) {
        const type = parser.buffer.readUInt8(parser.position);
        parser.position += 1;

        if (type === _token.TYPE.COLMETADATA) {
          const token = await (0, _colmetadataTokenParser.default)(parser);
          parser.colMetadata = token.columns;
          yield token;
        } else if (type === _token.TYPE.ROW) {
          yield (0, _rowTokenParser.default)(parser);
        } else if (type === _token.TYPE.NBCROW) {
          yield (0, _nbcrowTokenParser.default)(parser);
        } else if (tokenParsers[type]) {
          tokenParsers[type](parser, parser.options, onDoneParsing); // Check if a new token was parsed after unsuspension.

          if (!parser.suspended && token) {
            if (token instanceof _token.ColMetadataToken) {
              parser.colMetadata = token.columns;
            }

            yield token;
          }
        } else {
          throw new Error('Unknown type: ' + type);
        }
      }
    }
  }

  constructor(streamBuffer, debug, options) {
    this.debug = void 0;
    this.colMetadata = void 0;
    this.options = void 0;
    this.suspended = void 0;
    this.next = void 0;
    this.streamBuffer = void 0;
    this.debug = debug;
    this.colMetadata = [];
    this.options = options;
    this.streamBuffer = streamBuffer;
    this.suspended = false;
    this.next = undefined;
  }

  get buffer() {
    return this.streamBuffer.buffer;
  }

  get position() {
    return this.streamBuffer.position;
  }

  set position(value) {
    this.streamBuffer.position = value;
  }

  suspend(next) {
    this.suspended = true;
    this.next = next;
  }

  awaitData(length, callback) {
    if (this.position + length <= this.buffer.length) {
      callback();
    } else {
      this.suspend(() => {
        this.awaitData(length, callback);
      });
    }
  }

  readInt8(callback) {
    this.awaitData(1, () => {
      const data = this.buffer.readInt8(this.position);
      this.position += 1;
      callback(data);
    });
  }

  readUInt8(callback) {
    this.awaitData(1, () => {
      const data = this.buffer.readUInt8(this.position);
      this.position += 1;
      callback(data);
    });
  }

  readInt16LE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readInt16LE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readInt16BE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readInt16BE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readUInt16LE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readUInt16LE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readUInt16BE(callback) {
    this.awaitData(2, () => {
      const data = this.buffer.readUInt16BE(this.position);
      this.position += 2;
      callback(data);
    });
  }

  readInt32LE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readInt32LE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readInt32BE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readInt32BE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readUInt32LE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readUInt32LE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readUInt32BE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readUInt32BE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readBigInt64LE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readBigInt64LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readInt64LE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readInt32LE(this.position + 4) + ((this.buffer[this.position + 4] & 0x80) === 0x80 ? 1 : -1) * this.buffer.readUInt32LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readInt64BE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readInt32BE(this.position) + ((this.buffer[this.position] & 0x80) === 0x80 ? 1 : -1) * this.buffer.readUInt32BE(this.position + 4);
      this.position += 8;
      callback(data);
    });
  }

  readBigUInt64LE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readBigUInt64LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readUInt64LE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readUInt32LE(this.position + 4) + this.buffer.readUInt32LE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readUInt64BE(callback) {
    this.awaitData(8, () => {
      const data = Math.pow(2, 32) * this.buffer.readUInt32BE(this.position) + this.buffer.readUInt32BE(this.position + 4);
      this.position += 8;
      callback(data);
    });
  }

  readFloatLE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readFloatLE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readFloatBE(callback) {
    this.awaitData(4, () => {
      const data = this.buffer.readFloatBE(this.position);
      this.position += 4;
      callback(data);
    });
  }

  readDoubleLE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readDoubleLE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readDoubleBE(callback) {
    this.awaitData(8, () => {
      const data = this.buffer.readDoubleBE(this.position);
      this.position += 8;
      callback(data);
    });
  }

  readUInt24LE(callback) {
    this.awaitData(3, () => {
      const low = this.buffer.readUInt16LE(this.position);
      const high = this.buffer.readUInt8(this.position + 2);
      this.position += 3;
      callback(low | high << 16);
    });
  }

  readUInt40LE(callback) {
    this.awaitData(5, () => {
      const low = this.buffer.readUInt32LE(this.position);
      const high = this.buffer.readUInt8(this.position + 4);
      this.position += 5;
      callback(0x100000000 * high + low);
    });
  }

  readUNumeric64LE(callback) {
    this.awaitData(8, () => {
      const low = this.buffer.readUInt32LE(this.position);
      const high = this.buffer.readUInt32LE(this.position + 4);
      this.position += 8;
      callback(0x100000000 * high + low);
    });
  }

  readUNumeric96LE(callback) {
    this.awaitData(12, () => {
      const dword1 = this.buffer.readUInt32LE(this.position);
      const dword2 = this.buffer.readUInt32LE(this.position + 4);
      const dword3 = this.buffer.readUInt32LE(this.position + 8);
      this.position += 12;
      callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3);
    });
  }

  readUNumeric128LE(callback) {
    this.awaitData(16, () => {
      const dword1 = this.buffer.readUInt32LE(this.position);
      const dword2 = this.buffer.readUInt32LE(this.position + 4);
      const dword3 = this.buffer.readUInt32LE(this.position + 8);
      const dword4 = this.buffer.readUInt32LE(this.position + 12);
      this.position += 16;
      callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3 + 0x100000000 * 0x100000000 * 0x100000000 * dword4);
    });
  } // Variable length data


  readBuffer(length, callback) {
    this.awaitData(length, () => {
      const data = this.buffer.slice(this.position, this.position + length);
      this.position += length;
      callback(data);
    });
  } // Read a Unicode String (BVARCHAR)


  readBVarChar(callback) {
    this.readUInt8(length => {
      this.readBuffer(length * 2, data => {
        callback(data.toString('ucs2'));
      });
    });
  } // Read a Unicode String (USVARCHAR)


  readUsVarChar(callback) {
    this.readUInt16LE(length => {
      this.readBuffer(length * 2, data => {
        callback(data.toString('ucs2'));
      });
    });
  } // Read binary data (BVARBYTE)


  readBVarByte(callback) {
    this.readUInt8(length => {
      this.readBuffer(length, callback);
    });
  } // Read binary data (USVARBYTE)


  readUsVarByte(callback) {
    this.readUInt16LE(length => {
      this.readBuffer(length, callback);
    });
  }

}

var _default = Parser;
exports.default = _default;
module.exports = Parser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0b2tlblBhcnNlcnMiLCJUWVBFIiwiRE9ORSIsImRvbmVQYXJzZXIiLCJET05FSU5QUk9DIiwiZG9uZUluUHJvY1BhcnNlciIsIkRPTkVQUk9DIiwiZG9uZVByb2NQYXJzZXIiLCJFTlZDSEFOR0UiLCJlbnZDaGFuZ2VQYXJzZXIiLCJFUlJPUiIsImVycm9yUGFyc2VyIiwiRkVEQVVUSElORk8iLCJmZWRBdXRoSW5mb1BhcnNlciIsIkZFQVRVUkVFWFRBQ0siLCJmZWF0dXJlRXh0QWNrUGFyc2VyIiwiSU5GTyIsImluZm9QYXJzZXIiLCJMT0dJTkFDSyIsImxvZ2luQWNrUGFyc2VyIiwiT1JERVIiLCJvcmRlclBhcnNlciIsIlJFVFVSTlNUQVRVUyIsInJldHVyblN0YXR1c1BhcnNlciIsIlJFVFVSTlZBTFVFIiwicmV0dXJuVmFsdWVQYXJzZXIiLCJTU1BJIiwic3NwaVBhcnNlciIsIlN0cmVhbUJ1ZmZlciIsImNvbnN0cnVjdG9yIiwiaXRlcmFibGUiLCJpdGVyYXRvciIsImJ1ZmZlciIsInBvc2l0aW9uIiwiU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsImNhbGwiLCJCdWZmZXIiLCJhbGxvYyIsIndhaXRGb3JDaHVuayIsInJlc3VsdCIsIm5leHQiLCJkb25lIiwiRXJyb3IiLCJsZW5ndGgiLCJ2YWx1ZSIsImNvbmNhdCIsInNsaWNlIiwiUGFyc2VyIiwicGFyc2VUb2tlbnMiLCJkZWJ1ZyIsIm9wdGlvbnMiLCJjb2xNZXRhZGF0YSIsInRva2VuIiwib25Eb25lUGFyc2luZyIsInQiLCJzdHJlYW1CdWZmZXIiLCJwYXJzZXIiLCJlcnIiLCJzdXNwZW5kZWQiLCJDb2xNZXRhZGF0YVRva2VuIiwiY29sdW1ucyIsInR5cGUiLCJyZWFkVUludDgiLCJDT0xNRVRBREFUQSIsIlJPVyIsIk5CQ1JPVyIsInVuZGVmaW5lZCIsInN1c3BlbmQiLCJhd2FpdERhdGEiLCJjYWxsYmFjayIsInJlYWRJbnQ4IiwiZGF0YSIsInJlYWRJbnQxNkxFIiwicmVhZEludDE2QkUiLCJyZWFkVUludDE2TEUiLCJyZWFkVUludDE2QkUiLCJyZWFkSW50MzJMRSIsInJlYWRJbnQzMkJFIiwicmVhZFVJbnQzMkxFIiwicmVhZFVJbnQzMkJFIiwicmVhZEJpZ0ludDY0TEUiLCJyZWFkSW50NjRMRSIsIk1hdGgiLCJwb3ciLCJyZWFkSW50NjRCRSIsInJlYWRCaWdVSW50NjRMRSIsInJlYWRVSW50NjRMRSIsInJlYWRVSW50NjRCRSIsInJlYWRGbG9hdExFIiwicmVhZEZsb2F0QkUiLCJyZWFkRG91YmxlTEUiLCJyZWFkRG91YmxlQkUiLCJyZWFkVUludDI0TEUiLCJsb3ciLCJoaWdoIiwicmVhZFVJbnQ0MExFIiwicmVhZFVOdW1lcmljNjRMRSIsInJlYWRVTnVtZXJpYzk2TEUiLCJkd29yZDEiLCJkd29yZDIiLCJkd29yZDMiLCJyZWFkVU51bWVyaWMxMjhMRSIsImR3b3JkNCIsInJlYWRCdWZmZXIiLCJyZWFkQlZhckNoYXIiLCJ0b1N0cmluZyIsInJlYWRVc1ZhckNoYXIiLCJyZWFkQlZhckJ5dGUiLCJyZWFkVXNWYXJCeXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbi9zdHJlYW0tcGFyc2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWJ1ZyBmcm9tICcuLi9kZWJ1Zyc7XG5pbXBvcnQgeyBJbnRlcm5hbENvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vY29ubmVjdGlvbic7XG5cbmltcG9ydCB7IFRZUEUsIFRva2VuLCBDb2xNZXRhZGF0YVRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5cbmltcG9ydCBjb2xNZXRhZGF0YVBhcnNlciwgeyBDb2x1bW5NZXRhZGF0YSB9IGZyb20gJy4vY29sbWV0YWRhdGEtdG9rZW4tcGFyc2VyJztcbmltcG9ydCB7IGRvbmVQYXJzZXIsIGRvbmVJblByb2NQYXJzZXIsIGRvbmVQcm9jUGFyc2VyIH0gZnJvbSAnLi9kb25lLXRva2VuLXBhcnNlcic7XG5pbXBvcnQgZW52Q2hhbmdlUGFyc2VyIGZyb20gJy4vZW52LWNoYW5nZS10b2tlbi1wYXJzZXInO1xuaW1wb3J0IHsgZXJyb3JQYXJzZXIsIGluZm9QYXJzZXIgfSBmcm9tICcuL2luZm9lcnJvci10b2tlbi1wYXJzZXInO1xuaW1wb3J0IGZlZEF1dGhJbmZvUGFyc2VyIGZyb20gJy4vZmVkYXV0aC1pbmZvLXBhcnNlcic7XG5pbXBvcnQgZmVhdHVyZUV4dEFja1BhcnNlciBmcm9tICcuL2ZlYXR1cmUtZXh0LWFjay1wYXJzZXInO1xuaW1wb3J0IGxvZ2luQWNrUGFyc2VyIGZyb20gJy4vbG9naW5hY2stdG9rZW4tcGFyc2VyJztcbmltcG9ydCBvcmRlclBhcnNlciBmcm9tICcuL29yZGVyLXRva2VuLXBhcnNlcic7XG5pbXBvcnQgcmV0dXJuU3RhdHVzUGFyc2VyIGZyb20gJy4vcmV0dXJuc3RhdHVzLXRva2VuLXBhcnNlcic7XG5pbXBvcnQgcmV0dXJuVmFsdWVQYXJzZXIgZnJvbSAnLi9yZXR1cm52YWx1ZS10b2tlbi1wYXJzZXInO1xuaW1wb3J0IHJvd1BhcnNlciBmcm9tICcuL3Jvdy10b2tlbi1wYXJzZXInO1xuaW1wb3J0IG5iY1Jvd1BhcnNlciBmcm9tICcuL25iY3Jvdy10b2tlbi1wYXJzZXInO1xuaW1wb3J0IHNzcGlQYXJzZXIgZnJvbSAnLi9zc3BpLXRva2VuLXBhcnNlcic7XG5cbmNvbnN0IHRva2VuUGFyc2VycyA9IHtcbiAgW1RZUEUuRE9ORV06IGRvbmVQYXJzZXIsXG4gIFtUWVBFLkRPTkVJTlBST0NdOiBkb25lSW5Qcm9jUGFyc2VyLFxuICBbVFlQRS5ET05FUFJPQ106IGRvbmVQcm9jUGFyc2VyLFxuICBbVFlQRS5FTlZDSEFOR0VdOiBlbnZDaGFuZ2VQYXJzZXIsXG4gIFtUWVBFLkVSUk9SXTogZXJyb3JQYXJzZXIsXG4gIFtUWVBFLkZFREFVVEhJTkZPXTogZmVkQXV0aEluZm9QYXJzZXIsXG4gIFtUWVBFLkZFQVRVUkVFWFRBQ0tdOiBmZWF0dXJlRXh0QWNrUGFyc2VyLFxuICBbVFlQRS5JTkZPXTogaW5mb1BhcnNlcixcbiAgW1RZUEUuTE9HSU5BQ0tdOiBsb2dpbkFja1BhcnNlcixcbiAgW1RZUEUuT1JERVJdOiBvcmRlclBhcnNlcixcbiAgW1RZUEUuUkVUVVJOU1RBVFVTXTogcmV0dXJuU3RhdHVzUGFyc2VyLFxuICBbVFlQRS5SRVRVUk5WQUxVRV06IHJldHVyblZhbHVlUGFyc2VyLFxuICBbVFlQRS5TU1BJXTogc3NwaVBhcnNlclxufTtcblxuZXhwb3J0IHR5cGUgUGFyc2VyT3B0aW9ucyA9IFBpY2s8SW50ZXJuYWxDb25uZWN0aW9uT3B0aW9ucywgJ3VzZVVUQycgfCAnbG93ZXJDYXNlR3VpZHMnIHwgJ3Rkc1ZlcnNpb24nIHwgJ3VzZUNvbHVtbk5hbWVzJyB8ICdjb2x1bW5OYW1lUmVwbGFjZXInIHwgJ2NhbWVsQ2FzZUNvbHVtbnMnPjtcblxuY2xhc3MgU3RyZWFtQnVmZmVyIHtcbiAgaXRlcmF0b3I6IEFzeW5jSXRlcmF0b3I8QnVmZmVyLCBhbnksIHVuZGVmaW5lZD4gfCBJdGVyYXRvcjxCdWZmZXIsIGFueSwgdW5kZWZpbmVkPjtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoaXRlcmFibGU6IEFzeW5jSXRlcmFibGU8QnVmZmVyPiB8IEl0ZXJhYmxlPEJ1ZmZlcj4pIHtcbiAgICB0aGlzLml0ZXJhdG9yID0gKChpdGVyYWJsZSBhcyBBc3luY0l0ZXJhYmxlPEJ1ZmZlcj4pW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSB8fCAoaXRlcmFibGUgYXMgSXRlcmFibGU8QnVmZmVyPilbU3ltYm9sLml0ZXJhdG9yXSkuY2FsbChpdGVyYWJsZSk7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgfVxuXG4gIGFzeW5jIHdhaXRGb3JDaHVuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgZGF0YScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYnVmZmVyID0gcmVzdWx0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW3RoaXMuYnVmZmVyLnNsaWNlKHRoaXMucG9zaXRpb24pLCByZXN1bHQudmFsdWVdKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IDA7XG4gIH1cbn1cblxuY2xhc3MgUGFyc2VyIHtcbiAgZGVidWc6IERlYnVnO1xuICBjb2xNZXRhZGF0YTogQ29sdW1uTWV0YWRhdGFbXTtcbiAgb3B0aW9uczogUGFyc2VyT3B0aW9ucztcblxuICBzdXNwZW5kZWQ6IGJvb2xlYW47XG4gIG5leHQ6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgc3RyZWFtQnVmZmVyOiBTdHJlYW1CdWZmZXI7XG5cbiAgc3RhdGljIGFzeW5jICpwYXJzZVRva2VucyhpdGVyYWJsZTogQXN5bmNJdGVyYWJsZTxCdWZmZXI+IHwgSXRlcmFibGU8QnVmZmVyPiwgZGVidWc6IERlYnVnLCBvcHRpb25zOiBQYXJzZXJPcHRpb25zLCBjb2xNZXRhZGF0YTogQ29sdW1uTWV0YWRhdGFbXSA9IFtdKSB7XG4gICAgbGV0IHRva2VuOiBUb2tlbiB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBvbkRvbmVQYXJzaW5nID0gKHQ6IFRva2VuIHwgdW5kZWZpbmVkKSA9PiB7IHRva2VuID0gdDsgfTtcblxuICAgIGNvbnN0IHN0cmVhbUJ1ZmZlciA9IG5ldyBTdHJlYW1CdWZmZXIoaXRlcmFibGUpO1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcihzdHJlYW1CdWZmZXIsIGRlYnVnLCBvcHRpb25zKTtcbiAgICBwYXJzZXIuY29sTWV0YWRhdGEgPSBjb2xNZXRhZGF0YTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBzdHJlYW1CdWZmZXIud2FpdEZvckNodW5rKCk7XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgaWYgKHN0cmVhbUJ1ZmZlci5wb3NpdGlvbiA9PT0gc3RyZWFtQnVmZmVyLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJzZXIuc3VzcGVuZGVkKSB7XG4gICAgICAgIC8vIFVuc3VzcGVuZCBhbmQgY29udGludWUgZnJvbSB3aGVyZSBldmVyIHdlIGxlZnQgb2ZmLlxuICAgICAgICBwYXJzZXIuc3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG5leHQgPSBwYXJzZXIubmV4dCE7XG5cbiAgICAgICAgbmV4dCgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGEgbmV3IHRva2VuIHdhcyBwYXJzZWQgYWZ0ZXIgdW5zdXNwZW5zaW9uLlxuICAgICAgICBpZiAoIXBhcnNlci5zdXNwZW5kZWQgJiYgdG9rZW4pIHtcbiAgICAgICAgICBpZiAodG9rZW4gaW5zdGFuY2VvZiBDb2xNZXRhZGF0YVRva2VuKSB7XG4gICAgICAgICAgICBwYXJzZXIuY29sTWV0YWRhdGEgPSB0b2tlbi5jb2x1bW5zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHlpZWxkIHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICghcGFyc2VyLnN1c3BlbmRlZCAmJiBwYXJzZXIucG9zaXRpb24gKyAxIDw9IHBhcnNlci5idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBwYXJzZXIuYnVmZmVyLnJlYWRVSW50OChwYXJzZXIucG9zaXRpb24pO1xuXG4gICAgICAgIHBhcnNlci5wb3NpdGlvbiArPSAxO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBUWVBFLkNPTE1FVEFEQVRBKSB7XG4gICAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjb2xNZXRhZGF0YVBhcnNlcihwYXJzZXIpO1xuICAgICAgICAgIHBhcnNlci5jb2xNZXRhZGF0YSA9IHRva2VuLmNvbHVtbnM7XG4gICAgICAgICAgeWllbGQgdG9rZW47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVFlQRS5ST1cpIHtcbiAgICAgICAgICB5aWVsZCByb3dQYXJzZXIocGFyc2VyKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBUWVBFLk5CQ1JPVykge1xuICAgICAgICAgIHlpZWxkIG5iY1Jvd1BhcnNlcihwYXJzZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRva2VuUGFyc2Vyc1t0eXBlXSkge1xuICAgICAgICAgIHRva2VuUGFyc2Vyc1t0eXBlXShwYXJzZXIsIHBhcnNlci5vcHRpb25zLCBvbkRvbmVQYXJzaW5nKTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIGEgbmV3IHRva2VuIHdhcyBwYXJzZWQgYWZ0ZXIgdW5zdXNwZW5zaW9uLlxuICAgICAgICAgIGlmICghcGFyc2VyLnN1c3BlbmRlZCAmJiB0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuIGluc3RhbmNlb2YgQ29sTWV0YWRhdGFUb2tlbikge1xuICAgICAgICAgICAgICBwYXJzZXIuY29sTWV0YWRhdGEgPSB0b2tlbi5jb2x1bW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgdG9rZW47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihzdHJlYW1CdWZmZXI6IFN0cmVhbUJ1ZmZlciwgZGVidWc6IERlYnVnLCBvcHRpb25zOiBQYXJzZXJPcHRpb25zKSB7XG4gICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICAgIHRoaXMuY29sTWV0YWRhdGEgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5zdHJlYW1CdWZmZXIgPSBzdHJlYW1CdWZmZXI7XG4gICAgdGhpcy5zdXNwZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgYnVmZmVyKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmVhbUJ1ZmZlci5idWZmZXI7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWFtQnVmZmVyLnBvc2l0aW9uO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5zdHJlYW1CdWZmZXIucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIHN1c3BlbmQobmV4dDogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc3VzcGVuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLm5leHQgPSBuZXh0O1xuICB9XG5cbiAgYXdhaXREYXRhKGxlbmd0aDogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uICsgbGVuZ3RoIDw9IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdXNwZW5kKCgpID0+IHtcbiAgICAgICAgdGhpcy5hd2FpdERhdGEobGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWFkSW50OChjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDEsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkSW50OCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gMTtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZFVJbnQ4KGNhbGxiYWNrOiAoZGF0YTogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoMSwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVmZmVyLnJlYWRVSW50OCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gMTtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZEludDE2TEUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSgyLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIucmVhZEludDE2TEUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDI7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRJbnQxNkJFKGNhbGxiYWNrOiAoZGF0YTogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoMiwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVmZmVyLnJlYWRJbnQxNkJFKHRoaXMucG9zaXRpb24pO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSAyO1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkVUludDE2TEUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSgyLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIucmVhZFVJbnQxNkxFKHRoaXMucG9zaXRpb24pO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSAyO1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkVUludDE2QkUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSgyLCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIucmVhZFVJbnQxNkJFKHRoaXMucG9zaXRpb24pO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSAyO1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkSW50MzJMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDQsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkSW50MzJMRSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gNDtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZEludDMyQkUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSg0LCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIucmVhZEludDMyQkUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDQ7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRVSW50MzJMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDQsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDQ7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRVSW50MzJCRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDQsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyQkUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDQ7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRCaWdJbnQ2NExFKGNhbGxiYWNrOiAoZGF0YTogYmlnaW50KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoOCwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVmZmVyLnJlYWRCaWdJbnQ2NExFKHRoaXMucG9zaXRpb24pO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSA4O1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkSW50NjRMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDgsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBNYXRoLnBvdygyLCAzMikgKiB0aGlzLmJ1ZmZlci5yZWFkSW50MzJMRSh0aGlzLnBvc2l0aW9uICsgNCkgKyAoKHRoaXMuYnVmZmVyW3RoaXMucG9zaXRpb24gKyA0XSAmIDB4ODApID09PSAweDgwID8gMSA6IC0xKSAqIHRoaXMuYnVmZmVyLnJlYWRVSW50MzJMRSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gODtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZEludDY0QkUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSg4LCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gTWF0aC5wb3coMiwgMzIpICogdGhpcy5idWZmZXIucmVhZEludDMyQkUodGhpcy5wb3NpdGlvbikgKyAoKHRoaXMuYnVmZmVyW3RoaXMucG9zaXRpb25dICYgMHg4MCkgPT09IDB4ODAgPyAxIDogLTEpICogdGhpcy5idWZmZXIucmVhZFVJbnQzMkJFKHRoaXMucG9zaXRpb24gKyA0KTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gODtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZEJpZ1VJbnQ2NExFKGNhbGxiYWNrOiAoZGF0YTogYmlnaW50KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoOCwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVmZmVyLnJlYWRCaWdVSW50NjRMRSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gODtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZFVJbnQ2NExFKGNhbGxiYWNrOiAoZGF0YTogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoOCwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IE1hdGgucG93KDIsIDMyKSAqIHRoaXMuYnVmZmVyLnJlYWRVSW50MzJMRSh0aGlzLnBvc2l0aW9uICsgNCkgKyB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDg7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRVSW50NjRCRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDgsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBNYXRoLnBvdygyLCAzMikgKiB0aGlzLmJ1ZmZlci5yZWFkVUludDMyQkUodGhpcy5wb3NpdGlvbikgKyB0aGlzLmJ1ZmZlci5yZWFkVUludDMyQkUodGhpcy5wb3NpdGlvbiArIDQpO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSA4O1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkRmxvYXRMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDQsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkRmxvYXRMRSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMucG9zaXRpb24gKz0gNDtcbiAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZEZsb2F0QkUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSg0LCAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIucmVhZEZsb2F0QkUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDQ7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWREb3VibGVMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDgsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkRG91YmxlTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDg7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWREb3VibGVCRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDgsICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1ZmZlci5yZWFkRG91YmxlQkUodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDg7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRVSW50MjRMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxvdyA9IHRoaXMuYnVmZmVyLnJlYWRVSW50MTZMRSh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIGNvbnN0IGhpZ2ggPSB0aGlzLmJ1ZmZlci5yZWFkVUludDgodGhpcy5wb3NpdGlvbiArIDIpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDM7XG5cbiAgICAgIGNhbGxiYWNrKGxvdyB8IChoaWdoIDw8IDE2KSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkVUludDQwTEUoY2FsbGJhY2s6IChkYXRhOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICB0aGlzLmF3YWl0RGF0YSg1LCAoKSA9PiB7XG4gICAgICBjb25zdCBsb3cgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICBjb25zdCBoaWdoID0gdGhpcy5idWZmZXIucmVhZFVJbnQ4KHRoaXMucG9zaXRpb24gKyA0KTtcblxuICAgICAgdGhpcy5wb3NpdGlvbiArPSA1O1xuXG4gICAgICBjYWxsYmFjaygoMHgxMDAwMDAwMDAgKiBoaWdoKSArIGxvdyk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkVU51bWVyaWM2NExFKGNhbGxiYWNrOiAoZGF0YTogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5hd2FpdERhdGEoOCwgKCkgPT4ge1xuICAgICAgY29uc3QgbG93ID0gdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKHRoaXMucG9zaXRpb24pO1xuICAgICAgY29uc3QgaGlnaCA9IHRoaXMuYnVmZmVyLnJlYWRVSW50MzJMRSh0aGlzLnBvc2l0aW9uICsgNCk7XG5cbiAgICAgIHRoaXMucG9zaXRpb24gKz0gODtcblxuICAgICAgY2FsbGJhY2soKDB4MTAwMDAwMDAwICogaGlnaCkgKyBsb3cpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZFVOdW1lcmljOTZMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDEyLCAoKSA9PiB7XG4gICAgICBjb25zdCBkd29yZDEgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICBjb25zdCBkd29yZDIgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbiArIDQpO1xuICAgICAgY29uc3QgZHdvcmQzID0gdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKHRoaXMucG9zaXRpb24gKyA4KTtcblxuICAgICAgdGhpcy5wb3NpdGlvbiArPSAxMjtcblxuICAgICAgY2FsbGJhY2soZHdvcmQxICsgKDB4MTAwMDAwMDAwICogZHdvcmQyKSArICgweDEwMDAwMDAwMCAqIDB4MTAwMDAwMDAwICogZHdvcmQzKSk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkVU51bWVyaWMxMjhMRShjYWxsYmFjazogKGRhdGE6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKDE2LCAoKSA9PiB7XG4gICAgICBjb25zdCBkd29yZDEgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbik7XG4gICAgICBjb25zdCBkd29yZDIgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5wb3NpdGlvbiArIDQpO1xuICAgICAgY29uc3QgZHdvcmQzID0gdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKHRoaXMucG9zaXRpb24gKyA4KTtcbiAgICAgIGNvbnN0IGR3b3JkNCA9IHRoaXMuYnVmZmVyLnJlYWRVSW50MzJMRSh0aGlzLnBvc2l0aW9uICsgMTIpO1xuXG4gICAgICB0aGlzLnBvc2l0aW9uICs9IDE2O1xuXG4gICAgICBjYWxsYmFjayhkd29yZDEgKyAoMHgxMDAwMDAwMDAgKiBkd29yZDIpICsgKDB4MTAwMDAwMDAwICogMHgxMDAwMDAwMDAgKiBkd29yZDMpICsgKDB4MTAwMDAwMDAwICogMHgxMDAwMDAwMDAgKiAweDEwMDAwMDAwMCAqIGR3b3JkNCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVmFyaWFibGUgbGVuZ3RoIGRhdGFcblxuICByZWFkQnVmZmVyKGxlbmd0aDogbnVtYmVyLCBjYWxsYmFjazogKGRhdGE6IEJ1ZmZlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuYXdhaXREYXRhKGxlbmd0aCwgKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVmZmVyLnNsaWNlKHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24gKyBsZW5ndGgpO1xuICAgICAgdGhpcy5wb3NpdGlvbiArPSBsZW5ndGg7XG4gICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJlYWQgYSBVbmljb2RlIFN0cmluZyAoQlZBUkNIQVIpXG4gIHJlYWRCVmFyQ2hhcihjYWxsYmFjazogKGRhdGE6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHRoaXMucmVhZFVJbnQ4KChsZW5ndGgpID0+IHtcbiAgICAgIHRoaXMucmVhZEJ1ZmZlcihsZW5ndGggKiAyLCAoZGF0YSkgPT4ge1xuICAgICAgICBjYWxsYmFjayhkYXRhLnRvU3RyaW5nKCd1Y3MyJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZWFkIGEgVW5pY29kZSBTdHJpbmcgKFVTVkFSQ0hBUilcbiAgcmVhZFVzVmFyQ2hhcihjYWxsYmFjazogKGRhdGE6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHRoaXMucmVhZFVJbnQxNkxFKChsZW5ndGgpID0+IHtcbiAgICAgIHRoaXMucmVhZEJ1ZmZlcihsZW5ndGggKiAyLCAoZGF0YSkgPT4ge1xuICAgICAgICBjYWxsYmFjayhkYXRhLnRvU3RyaW5nKCd1Y3MyJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZWFkIGJpbmFyeSBkYXRhIChCVkFSQllURSlcbiAgcmVhZEJWYXJCeXRlKGNhbGxiYWNrOiAoZGF0YTogQnVmZmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5yZWFkVUludDgoKGxlbmd0aCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQnVmZmVyKGxlbmd0aCwgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVhZCBiaW5hcnkgZGF0YSAoVVNWQVJCWVRFKVxuICByZWFkVXNWYXJCeXRlKGNhbGxiYWNrOiAoZGF0YTogQnVmZmVyKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5yZWFkVUludDE2TEUoKGxlbmd0aCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQnVmZmVyKGxlbmd0aCwgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcnNlcjtcbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxZQUFZLEdBQUc7RUFDbkIsQ0FBQ0MsWUFBS0MsSUFBTixHQUFhQywyQkFETTtFQUVuQixDQUFDRixZQUFLRyxVQUFOLEdBQW1CQyxpQ0FGQTtFQUduQixDQUFDSixZQUFLSyxRQUFOLEdBQWlCQywrQkFIRTtFQUluQixDQUFDTixZQUFLTyxTQUFOLEdBQWtCQyw2QkFKQztFQUtuQixDQUFDUixZQUFLUyxLQUFOLEdBQWNDLGlDQUxLO0VBTW5CLENBQUNWLFlBQUtXLFdBQU4sR0FBb0JDLDBCQU5EO0VBT25CLENBQUNaLFlBQUthLGFBQU4sR0FBc0JDLDRCQVBIO0VBUW5CLENBQUNkLFlBQUtlLElBQU4sR0FBYUMsZ0NBUk07RUFTbkIsQ0FBQ2hCLFlBQUtpQixRQUFOLEdBQWlCQyw0QkFURTtFQVVuQixDQUFDbEIsWUFBS21CLEtBQU4sR0FBY0MseUJBVks7RUFXbkIsQ0FBQ3BCLFlBQUtxQixZQUFOLEdBQXFCQyxnQ0FYRjtFQVluQixDQUFDdEIsWUFBS3VCLFdBQU4sR0FBb0JDLCtCQVpEO0VBYW5CLENBQUN4QixZQUFLeUIsSUFBTixHQUFhQztBQWJNLENBQXJCOztBQWtCQSxNQUFNQyxZQUFOLENBQW1CO0VBS2pCQyxXQUFXLENBQUNDLFFBQUQsRUFBcUQ7SUFBQSxLQUpoRUMsUUFJZ0U7SUFBQSxLQUhoRUMsTUFHZ0U7SUFBQSxLQUZoRUMsUUFFZ0U7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