"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class TimeoutError extends Error {
  constructor() {
    super('The operation was aborted due to timeout');
    this.code = void 0;
    this.code = 'TIMEOUT_ERR';
    this.name = 'TimeoutError';
  }

}

exports.default = TimeoutError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUaW1lb3V0RXJyb3IiLCJFcnJvciIsImNvbnN0cnVjdG9yIiwiY29kZSIsIm5hbWUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL3RpbWVvdXQtZXJyb3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb2RlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1RoZSBvcGVyYXRpb24gd2FzIGFib3J0ZWQgZHVlIHRvIHRpbWVvdXQnKTtcblxuICAgIHRoaXMuY29kZSA9ICdUSU1FT1VUX0VSUic7XG4gICAgdGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFlLE1BQU1BLFlBQU4sU0FBMkJDLEtBQTNCLENBQWlDO0VBRzlDQyxXQUFXLEdBQUc7SUFDWixNQUFNLDBDQUFOO0lBRFksS0FGZEMsSUFFYztJQUdaLEtBQUtBLElBQUwsR0FBWSxhQUFaO0lBQ0EsS0FBS0MsSUFBTCxHQUFZLGNBQVo7RUFDRDs7QUFSNkMifQ==