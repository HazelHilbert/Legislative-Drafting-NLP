"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _token = require("./token");

var _tdsVersions = require("../tds-versions");

const interfaceTypes = {
  0: 'SQL_DFLT',
  1: 'SQL_TSQL'
};

function loginAckParser(parser, _options, callback) {
  // length
  parser.readUInt16LE(() => {
    parser.readUInt8(interfaceNumber => {
      const interfaceType = interfaceTypes[interfaceNumber];
      parser.readUInt32BE(tdsVersionNumber => {
        const tdsVersion = _tdsVersions.versionsByValue[tdsVersionNumber];
        parser.readBVarChar(progName => {
          parser.readUInt8(major => {
            parser.readUInt8(minor => {
              parser.readUInt8(buildNumHi => {
                parser.readUInt8(buildNumLow => {
                  callback(new _token.LoginAckToken({
                    interface: interfaceType,
                    tdsVersion: tdsVersion,
                    progName: progName,
                    progVersion: {
                      major: major,
                      minor: minor,
                      buildNumHi: buildNumHi,
                      buildNumLow: buildNumLow
                    }
                  }));
                });
              });
            });
          });
        });
      });
    });
  });
}

var _default = loginAckParser;
exports.default = _default;
module.exports = loginAckParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpbnRlcmZhY2VUeXBlcyIsImxvZ2luQWNrUGFyc2VyIiwicGFyc2VyIiwiX29wdGlvbnMiLCJjYWxsYmFjayIsInJlYWRVSW50MTZMRSIsInJlYWRVSW50OCIsImludGVyZmFjZU51bWJlciIsImludGVyZmFjZVR5cGUiLCJyZWFkVUludDMyQkUiLCJ0ZHNWZXJzaW9uTnVtYmVyIiwidGRzVmVyc2lvbiIsInZlcnNpb25zIiwicmVhZEJWYXJDaGFyIiwicHJvZ05hbWUiLCJtYWpvciIsIm1pbm9yIiwiYnVpbGROdW1IaSIsImJ1aWxkTnVtTG93IiwiTG9naW5BY2tUb2tlbiIsImludGVyZmFjZSIsInByb2dWZXJzaW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbi9sb2dpbmFjay10b2tlbi1wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlciwgeyBQYXJzZXJPcHRpb25zIH0gZnJvbSAnLi9zdHJlYW0tcGFyc2VyJztcblxuaW1wb3J0IHsgTG9naW5BY2tUb2tlbiB9IGZyb20gJy4vdG9rZW4nO1xuXG5pbXBvcnQgeyB2ZXJzaW9uc0J5VmFsdWUgYXMgdmVyc2lvbnMgfSBmcm9tICcuLi90ZHMtdmVyc2lvbnMnO1xuXG5jb25zdCBpbnRlcmZhY2VUeXBlczogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcbiAgMDogJ1NRTF9ERkxUJyxcbiAgMTogJ1NRTF9UU1FMJ1xufTtcblxuZnVuY3Rpb24gbG9naW5BY2tQYXJzZXIocGFyc2VyOiBQYXJzZXIsIF9vcHRpb25zOiBQYXJzZXJPcHRpb25zLCBjYWxsYmFjazogKHRva2VuOiBMb2dpbkFja1Rva2VuKSA9PiB2b2lkKSB7XG4gIC8vIGxlbmd0aFxuICBwYXJzZXIucmVhZFVJbnQxNkxFKCgpID0+IHtcbiAgICBwYXJzZXIucmVhZFVJbnQ4KChpbnRlcmZhY2VOdW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGludGVyZmFjZVR5cGUgPSBpbnRlcmZhY2VUeXBlc1tpbnRlcmZhY2VOdW1iZXJdO1xuICAgICAgcGFyc2VyLnJlYWRVSW50MzJCRSgodGRzVmVyc2lvbk51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCB0ZHNWZXJzaW9uID0gdmVyc2lvbnNbdGRzVmVyc2lvbk51bWJlcl07XG4gICAgICAgIHBhcnNlci5yZWFkQlZhckNoYXIoKHByb2dOYW1lKSA9PiB7XG4gICAgICAgICAgcGFyc2VyLnJlYWRVSW50OCgobWFqb3IpID0+IHtcbiAgICAgICAgICAgIHBhcnNlci5yZWFkVUludDgoKG1pbm9yKSA9PiB7XG4gICAgICAgICAgICAgIHBhcnNlci5yZWFkVUludDgoKGJ1aWxkTnVtSGkpID0+IHtcbiAgICAgICAgICAgICAgICBwYXJzZXIucmVhZFVJbnQ4KChidWlsZE51bUxvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IExvZ2luQWNrVG9rZW4oe1xuICAgICAgICAgICAgICAgICAgICBpbnRlcmZhY2U6IGludGVyZmFjZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRkc1ZlcnNpb246IHRkc1ZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgIHByb2dOYW1lOiBwcm9nTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZ1ZlcnNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBtYWpvcjogbWFqb3IsXG4gICAgICAgICAgICAgICAgICAgICAgbWlub3I6IG1pbm9yLFxuICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkTnVtSGk6IGJ1aWxkTnVtSGksXG4gICAgICAgICAgICAgICAgICAgICAgYnVpbGROdW1Mb3c6IGJ1aWxkTnVtTG93XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2luQWNrUGFyc2VyO1xubW9kdWxlLmV4cG9ydHMgPSBsb2dpbkFja1BhcnNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUVBOztBQUVBLE1BQU1BLGNBQXlDLEdBQUc7RUFDaEQsR0FBRyxVQUQ2QztFQUVoRCxHQUFHO0FBRjZDLENBQWxEOztBQUtBLFNBQVNDLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQXdDQyxRQUF4QyxFQUFpRUMsUUFBakUsRUFBMkc7RUFDekc7RUFDQUYsTUFBTSxDQUFDRyxZQUFQLENBQW9CLE1BQU07SUFDeEJILE1BQU0sQ0FBQ0ksU0FBUCxDQUFrQkMsZUFBRCxJQUFxQjtNQUNwQyxNQUFNQyxhQUFhLEdBQUdSLGNBQWMsQ0FBQ08sZUFBRCxDQUFwQztNQUNBTCxNQUFNLENBQUNPLFlBQVAsQ0FBcUJDLGdCQUFELElBQXNCO1FBQ3hDLE1BQU1DLFVBQVUsR0FBR0MsNkJBQVNGLGdCQUFULENBQW5CO1FBQ0FSLE1BQU0sQ0FBQ1csWUFBUCxDQUFxQkMsUUFBRCxJQUFjO1VBQ2hDWixNQUFNLENBQUNJLFNBQVAsQ0FBa0JTLEtBQUQsSUFBVztZQUMxQmIsTUFBTSxDQUFDSSxTQUFQLENBQWtCVSxLQUFELElBQVc7Y0FDMUJkLE1BQU0sQ0FBQ0ksU0FBUCxDQUFrQlcsVUFBRCxJQUFnQjtnQkFDL0JmLE1BQU0sQ0FBQ0ksU0FBUCxDQUFrQlksV0FBRCxJQUFpQjtrQkFDaENkLFFBQVEsQ0FBQyxJQUFJZSxvQkFBSixDQUFrQjtvQkFDekJDLFNBQVMsRUFBRVosYUFEYztvQkFFekJHLFVBQVUsRUFBRUEsVUFGYTtvQkFHekJHLFFBQVEsRUFBRUEsUUFIZTtvQkFJekJPLFdBQVcsRUFBRTtzQkFDWE4sS0FBSyxFQUFFQSxLQURJO3NCQUVYQyxLQUFLLEVBQUVBLEtBRkk7c0JBR1hDLFVBQVUsRUFBRUEsVUFIRDtzQkFJWEMsV0FBVyxFQUFFQTtvQkFKRjtrQkFKWSxDQUFsQixDQUFELENBQVI7Z0JBV0QsQ0FaRDtjQWFELENBZEQ7WUFlRCxDQWhCRDtVQWlCRCxDQWxCRDtRQW1CRCxDQXBCRDtNQXFCRCxDQXZCRDtJQXdCRCxDQTFCRDtFQTJCRCxDQTVCRDtBQTZCRDs7ZUFFY2pCLGM7O0FBQ2ZxQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QixjQUFqQiJ9