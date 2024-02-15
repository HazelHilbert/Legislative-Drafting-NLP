"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

// s2.2.7.14
function orderParser(parser, _options, callback) {
  parser.readUInt16LE(length => {
    const columnCount = length / 2;
    const orderColumns = [];
    let i = 0;

    function next(done) {
      if (i === columnCount) {
        return done();
      }

      parser.readUInt16LE(column => {
        orderColumns.push(column);
        i++;
        next(done);
      });
    }

    next(() => {
      callback(new _token.OrderToken(orderColumns));
    });
  });
}

var _default = orderParser;
exports.default = _default;
module.exports = orderParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcmRlclBhcnNlciIsInBhcnNlciIsIl9vcHRpb25zIiwiY2FsbGJhY2siLCJyZWFkVUludDE2TEUiLCJsZW5ndGgiLCJjb2x1bW5Db3VudCIsIm9yZGVyQ29sdW1ucyIsImkiLCJuZXh0IiwiZG9uZSIsImNvbHVtbiIsInB1c2giLCJPcmRlclRva2VuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbi9vcmRlci10b2tlbi1wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gczIuMi43LjE0XG5pbXBvcnQgUGFyc2VyLCB7IFBhcnNlck9wdGlvbnMgfSBmcm9tICcuL3N0cmVhbS1wYXJzZXInO1xuXG5pbXBvcnQgeyBPcmRlclRva2VuIH0gZnJvbSAnLi90b2tlbic7XG5cbmZ1bmN0aW9uIG9yZGVyUGFyc2VyKHBhcnNlcjogUGFyc2VyLCBfb3B0aW9uczogUGFyc2VyT3B0aW9ucywgY2FsbGJhY2s6ICh0b2tlbjogT3JkZXJUb2tlbikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZFVJbnQxNkxFKChsZW5ndGgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5Db3VudCA9IGxlbmd0aCAvIDI7XG4gICAgY29uc3Qgb3JkZXJDb2x1bW5zOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIGZ1bmN0aW9uIG5leHQoZG9uZTogKCkgPT4gdm9pZCkge1xuICAgICAgaWYgKGkgPT09IGNvbHVtbkNvdW50KSB7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9XG5cbiAgICAgIHBhcnNlci5yZWFkVUludDE2TEUoKGNvbHVtbikgPT4ge1xuICAgICAgICBvcmRlckNvbHVtbnMucHVzaChjb2x1bW4pO1xuXG4gICAgICAgIGkrKztcblxuICAgICAgICBuZXh0KGRvbmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV4dCgoKSA9PiB7XG4gICAgICBjYWxsYmFjayhuZXcgT3JkZXJUb2tlbihvcmRlckNvbHVtbnMpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yZGVyUGFyc2VyO1xubW9kdWxlLmV4cG9ydHMgPSBvcmRlclBhcnNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOztBQUhBO0FBS0EsU0FBU0EsV0FBVCxDQUFxQkMsTUFBckIsRUFBcUNDLFFBQXJDLEVBQThEQyxRQUE5RCxFQUFxRztFQUNuR0YsTUFBTSxDQUFDRyxZQUFQLENBQXFCQyxNQUFELElBQVk7SUFDOUIsTUFBTUMsV0FBVyxHQUFHRCxNQUFNLEdBQUcsQ0FBN0I7SUFDQSxNQUFNRSxZQUFzQixHQUFHLEVBQS9CO0lBRUEsSUFBSUMsQ0FBQyxHQUFHLENBQVI7O0lBQ0EsU0FBU0MsSUFBVCxDQUFjQyxJQUFkLEVBQWdDO01BQzlCLElBQUlGLENBQUMsS0FBS0YsV0FBVixFQUF1QjtRQUNyQixPQUFPSSxJQUFJLEVBQVg7TUFDRDs7TUFFRFQsTUFBTSxDQUFDRyxZQUFQLENBQXFCTyxNQUFELElBQVk7UUFDOUJKLFlBQVksQ0FBQ0ssSUFBYixDQUFrQkQsTUFBbEI7UUFFQUgsQ0FBQztRQUVEQyxJQUFJLENBQUNDLElBQUQsQ0FBSjtNQUNELENBTkQ7SUFPRDs7SUFFREQsSUFBSSxDQUFDLE1BQU07TUFDVE4sUUFBUSxDQUFDLElBQUlVLGlCQUFKLENBQWVOLFlBQWYsQ0FBRCxDQUFSO0lBQ0QsQ0FGRyxDQUFKO0VBR0QsQ0F0QkQ7QUF1QkQ7O2VBRWNQLFc7O0FBQ2ZjLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmYsV0FBakIifQ==