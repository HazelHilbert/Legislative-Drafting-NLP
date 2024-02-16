"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AbortError extends Error {
  constructor() {
    super('The operation was aborted');
    this.code = void 0;
    this.code = 'ABORT_ERR';
    this.name = 'AbortError';
  }

}

exports.default = AbortError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBYm9ydEVycm9yIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsImNvZGUiLCJuYW1lIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9hYm9ydC1lcnJvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBYm9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb2RlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1RoZSBvcGVyYXRpb24gd2FzIGFib3J0ZWQnKTtcblxuICAgIHRoaXMuY29kZSA9ICdBQk9SVF9FUlInO1xuICAgIHRoaXMubmFtZSA9ICdBYm9ydEVycm9yJztcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWUsTUFBTUEsVUFBTixTQUF5QkMsS0FBekIsQ0FBK0I7RUFHNUNDLFdBQVcsR0FBRztJQUNaLE1BQU0sMkJBQU47SUFEWSxLQUZkQyxJQUVjO0lBR1osS0FBS0EsSUFBTCxHQUFZLFdBQVo7SUFDQSxLQUFLQyxJQUFMLEdBQVksWUFBWjtFQUNEOztBQVIyQyJ9