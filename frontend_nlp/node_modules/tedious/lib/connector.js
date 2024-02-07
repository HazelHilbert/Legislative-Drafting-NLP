"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectInParallel = connectInParallel;
exports.connectInSequence = connectInSequence;
exports.lookupAllAddresses = lookupAllAddresses;

var _net = _interopRequireDefault(require("net"));

var punycode = _interopRequireWildcard(require("punycode"));

var _abortError = _interopRequireDefault(require("./errors/abort-error"));

var _esAggregateError = _interopRequireDefault(require("es-aggregate-error"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function connectInParallel(options, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }

  const addresses = await lookupAllAddresses(options.host, lookup, signal);
  return await new Promise((resolve, reject) => {
    const sockets = new Array(addresses.length);
    const errors = [];

    function onError(err) {
      errors.push(err);
      this.removeListener('error', onError);
      this.removeListener('connect', onConnect);
      this.destroy();

      if (errors.length === addresses.length) {
        signal.removeEventListener('abort', onAbort);
        reject(new _esAggregateError.default(errors, 'Could not connect (parallel)'));
      }
    }

    function onConnect() {
      signal.removeEventListener('abort', onAbort);

      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];

        if (this === socket) {
          continue;
        }

        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }

      resolve(this);
    }

    const onAbort = () => {
      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }

      reject(new _abortError.default());
    };

    for (let i = 0, len = addresses.length; i < len; i++) {
      const socket = sockets[i] = _net.default.connect({ ...options,
        host: addresses[i].address,
        family: addresses[i].family
      });

      socket.on('error', onError);
      socket.on('connect', onConnect);
    }

    signal.addEventListener('abort', onAbort, {
      once: true
    });
  });
}

async function connectInSequence(options, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }

  const errors = [];
  const addresses = await lookupAllAddresses(options.host, lookup, signal);

  for (const address of addresses) {
    try {
      return await new Promise((resolve, reject) => {
        const socket = _net.default.connect({ ...options,
          host: address.address,
          family: address.family
        });

        const onAbort = () => {
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          socket.destroy();
          reject(new _abortError.default());
        };

        const onError = err => {
          signal.removeEventListener('abort', onAbort);
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          socket.destroy();
          reject(err);
        };

        const onConnect = () => {
          signal.removeEventListener('abort', onAbort);
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          resolve(socket);
        };

        signal.addEventListener('abort', onAbort, {
          once: true
        });
        socket.on('error', onError);
        socket.on('connect', onConnect);
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }

      errors.push(err);
      continue;
    }
  }

  throw new _esAggregateError.default(errors, 'Could not connect (sequence)');
}
/**
 * Look up all addresses for the given hostname.
 */


async function lookupAllAddresses(host, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }

  if (_net.default.isIPv6(host)) {
    return [{
      address: host,
      family: 6
    }];
  } else if (_net.default.isIPv4(host)) {
    return [{
      address: host,
      family: 4
    }];
  } else {
    return await new Promise((resolve, reject) => {
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
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb25uZWN0SW5QYXJhbGxlbCIsIm9wdGlvbnMiLCJsb29rdXAiLCJzaWduYWwiLCJhYm9ydGVkIiwiQWJvcnRFcnJvciIsImFkZHJlc3NlcyIsImxvb2t1cEFsbEFkZHJlc3NlcyIsImhvc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNvY2tldHMiLCJBcnJheSIsImxlbmd0aCIsImVycm9ycyIsIm9uRXJyb3IiLCJlcnIiLCJwdXNoIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkNvbm5lY3QiLCJkZXN0cm95IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uQWJvcnQiLCJBZ2dyZWdhdGVFcnJvciIsImoiLCJzb2NrZXQiLCJpIiwibGVuIiwibmV0IiwiY29ubmVjdCIsImFkZHJlc3MiLCJmYW1pbHkiLCJvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiY29ubmVjdEluU2VxdWVuY2UiLCJFcnJvciIsIm5hbWUiLCJpc0lQdjYiLCJpc0lQdjQiLCJwdW55Y29kZSIsInRvQVNDSUkiLCJhbGwiXSwic291cmNlcyI6WyIuLi9zcmMvY29ubmVjdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuZXQgZnJvbSAnbmV0JztcbmltcG9ydCBkbnMsIHsgTG9va3VwQWRkcmVzcyB9IGZyb20gJ2Rucyc7XG5cbmltcG9ydCAqIGFzIHB1bnljb2RlIGZyb20gJ3B1bnljb2RlJztcbmltcG9ydCB7IEFib3J0U2lnbmFsIH0gZnJvbSAnbm9kZS1hYm9ydC1jb250cm9sbGVyJztcbmltcG9ydCBBYm9ydEVycm9yIGZyb20gJy4vZXJyb3JzL2Fib3J0LWVycm9yJztcblxuaW1wb3J0IEFnZ3JlZ2F0ZUVycm9yIGZyb20gJ2VzLWFnZ3JlZ2F0ZS1lcnJvcic7XG5cbnR5cGUgTG9va3VwRnVuY3Rpb24gPSAoaG9zdG5hbWU6IHN0cmluZywgb3B0aW9uczogZG5zLkxvb2t1cEFsbE9wdGlvbnMsIGNhbGxiYWNrOiAoZXJyOiBOb2RlSlMuRXJybm9FeGNlcHRpb24gfCBudWxsLCBhZGRyZXNzZXM6IGRucy5Mb29rdXBBZGRyZXNzW10pID0+IHZvaWQpID0+IHZvaWQ7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0SW5QYXJhbGxlbChvcHRpb25zOiB7IGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyLCBsb2NhbEFkZHJlc3M/OiBzdHJpbmcgfCB1bmRlZmluZWQgfSwgbG9va3VwOiBMb29rdXBGdW5jdGlvbiwgc2lnbmFsOiBBYm9ydFNpZ25hbCkge1xuICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQWJvcnRFcnJvcigpO1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc2VzID0gYXdhaXQgbG9va3VwQWxsQWRkcmVzc2VzKG9wdGlvbnMuaG9zdCwgbG9va3VwLCBzaWduYWwpO1xuXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxuZXQuU29ja2V0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc29ja2V0cyA9IG5ldyBBcnJheShhZGRyZXNzZXMubGVuZ3RoKTtcblxuICAgIGNvbnN0IGVycm9yczogRXJyb3JbXSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gb25FcnJvcih0aGlzOiBuZXQuU29ja2V0LCBlcnI6IEVycm9yKSB7XG4gICAgICBlcnJvcnMucHVzaChlcnIpO1xuXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY29ubmVjdCcsIG9uQ29ubmVjdCk7XG5cbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gYWRkcmVzc2VzLmxlbmd0aCkge1xuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkFib3J0KTtcblxuICAgICAgICByZWplY3QobmV3IEFnZ3JlZ2F0ZUVycm9yKGVycm9ycywgJ0NvdWxkIG5vdCBjb25uZWN0IChwYXJhbGxlbCknKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db25uZWN0KHRoaXM6IG5ldC5Tb2NrZXQpIHtcbiAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQWJvcnQpO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNvY2tldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gc29ja2V0c1tqXTtcblxuICAgICAgICBpZiAodGhpcyA9PT0gc29ja2V0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignY29ubmVjdCcsIG9uQ29ubmVjdCk7XG4gICAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25BYm9ydCA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc29ja2V0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBzb2NrZXQgPSBzb2NrZXRzW2pdO1xuXG4gICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjb25uZWN0Jywgb25Db25uZWN0KTtcblxuICAgICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEFib3J0RXJyb3IoKSk7XG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhZGRyZXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNvY2tldCA9IHNvY2tldHNbaV0gPSBuZXQuY29ubmVjdCh7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhvc3Q6IGFkZHJlc3Nlc1tpXS5hZGRyZXNzLFxuICAgICAgICBmYW1pbHk6IGFkZHJlc3Nlc1tpXS5mYW1pbHlcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpO1xuICAgIH1cblxuICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQWJvcnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0SW5TZXF1ZW5jZShvcHRpb25zOiB7IGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyLCBsb2NhbEFkZHJlc3M/OiBzdHJpbmcgfCB1bmRlZmluZWQgfSwgbG9va3VwOiBMb29rdXBGdW5jdGlvbiwgc2lnbmFsOiBBYm9ydFNpZ25hbCkge1xuICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQWJvcnRFcnJvcigpO1xuICB9XG5cbiAgY29uc3QgZXJyb3JzOiBhbnlbXSA9IFtdO1xuICBjb25zdCBhZGRyZXNzZXMgPSBhd2FpdCBsb29rdXBBbGxBZGRyZXNzZXMob3B0aW9ucy5ob3N0LCBsb29rdXAsIHNpZ25hbCk7XG5cbiAgZm9yIChjb25zdCBhZGRyZXNzIG9mIGFkZHJlc3Nlcykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8bmV0LlNvY2tldD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBzb2NrZXQgPSBuZXQuY29ubmVjdCh7XG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICBob3N0OiBhZGRyZXNzLmFkZHJlc3MsXG4gICAgICAgICAgZmFtaWx5OiBhZGRyZXNzLmZhbWlseVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvbkFib3J0ID0gKCkgPT4ge1xuICAgICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpO1xuXG4gICAgICAgICAgc29ja2V0LmRlc3Ryb3koKTtcblxuICAgICAgICAgIHJlamVjdChuZXcgQWJvcnRFcnJvcigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbkVycm9yID0gKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkFib3J0KTtcblxuICAgICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpO1xuXG4gICAgICAgICAgc29ja2V0LmRlc3Ryb3koKTtcblxuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkFib3J0KTtcblxuICAgICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3QnLCBvbkNvbm5lY3QpO1xuXG4gICAgICAgICAgcmVzb2x2ZShzb2NrZXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQWJvcnQsIHsgb25jZTogdHJ1ZSB9KTtcblxuICAgICAgICBzb2NrZXQub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsIG9uQ29ubmVjdCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnIubmFtZSA9PT0gJ0Fib3J0RXJyb3InKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cblxuICAgICAgZXJyb3JzLnB1c2goZXJyKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IEFnZ3JlZ2F0ZUVycm9yKGVycm9ycywgJ0NvdWxkIG5vdCBjb25uZWN0IChzZXF1ZW5jZSknKTtcbn1cblxuLyoqXG4gKiBMb29rIHVwIGFsbCBhZGRyZXNzZXMgZm9yIHRoZSBnaXZlbiBob3N0bmFtZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvb2t1cEFsbEFkZHJlc3Nlcyhob3N0OiBzdHJpbmcsIGxvb2t1cDogTG9va3VwRnVuY3Rpb24sIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPGRucy5Mb29rdXBBZGRyZXNzW10+IHtcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEFib3J0RXJyb3IoKTtcbiAgfVxuXG4gIGlmIChuZXQuaXNJUHY2KGhvc3QpKSB7XG4gICAgcmV0dXJuIFt7IGFkZHJlc3M6IGhvc3QsIGZhbWlseTogNiB9XTtcbiAgfSBlbHNlIGlmIChuZXQuaXNJUHY0KGhvc3QpKSB7XG4gICAgcmV0dXJuIFt7IGFkZHJlc3M6IGhvc3QsIGZhbWlseTogNCB9XTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8TG9va3VwQWRkcmVzc1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvbkFib3J0ID0gKCkgPT4ge1xuICAgICAgICByZWplY3QobmV3IEFib3J0RXJyb3IoKSk7XG4gICAgICB9O1xuXG4gICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkFib3J0KTtcblxuICAgICAgbG9va3VwKHB1bnljb2RlLnRvQVNDSUkoaG9zdCksIHsgYWxsOiB0cnVlIH0sIChlcnIsIGFkZHJlc3NlcykgPT4ge1xuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkFib3J0KTtcblxuICAgICAgICBlcnIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoYWRkcmVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUVBOzs7Ozs7OztBQUlPLGVBQWVBLGlCQUFmLENBQWlDQyxPQUFqQyxFQUE2R0MsTUFBN0csRUFBcUlDLE1BQXJJLEVBQTBKO0VBQy9KLElBQUlBLE1BQU0sQ0FBQ0MsT0FBWCxFQUFvQjtJQUNsQixNQUFNLElBQUlDLG1CQUFKLEVBQU47RUFDRDs7RUFFRCxNQUFNQyxTQUFTLEdBQUcsTUFBTUMsa0JBQWtCLENBQUNOLE9BQU8sQ0FBQ08sSUFBVCxFQUFlTixNQUFmLEVBQXVCQyxNQUF2QixDQUExQztFQUVBLE9BQU8sTUFBTSxJQUFJTSxPQUFKLENBQXdCLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtJQUN4RCxNQUFNQyxPQUFPLEdBQUcsSUFBSUMsS0FBSixDQUFVUCxTQUFTLENBQUNRLE1BQXBCLENBQWhCO0lBRUEsTUFBTUMsTUFBZSxHQUFHLEVBQXhCOztJQUVBLFNBQVNDLE9BQVQsQ0FBbUNDLEdBQW5DLEVBQStDO01BQzdDRixNQUFNLENBQUNHLElBQVAsQ0FBWUQsR0FBWjtNQUVBLEtBQUtFLGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJILE9BQTdCO01BQ0EsS0FBS0csY0FBTCxDQUFvQixTQUFwQixFQUErQkMsU0FBL0I7TUFFQSxLQUFLQyxPQUFMOztNQUVBLElBQUlOLE1BQU0sQ0FBQ0QsTUFBUCxLQUFrQlIsU0FBUyxDQUFDUSxNQUFoQyxFQUF3QztRQUN0Q1gsTUFBTSxDQUFDbUIsbUJBQVAsQ0FBMkIsT0FBM0IsRUFBb0NDLE9BQXBDO1FBRUFaLE1BQU0sQ0FBQyxJQUFJYSx5QkFBSixDQUFtQlQsTUFBbkIsRUFBMkIsOEJBQTNCLENBQUQsQ0FBTjtNQUNEO0lBQ0Y7O0lBRUQsU0FBU0ssU0FBVCxHQUFxQztNQUNuQ2pCLE1BQU0sQ0FBQ21CLG1CQUFQLENBQTJCLE9BQTNCLEVBQW9DQyxPQUFwQzs7TUFFQSxLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdiLE9BQU8sQ0FBQ0UsTUFBNUIsRUFBb0NXLENBQUMsRUFBckMsRUFBeUM7UUFDdkMsTUFBTUMsTUFBTSxHQUFHZCxPQUFPLENBQUNhLENBQUQsQ0FBdEI7O1FBRUEsSUFBSSxTQUFTQyxNQUFiLEVBQXFCO1VBQ25CO1FBQ0Q7O1FBRURBLE1BQU0sQ0FBQ1AsY0FBUCxDQUFzQixPQUF0QixFQUErQkgsT0FBL0I7UUFDQVUsTUFBTSxDQUFDUCxjQUFQLENBQXNCLFNBQXRCLEVBQWlDQyxTQUFqQztRQUNBTSxNQUFNLENBQUNMLE9BQVA7TUFDRDs7TUFFRFgsT0FBTyxDQUFDLElBQUQsQ0FBUDtJQUNEOztJQUVELE1BQU1hLE9BQU8sR0FBRyxNQUFNO01BQ3BCLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsT0FBTyxDQUFDRSxNQUE1QixFQUFvQ1csQ0FBQyxFQUFyQyxFQUF5QztRQUN2QyxNQUFNQyxNQUFNLEdBQUdkLE9BQU8sQ0FBQ2EsQ0FBRCxDQUF0QjtRQUVBQyxNQUFNLENBQUNQLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0JILE9BQS9CO1FBQ0FVLE1BQU0sQ0FBQ1AsY0FBUCxDQUFzQixTQUF0QixFQUFpQ0MsU0FBakM7UUFFQU0sTUFBTSxDQUFDTCxPQUFQO01BQ0Q7O01BRURWLE1BQU0sQ0FBQyxJQUFJTixtQkFBSixFQUFELENBQU47SUFDRCxDQVhEOztJQWFBLEtBQUssSUFBSXNCLENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBR3RCLFNBQVMsQ0FBQ1EsTUFBaEMsRUFBd0NhLENBQUMsR0FBR0MsR0FBNUMsRUFBaURELENBQUMsRUFBbEQsRUFBc0Q7TUFDcEQsTUFBTUQsTUFBTSxHQUFHZCxPQUFPLENBQUNlLENBQUQsQ0FBUCxHQUFhRSxhQUFJQyxPQUFKLENBQVksRUFDdEMsR0FBRzdCLE9BRG1DO1FBRXRDTyxJQUFJLEVBQUVGLFNBQVMsQ0FBQ3FCLENBQUQsQ0FBVCxDQUFhSSxPQUZtQjtRQUd0Q0MsTUFBTSxFQUFFMUIsU0FBUyxDQUFDcUIsQ0FBRCxDQUFULENBQWFLO01BSGlCLENBQVosQ0FBNUI7O01BTUFOLE1BQU0sQ0FBQ08sRUFBUCxDQUFVLE9BQVYsRUFBbUJqQixPQUFuQjtNQUNBVSxNQUFNLENBQUNPLEVBQVAsQ0FBVSxTQUFWLEVBQXFCYixTQUFyQjtJQUNEOztJQUVEakIsTUFBTSxDQUFDK0IsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNYLE9BQWpDLEVBQTBDO01BQUVZLElBQUksRUFBRTtJQUFSLENBQTFDO0VBQ0QsQ0EvRFksQ0FBYjtBQWdFRDs7QUFFTSxlQUFlQyxpQkFBZixDQUFpQ25DLE9BQWpDLEVBQTZHQyxNQUE3RyxFQUFxSUMsTUFBckksRUFBMEo7RUFDL0osSUFBSUEsTUFBTSxDQUFDQyxPQUFYLEVBQW9CO0lBQ2xCLE1BQU0sSUFBSUMsbUJBQUosRUFBTjtFQUNEOztFQUVELE1BQU1VLE1BQWEsR0FBRyxFQUF0QjtFQUNBLE1BQU1ULFNBQVMsR0FBRyxNQUFNQyxrQkFBa0IsQ0FBQ04sT0FBTyxDQUFDTyxJQUFULEVBQWVOLE1BQWYsRUFBdUJDLE1BQXZCLENBQTFDOztFQUVBLEtBQUssTUFBTTRCLE9BQVgsSUFBc0J6QixTQUF0QixFQUFpQztJQUMvQixJQUFJO01BQ0YsT0FBTyxNQUFNLElBQUlHLE9BQUosQ0FBd0IsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO1FBQ3hELE1BQU1lLE1BQU0sR0FBR0csYUFBSUMsT0FBSixDQUFZLEVBQ3pCLEdBQUc3QixPQURzQjtVQUV6Qk8sSUFBSSxFQUFFdUIsT0FBTyxDQUFDQSxPQUZXO1VBR3pCQyxNQUFNLEVBQUVELE9BQU8sQ0FBQ0M7UUFIUyxDQUFaLENBQWY7O1FBTUEsTUFBTVQsT0FBTyxHQUFHLE1BQU07VUFDcEJHLE1BQU0sQ0FBQ1AsY0FBUCxDQUFzQixPQUF0QixFQUErQkgsT0FBL0I7VUFDQVUsTUFBTSxDQUFDUCxjQUFQLENBQXNCLFNBQXRCLEVBQWlDQyxTQUFqQztVQUVBTSxNQUFNLENBQUNMLE9BQVA7VUFFQVYsTUFBTSxDQUFDLElBQUlOLG1CQUFKLEVBQUQsQ0FBTjtRQUNELENBUEQ7O1FBU0EsTUFBTVcsT0FBTyxHQUFJQyxHQUFELElBQWdCO1VBQzlCZCxNQUFNLENBQUNtQixtQkFBUCxDQUEyQixPQUEzQixFQUFvQ0MsT0FBcEM7VUFFQUcsTUFBTSxDQUFDUCxjQUFQLENBQXNCLE9BQXRCLEVBQStCSCxPQUEvQjtVQUNBVSxNQUFNLENBQUNQLGNBQVAsQ0FBc0IsU0FBdEIsRUFBaUNDLFNBQWpDO1VBRUFNLE1BQU0sQ0FBQ0wsT0FBUDtVQUVBVixNQUFNLENBQUNNLEdBQUQsQ0FBTjtRQUNELENBVEQ7O1FBV0EsTUFBTUcsU0FBUyxHQUFHLE1BQU07VUFDdEJqQixNQUFNLENBQUNtQixtQkFBUCxDQUEyQixPQUEzQixFQUFvQ0MsT0FBcEM7VUFFQUcsTUFBTSxDQUFDUCxjQUFQLENBQXNCLE9BQXRCLEVBQStCSCxPQUEvQjtVQUNBVSxNQUFNLENBQUNQLGNBQVAsQ0FBc0IsU0FBdEIsRUFBaUNDLFNBQWpDO1VBRUFWLE9BQU8sQ0FBQ2dCLE1BQUQsQ0FBUDtRQUNELENBUEQ7O1FBU0F2QixNQUFNLENBQUMrQixnQkFBUCxDQUF3QixPQUF4QixFQUFpQ1gsT0FBakMsRUFBMEM7VUFBRVksSUFBSSxFQUFFO1FBQVIsQ0FBMUM7UUFFQVQsTUFBTSxDQUFDTyxFQUFQLENBQVUsT0FBVixFQUFtQmpCLE9BQW5CO1FBQ0FVLE1BQU0sQ0FBQ08sRUFBUCxDQUFVLFNBQVYsRUFBcUJiLFNBQXJCO01BQ0QsQ0F4Q1ksQ0FBYjtJQXlDRCxDQTFDRCxDQTBDRSxPQUFPSCxHQUFQLEVBQVk7TUFDWixJQUFJQSxHQUFHLFlBQVlvQixLQUFmLElBQXdCcEIsR0FBRyxDQUFDcUIsSUFBSixLQUFhLFlBQXpDLEVBQXVEO1FBQ3JELE1BQU1yQixHQUFOO01BQ0Q7O01BRURGLE1BQU0sQ0FBQ0csSUFBUCxDQUFZRCxHQUFaO01BRUE7SUFDRDtFQUNGOztFQUVELE1BQU0sSUFBSU8seUJBQUosQ0FBbUJULE1BQW5CLEVBQTJCLDhCQUEzQixDQUFOO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7OztBQUNPLGVBQWVSLGtCQUFmLENBQWtDQyxJQUFsQyxFQUFnRE4sTUFBaEQsRUFBd0VDLE1BQXhFLEVBQTJIO0VBQ2hJLElBQUlBLE1BQU0sQ0FBQ0MsT0FBWCxFQUFvQjtJQUNsQixNQUFNLElBQUlDLG1CQUFKLEVBQU47RUFDRDs7RUFFRCxJQUFJd0IsYUFBSVUsTUFBSixDQUFXL0IsSUFBWCxDQUFKLEVBQXNCO0lBQ3BCLE9BQU8sQ0FBQztNQUFFdUIsT0FBTyxFQUFFdkIsSUFBWDtNQUFpQndCLE1BQU0sRUFBRTtJQUF6QixDQUFELENBQVA7RUFDRCxDQUZELE1BRU8sSUFBSUgsYUFBSVcsTUFBSixDQUFXaEMsSUFBWCxDQUFKLEVBQXNCO0lBQzNCLE9BQU8sQ0FBQztNQUFFdUIsT0FBTyxFQUFFdkIsSUFBWDtNQUFpQndCLE1BQU0sRUFBRTtJQUF6QixDQUFELENBQVA7RUFDRCxDQUZNLE1BRUE7SUFDTCxPQUFPLE1BQU0sSUFBSXZCLE9BQUosQ0FBNkIsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO01BQzdELE1BQU1ZLE9BQU8sR0FBRyxNQUFNO1FBQ3BCWixNQUFNLENBQUMsSUFBSU4sbUJBQUosRUFBRCxDQUFOO01BQ0QsQ0FGRDs7TUFJQUYsTUFBTSxDQUFDK0IsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNYLE9BQWpDO01BRUFyQixNQUFNLENBQUN1QyxRQUFRLENBQUNDLE9BQVQsQ0FBaUJsQyxJQUFqQixDQUFELEVBQXlCO1FBQUVtQyxHQUFHLEVBQUU7TUFBUCxDQUF6QixFQUF3QyxDQUFDMUIsR0FBRCxFQUFNWCxTQUFOLEtBQW9CO1FBQ2hFSCxNQUFNLENBQUNtQixtQkFBUCxDQUEyQixPQUEzQixFQUFvQ0MsT0FBcEM7UUFFQU4sR0FBRyxHQUFHTixNQUFNLENBQUNNLEdBQUQsQ0FBVCxHQUFpQlAsT0FBTyxDQUFDSixTQUFELENBQTNCO01BQ0QsQ0FKSyxDQUFOO0lBS0QsQ0FaWSxDQUFiO0VBYUQ7QUFDRiJ9