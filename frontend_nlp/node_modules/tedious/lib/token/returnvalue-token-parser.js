"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _metadataParser = _interopRequireDefault(require("../metadata-parser"));

var _valueParser = _interopRequireDefault(require("../value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// s2.2.7.16
function returnParser(parser, options, callback) {
  parser.readUInt16LE(paramOrdinal => {
    parser.readBVarChar(paramName => {
      if (paramName.charAt(0) === '@') {
        paramName = paramName.slice(1);
      } // status


      parser.readUInt8(() => {
        (0, _metadataParser.default)(parser, options, metadata => {
          (0, _valueParser.default)(parser, metadata, options, value => {
            callback(new _token.ReturnValueToken({
              paramOrdinal: paramOrdinal,
              paramName: paramName,
              metadata: metadata,
              value: value
            }));
          });
        });
      });
    });
  });
}

var _default = returnParser;
exports.default = _default;
module.exports = returnParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXR1cm5QYXJzZXIiLCJwYXJzZXIiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJyZWFkVUludDE2TEUiLCJwYXJhbU9yZGluYWwiLCJyZWFkQlZhckNoYXIiLCJwYXJhbU5hbWUiLCJjaGFyQXQiLCJzbGljZSIsInJlYWRVSW50OCIsIm1ldGFkYXRhIiwidmFsdWUiLCJSZXR1cm5WYWx1ZVRva2VuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbi9yZXR1cm52YWx1ZS10b2tlbi1wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gczIuMi43LjE2XG5cbmltcG9ydCBQYXJzZXIsIHsgUGFyc2VyT3B0aW9ucyB9IGZyb20gJy4vc3RyZWFtLXBhcnNlcic7XG5cbmltcG9ydCB7IFJldHVyblZhbHVlVG9rZW4gfSBmcm9tICcuL3Rva2VuJztcblxuaW1wb3J0IG1ldGFkYXRhUGFyc2UgZnJvbSAnLi4vbWV0YWRhdGEtcGFyc2VyJztcbmltcG9ydCB2YWx1ZVBhcnNlIGZyb20gJy4uL3ZhbHVlLXBhcnNlcic7XG5cbmZ1bmN0aW9uIHJldHVyblBhcnNlcihwYXJzZXI6IFBhcnNlciwgb3B0aW9uczogUGFyc2VyT3B0aW9ucywgY2FsbGJhY2s6ICh0b2tlbjogUmV0dXJuVmFsdWVUb2tlbikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZFVJbnQxNkxFKChwYXJhbU9yZGluYWwpID0+IHtcbiAgICBwYXJzZXIucmVhZEJWYXJDaGFyKChwYXJhbU5hbWUpID0+IHtcbiAgICAgIGlmIChwYXJhbU5hbWUuY2hhckF0KDApID09PSAnQCcpIHtcbiAgICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lLnNsaWNlKDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBzdGF0dXNcbiAgICAgIHBhcnNlci5yZWFkVUludDgoKCkgPT4ge1xuICAgICAgICBtZXRhZGF0YVBhcnNlKHBhcnNlciwgb3B0aW9ucywgKG1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgdmFsdWVQYXJzZShwYXJzZXIsIG1ldGFkYXRhLCBvcHRpb25zLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBSZXR1cm5WYWx1ZVRva2VuKHtcbiAgICAgICAgICAgICAgcGFyYW1PcmRpbmFsOiBwYXJhbU9yZGluYWwsXG4gICAgICAgICAgICAgIHBhcmFtTmFtZTogcGFyYW1OYW1lLFxuICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmV0dXJuUGFyc2VyO1xubW9kdWxlLmV4cG9ydHMgPSByZXR1cm5QYXJzZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQTs7QUFFQTs7QUFDQTs7OztBQVBBO0FBU0EsU0FBU0EsWUFBVCxDQUFzQkMsTUFBdEIsRUFBc0NDLE9BQXRDLEVBQThEQyxRQUE5RCxFQUEyRztFQUN6R0YsTUFBTSxDQUFDRyxZQUFQLENBQXFCQyxZQUFELElBQWtCO0lBQ3BDSixNQUFNLENBQUNLLFlBQVAsQ0FBcUJDLFNBQUQsSUFBZTtNQUNqQyxJQUFJQSxTQUFTLENBQUNDLE1BQVYsQ0FBaUIsQ0FBakIsTUFBd0IsR0FBNUIsRUFBaUM7UUFDL0JELFNBQVMsR0FBR0EsU0FBUyxDQUFDRSxLQUFWLENBQWdCLENBQWhCLENBQVo7TUFDRCxDQUhnQyxDQUtqQzs7O01BQ0FSLE1BQU0sQ0FBQ1MsU0FBUCxDQUFpQixNQUFNO1FBQ3JCLDZCQUFjVCxNQUFkLEVBQXNCQyxPQUF0QixFQUFnQ1MsUUFBRCxJQUFjO1VBQzNDLDBCQUFXVixNQUFYLEVBQW1CVSxRQUFuQixFQUE2QlQsT0FBN0IsRUFBdUNVLEtBQUQsSUFBVztZQUMvQ1QsUUFBUSxDQUFDLElBQUlVLHVCQUFKLENBQXFCO2NBQzVCUixZQUFZLEVBQUVBLFlBRGM7Y0FFNUJFLFNBQVMsRUFBRUEsU0FGaUI7Y0FHNUJJLFFBQVEsRUFBRUEsUUFIa0I7Y0FJNUJDLEtBQUssRUFBRUE7WUFKcUIsQ0FBckIsQ0FBRCxDQUFSO1VBTUQsQ0FQRDtRQVFELENBVEQ7TUFVRCxDQVhEO0lBWUQsQ0FsQkQ7RUFtQkQsQ0FwQkQ7QUFxQkQ7O2VBRWNaLFk7O0FBQ2ZjLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmYsWUFBakIifQ==