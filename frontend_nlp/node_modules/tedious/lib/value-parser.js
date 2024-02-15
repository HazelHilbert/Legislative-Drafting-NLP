"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _metadataParser = require("./metadata-parser");

var _dataType = require("./data-type");

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _sprintfJs = require("sprintf-js");

var _guidParser = require("./guid-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NULL = (1 << 16) - 1;
const MAX = (1 << 16) - 1;
const THREE_AND_A_THIRD = 3 + 1 / 3;
const MONEY_DIVISOR = 10000;
const PLP_NULL = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
const UNKNOWN_PLP_LEN = Buffer.from([0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
const DEFAULT_ENCODING = 'utf8';

function readTinyInt(parser, callback) {
  parser.readUInt8(callback);
}

function readSmallInt(parser, callback) {
  parser.readInt16LE(callback);
}

function readInt(parser, callback) {
  parser.readInt32LE(callback);
}

function readBigInt(parser, callback) {
  parser.readBigInt64LE(value => {
    callback(value.toString());
  });
}

function readReal(parser, callback) {
  parser.readFloatLE(callback);
}

function readFloat(parser, callback) {
  parser.readDoubleLE(callback);
}

function readSmallMoney(parser, callback) {
  parser.readInt32LE(value => {
    callback(value / MONEY_DIVISOR);
  });
}

function readMoney(parser, callback) {
  parser.readInt32LE(high => {
    parser.readUInt32LE(low => {
      callback((low + 0x100000000 * high) / MONEY_DIVISOR);
    });
  });
}

function readBit(parser, callback) {
  parser.readUInt8(value => {
    callback(!!value);
  });
}

function valueParse(parser, metadata, options, callback) {
  const type = metadata.type;

  switch (type.name) {
    case 'Null':
      return callback(null);

    case 'TinyInt':
      return readTinyInt(parser, callback);

    case 'SmallInt':
      return readSmallInt(parser, callback);

    case 'Int':
      return readInt(parser, callback);

    case 'BigInt':
      return readBigInt(parser, callback);

    case 'IntN':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 1:
            return readTinyInt(parser, callback);

          case 2:
            return readSmallInt(parser, callback);

          case 4:
            return readInt(parser, callback);

          case 8:
            return readBigInt(parser, callback);

          default:
            throw new Error('Unsupported dataLength ' + dataLength + ' for IntN');
        }
      });

    case 'Real':
      return readReal(parser, callback);

    case 'Float':
      return readFloat(parser, callback);

    case 'FloatN':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 4:
            return readReal(parser, callback);

          case 8:
            return readFloat(parser, callback);

          default:
            throw new Error('Unsupported dataLength ' + dataLength + ' for FloatN');
        }
      });

    case 'SmallMoney':
      return readSmallMoney(parser, callback);

    case 'Money':
      return readMoney(parser, callback);

    case 'MoneyN':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 4:
            return readSmallMoney(parser, callback);

          case 8:
            return readMoney(parser, callback);

          default:
            throw new Error('Unsupported dataLength ' + dataLength + ' for MoneyN');
        }
      });

    case 'Bit':
      return readBit(parser, callback);

    case 'BitN':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 1:
            return readBit(parser, callback);

          default:
            throw new Error('Unsupported dataLength ' + dataLength + ' for BitN');
        }
      });

    case 'VarChar':
    case 'Char':
      const codepage = metadata.collation.codepage;

      if (metadata.dataLength === MAX) {
        return readMaxChars(parser, codepage, callback);
      } else {
        return parser.readUInt16LE(dataLength => {
          if (dataLength === NULL) {
            return callback(null);
          }

          readChars(parser, dataLength, codepage, callback);
        });
      }

    case 'NVarChar':
    case 'NChar':
      if (metadata.dataLength === MAX) {
        return readMaxNChars(parser, callback);
      } else {
        return parser.readUInt16LE(dataLength => {
          if (dataLength === NULL) {
            return callback(null);
          }

          readNChars(parser, dataLength, callback);
        });
      }

    case 'VarBinary':
    case 'Binary':
      if (metadata.dataLength === MAX) {
        return readMaxBinary(parser, callback);
      } else {
        return parser.readUInt16LE(dataLength => {
          if (dataLength === NULL) {
            return callback(null);
          }

          readBinary(parser, dataLength, callback);
        });
      }

    case 'Text':
      return parser.readUInt8(textPointerLength => {
        if (textPointerLength === 0) {
          return callback(null);
        }

        parser.readBuffer(textPointerLength, _textPointer => {
          parser.readBuffer(8, _timestamp => {
            parser.readUInt32LE(dataLength => {
              readChars(parser, dataLength, metadata.collation.codepage, callback);
            });
          });
        });
      });

    case 'NText':
      return parser.readUInt8(textPointerLength => {
        if (textPointerLength === 0) {
          return callback(null);
        }

        parser.readBuffer(textPointerLength, _textPointer => {
          parser.readBuffer(8, _timestamp => {
            parser.readUInt32LE(dataLength => {
              readNChars(parser, dataLength, callback);
            });
          });
        });
      });

    case 'Image':
      return parser.readUInt8(textPointerLength => {
        if (textPointerLength === 0) {
          return callback(null);
        }

        parser.readBuffer(textPointerLength, _textPointer => {
          parser.readBuffer(8, _timestamp => {
            parser.readUInt32LE(dataLength => {
              readBinary(parser, dataLength, callback);
            });
          });
        });
      });

    case 'Xml':
      return readMaxNChars(parser, callback);

    case 'SmallDateTime':
      return readSmallDateTime(parser, options.useUTC, callback);

    case 'DateTime':
      return readDateTime(parser, options.useUTC, callback);

    case 'DateTimeN':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 4:
            return readSmallDateTime(parser, options.useUTC, callback);

          case 8:
            return readDateTime(parser, options.useUTC, callback);

          default:
            throw new Error('Unsupported dataLength ' + dataLength + ' for DateTimeN');
        }
      });

    case 'Time':
      return parser.readUInt8(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        } else {
          return readTime(parser, dataLength, metadata.scale, options.useUTC, callback);
        }
      });

    case 'Date':
      return parser.readUInt8(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        } else {
          return readDate(parser, options.useUTC, callback);
        }
      });

    case 'DateTime2':
      return parser.readUInt8(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        } else {
          return readDateTime2(parser, dataLength, metadata.scale, options.useUTC, callback);
        }
      });

    case 'DateTimeOffset':
      return parser.readUInt8(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        } else {
          return readDateTimeOffset(parser, dataLength, metadata.scale, callback);
        }
      });

    case 'NumericN':
    case 'DecimalN':
      return parser.readUInt8(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        } else {
          return readNumeric(parser, dataLength, metadata.precision, metadata.scale, callback);
        }
      });

    case 'UniqueIdentifier':
      return parser.readUInt8(dataLength => {
        switch (dataLength) {
          case 0:
            return callback(null);

          case 0x10:
            return readUniqueIdentifier(parser, options, callback);

          default:
            throw new Error((0, _sprintfJs.sprintf)('Unsupported guid size %d', dataLength - 1));
        }
      });

    case 'UDT':
      return readMaxBinary(parser, callback);

    case 'Variant':
      return parser.readUInt32LE(dataLength => {
        if (dataLength === 0) {
          return callback(null);
        }

        readVariant(parser, options, dataLength, callback);
      });

    default:
      throw new Error((0, _sprintfJs.sprintf)('Unrecognised type %s', type.name));
  }
}

function readUniqueIdentifier(parser, options, callback) {
  parser.readBuffer(0x10, data => {
    callback(options.lowerCaseGuids ? (0, _guidParser.bufferToLowerCaseGuid)(data) : (0, _guidParser.bufferToUpperCaseGuid)(data));
  });
}

function readNumeric(parser, dataLength, _precision, scale, callback) {
  parser.readUInt8(sign => {
    sign = sign === 1 ? 1 : -1;
    let readValue;

    if (dataLength === 5) {
      readValue = parser.readUInt32LE;
    } else if (dataLength === 9) {
      readValue = parser.readUNumeric64LE;
    } else if (dataLength === 13) {
      readValue = parser.readUNumeric96LE;
    } else if (dataLength === 17) {
      readValue = parser.readUNumeric128LE;
    } else {
      throw new Error((0, _sprintfJs.sprintf)('Unsupported numeric dataLength %d', dataLength));
    }

    readValue.call(parser, value => {
      callback(value * sign / Math.pow(10, scale));
    });
  });
}

function readVariant(parser, options, dataLength, callback) {
  return parser.readUInt8(baseType => {
    const type = _dataType.TYPE[baseType];
    return parser.readUInt8(propBytes => {
      dataLength = dataLength - propBytes - 2;

      switch (type.name) {
        case 'UniqueIdentifier':
          return readUniqueIdentifier(parser, options, callback);

        case 'Bit':
          return readBit(parser, callback);

        case 'TinyInt':
          return readTinyInt(parser, callback);

        case 'SmallInt':
          return readSmallInt(parser, callback);

        case 'Int':
          return readInt(parser, callback);

        case 'BigInt':
          return readBigInt(parser, callback);

        case 'SmallDateTime':
          return readSmallDateTime(parser, options.useUTC, callback);

        case 'DateTime':
          return readDateTime(parser, options.useUTC, callback);

        case 'Real':
          return readReal(parser, callback);

        case 'Float':
          return readFloat(parser, callback);

        case 'SmallMoney':
          return readSmallMoney(parser, callback);

        case 'Money':
          return readMoney(parser, callback);

        case 'Date':
          return readDate(parser, options.useUTC, callback);

        case 'Time':
          return parser.readUInt8(scale => {
            return readTime(parser, dataLength, scale, options.useUTC, callback);
          });

        case 'DateTime2':
          return parser.readUInt8(scale => {
            return readDateTime2(parser, dataLength, scale, options.useUTC, callback);
          });

        case 'DateTimeOffset':
          return parser.readUInt8(scale => {
            return readDateTimeOffset(parser, dataLength, scale, callback);
          });

        case 'VarBinary':
        case 'Binary':
          return parser.readUInt16LE(_maxLength => {
            readBinary(parser, dataLength, callback);
          });

        case 'NumericN':
        case 'DecimalN':
          return parser.readUInt8(precision => {
            parser.readUInt8(scale => {
              readNumeric(parser, dataLength, precision, scale, callback);
            });
          });

        case 'VarChar':
        case 'Char':
          return parser.readUInt16LE(_maxLength => {
            (0, _metadataParser.readCollation)(parser, collation => {
              readChars(parser, dataLength, collation.codepage, callback);
            });
          });

        case 'NVarChar':
        case 'NChar':
          return parser.readUInt16LE(_maxLength => {
            (0, _metadataParser.readCollation)(parser, _collation => {
              readNChars(parser, dataLength, callback);
            });
          });

        default:
          throw new Error('Invalid type!');
      }
    });
  });
}

function readBinary(parser, dataLength, callback) {
  return parser.readBuffer(dataLength, callback);
}

function readChars(parser, dataLength, codepage, callback) {
  if (codepage == null) {
    codepage = DEFAULT_ENCODING;
  }

  return parser.readBuffer(dataLength, data => {
    callback(_iconvLite.default.decode(data, codepage));
  });
}

function readNChars(parser, dataLength, callback) {
  parser.readBuffer(dataLength, data => {
    callback(data.toString('ucs2'));
  });
}

function readMaxBinary(parser, callback) {
  return readMax(parser, callback);
}

function readMaxChars(parser, codepage, callback) {
  if (codepage == null) {
    codepage = DEFAULT_ENCODING;
  }

  readMax(parser, data => {
    if (data) {
      callback(_iconvLite.default.decode(data, codepage));
    } else {
      callback(null);
    }
  });
}

function readMaxNChars(parser, callback) {
  readMax(parser, data => {
    if (data) {
      callback(data.toString('ucs2'));
    } else {
      callback(null);
    }
  });
}

function readMax(parser, callback) {
  parser.readBuffer(8, type => {
    if (type.equals(PLP_NULL)) {
      return callback(null);
    } else if (type.equals(UNKNOWN_PLP_LEN)) {
      return readMaxUnknownLength(parser, callback);
    } else {
      const low = type.readUInt32LE(0);
      const high = type.readUInt32LE(4);

      if (high >= 2 << 53 - 32) {
        console.warn('Read UInt64LE > 53 bits : high=' + high + ', low=' + low);
      }

      const expectedLength = low + 0x100000000 * high;
      return readMaxKnownLength(parser, expectedLength, callback);
    }
  });
}

function readMaxKnownLength(parser, totalLength, callback) {
  const data = Buffer.alloc(totalLength, 0);
  let offset = 0;

  function next(done) {
    parser.readUInt32LE(chunkLength => {
      if (!chunkLength) {
        return done();
      }

      parser.readBuffer(chunkLength, chunk => {
        chunk.copy(data, offset);
        offset += chunkLength;
        next(done);
      });
    });
  }

  next(() => {
    if (offset !== totalLength) {
      throw new Error('Partially Length-prefixed Bytes unmatched lengths : expected ' + totalLength + ', but got ' + offset + ' bytes');
    }

    callback(data);
  });
}

function readMaxUnknownLength(parser, callback) {
  const chunks = [];
  let length = 0;

  function next(done) {
    parser.readUInt32LE(chunkLength => {
      if (!chunkLength) {
        return done();
      }

      parser.readBuffer(chunkLength, chunk => {
        chunks.push(chunk);
        length += chunkLength;
        next(done);
      });
    });
  }

  next(() => {
    callback(Buffer.concat(chunks, length));
  });
}

function readSmallDateTime(parser, useUTC, callback) {
  parser.readUInt16LE(days => {
    parser.readUInt16LE(minutes => {
      let value;

      if (useUTC) {
        value = new Date(Date.UTC(1900, 0, 1 + days, 0, minutes));
      } else {
        value = new Date(1900, 0, 1 + days, 0, minutes);
      }

      callback(value);
    });
  });
}

function readDateTime(parser, useUTC, callback) {
  parser.readInt32LE(days => {
    parser.readUInt32LE(threeHundredthsOfSecond => {
      const milliseconds = Math.round(threeHundredthsOfSecond * THREE_AND_A_THIRD);
      let value;

      if (useUTC) {
        value = new Date(Date.UTC(1900, 0, 1 + days, 0, 0, 0, milliseconds));
      } else {
        value = new Date(1900, 0, 1 + days, 0, 0, 0, milliseconds);
      }

      callback(value);
    });
  });
}

function readTime(parser, dataLength, scale, useUTC, callback) {
  let readValue;

  switch (dataLength) {
    case 3:
      readValue = parser.readUInt24LE;
      break;

    case 4:
      readValue = parser.readUInt32LE;
      break;

    case 5:
      readValue = parser.readUInt40LE;
  }

  readValue.call(parser, value => {
    if (scale < 7) {
      for (let i = scale; i < 7; i++) {
        value *= 10;
      }
    }

    let date;

    if (useUTC) {
      date = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, value / 10000));
    } else {
      date = new Date(1970, 0, 1, 0, 0, 0, value / 10000);
    }

    Object.defineProperty(date, 'nanosecondsDelta', {
      enumerable: false,
      value: value % 10000 / Math.pow(10, 7)
    });
    callback(date);
  });
}

function readDate(parser, useUTC, callback) {
  parser.readUInt24LE(days => {
    if (useUTC) {
      callback(new Date(Date.UTC(2000, 0, days - 730118)));
    } else {
      callback(new Date(2000, 0, days - 730118));
    }
  });
}

function readDateTime2(parser, dataLength, scale, useUTC, callback) {
  readTime(parser, dataLength - 3, scale, useUTC, time => {
    // TODO: 'input' is 'time', but TypeScript cannot find "time.nanosecondsDelta";
    parser.readUInt24LE(days => {
      let date;

      if (useUTC) {
        date = new Date(Date.UTC(2000, 0, days - 730118, 0, 0, 0, +time));
      } else {
        date = new Date(2000, 0, days - 730118, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      }

      Object.defineProperty(date, 'nanosecondsDelta', {
        enumerable: false,
        value: time.nanosecondsDelta
      });
      callback(date);
    });
  });
}

function readDateTimeOffset(parser, dataLength, scale, callback) {
  readTime(parser, dataLength - 5, scale, true, time => {
    parser.readUInt24LE(days => {
      // offset
      parser.readInt16LE(() => {
        const date = new Date(Date.UTC(2000, 0, days - 730118, 0, 0, 0, +time));
        Object.defineProperty(date, 'nanosecondsDelta', {
          enumerable: false,
          value: time.nanosecondsDelta
        });
        callback(date);
      });
    });
  });
}

var _default = valueParse;
exports.default = _default;
module.exports = valueParse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOVUxMIiwiTUFYIiwiVEhSRUVfQU5EX0FfVEhJUkQiLCJNT05FWV9ESVZJU09SIiwiUExQX05VTEwiLCJCdWZmZXIiLCJmcm9tIiwiVU5LTk9XTl9QTFBfTEVOIiwiREVGQVVMVF9FTkNPRElORyIsInJlYWRUaW55SW50IiwicGFyc2VyIiwiY2FsbGJhY2siLCJyZWFkVUludDgiLCJyZWFkU21hbGxJbnQiLCJyZWFkSW50MTZMRSIsInJlYWRJbnQiLCJyZWFkSW50MzJMRSIsInJlYWRCaWdJbnQiLCJyZWFkQmlnSW50NjRMRSIsInZhbHVlIiwidG9TdHJpbmciLCJyZWFkUmVhbCIsInJlYWRGbG9hdExFIiwicmVhZEZsb2F0IiwicmVhZERvdWJsZUxFIiwicmVhZFNtYWxsTW9uZXkiLCJyZWFkTW9uZXkiLCJoaWdoIiwicmVhZFVJbnQzMkxFIiwibG93IiwicmVhZEJpdCIsInZhbHVlUGFyc2UiLCJtZXRhZGF0YSIsIm9wdGlvbnMiLCJ0eXBlIiwibmFtZSIsImRhdGFMZW5ndGgiLCJFcnJvciIsImNvZGVwYWdlIiwiY29sbGF0aW9uIiwicmVhZE1heENoYXJzIiwicmVhZFVJbnQxNkxFIiwicmVhZENoYXJzIiwicmVhZE1heE5DaGFycyIsInJlYWROQ2hhcnMiLCJyZWFkTWF4QmluYXJ5IiwicmVhZEJpbmFyeSIsInRleHRQb2ludGVyTGVuZ3RoIiwicmVhZEJ1ZmZlciIsIl90ZXh0UG9pbnRlciIsIl90aW1lc3RhbXAiLCJyZWFkU21hbGxEYXRlVGltZSIsInVzZVVUQyIsInJlYWREYXRlVGltZSIsInJlYWRUaW1lIiwic2NhbGUiLCJyZWFkRGF0ZSIsInJlYWREYXRlVGltZTIiLCJyZWFkRGF0ZVRpbWVPZmZzZXQiLCJyZWFkTnVtZXJpYyIsInByZWNpc2lvbiIsInJlYWRVbmlxdWVJZGVudGlmaWVyIiwicmVhZFZhcmlhbnQiLCJkYXRhIiwibG93ZXJDYXNlR3VpZHMiLCJfcHJlY2lzaW9uIiwic2lnbiIsInJlYWRWYWx1ZSIsInJlYWRVTnVtZXJpYzY0TEUiLCJyZWFkVU51bWVyaWM5NkxFIiwicmVhZFVOdW1lcmljMTI4TEUiLCJjYWxsIiwiTWF0aCIsInBvdyIsImJhc2VUeXBlIiwiVFlQRSIsInByb3BCeXRlcyIsIl9tYXhMZW5ndGgiLCJfY29sbGF0aW9uIiwiaWNvbnYiLCJkZWNvZGUiLCJyZWFkTWF4IiwiZXF1YWxzIiwicmVhZE1heFVua25vd25MZW5ndGgiLCJjb25zb2xlIiwid2FybiIsImV4cGVjdGVkTGVuZ3RoIiwicmVhZE1heEtub3duTGVuZ3RoIiwidG90YWxMZW5ndGgiLCJhbGxvYyIsIm9mZnNldCIsIm5leHQiLCJkb25lIiwiY2h1bmtMZW5ndGgiLCJjaHVuayIsImNvcHkiLCJjaHVua3MiLCJsZW5ndGgiLCJwdXNoIiwiY29uY2F0IiwiZGF5cyIsIm1pbnV0ZXMiLCJEYXRlIiwiVVRDIiwidGhyZWVIdW5kcmVkdGhzT2ZTZWNvbmQiLCJtaWxsaXNlY29uZHMiLCJyb3VuZCIsInJlYWRVSW50MjRMRSIsInJlYWRVSW50NDBMRSIsImkiLCJkYXRlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwidGltZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJuYW5vc2Vjb25kc0RlbHRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy92YWx1ZS1wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlciwgeyBQYXJzZXJPcHRpb25zIH0gZnJvbSAnLi90b2tlbi9zdHJlYW0tcGFyc2VyJztcbmltcG9ydCB7IE1ldGFkYXRhLCByZWFkQ29sbGF0aW9uIH0gZnJvbSAnLi9tZXRhZGF0YS1wYXJzZXInO1xuaW1wb3J0IHsgVFlQRSB9IGZyb20gJy4vZGF0YS10eXBlJztcblxuaW1wb3J0IGljb252IGZyb20gJ2ljb252LWxpdGUnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ3NwcmludGYtanMnO1xuaW1wb3J0IHsgYnVmZmVyVG9Mb3dlckNhc2VHdWlkLCBidWZmZXJUb1VwcGVyQ2FzZUd1aWQgfSBmcm9tICcuL2d1aWQtcGFyc2VyJztcblxuY29uc3QgTlVMTCA9ICgxIDw8IDE2KSAtIDE7XG5jb25zdCBNQVggPSAoMSA8PCAxNikgLSAxO1xuY29uc3QgVEhSRUVfQU5EX0FfVEhJUkQgPSAzICsgKDEgLyAzKTtcbmNvbnN0IE1PTkVZX0RJVklTT1IgPSAxMDAwMDtcbmNvbnN0IFBMUF9OVUxMID0gQnVmZmVyLmZyb20oWzB4RkYsIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkZdKTtcbmNvbnN0IFVOS05PV05fUExQX0xFTiA9IEJ1ZmZlci5mcm9tKFsweEZFLCAweEZGLCAweEZGLCAweEZGLCAweEZGLCAweEZGLCAweEZGLCAweEZGXSk7XG5jb25zdCBERUZBVUxUX0VOQ09ESU5HID0gJ3V0ZjgnO1xuXG5mdW5jdGlvbiByZWFkVGlueUludChwYXJzZXI6IFBhcnNlciwgY2FsbGJhY2s6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZFVJbnQ4KGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcmVhZFNtYWxsSW50KHBhcnNlcjogUGFyc2VyLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSB7XG4gIHBhcnNlci5yZWFkSW50MTZMRShjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIHJlYWRJbnQocGFyc2VyOiBQYXJzZXIsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWRJbnQzMkxFKGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcmVhZEJpZ0ludChwYXJzZXI6IFBhcnNlciwgY2FsbGJhY2s6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZEJpZ0ludDY0TEUoKHZhbHVlKSA9PiB7XG4gICAgY2FsbGJhY2sodmFsdWUudG9TdHJpbmcoKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkUmVhbChwYXJzZXI6IFBhcnNlciwgY2FsbGJhY2s6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZEZsb2F0TEUoY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiByZWFkRmxvYXQocGFyc2VyOiBQYXJzZXIsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWREb3VibGVMRShjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIHJlYWRTbWFsbE1vbmV5KHBhcnNlcjogUGFyc2VyLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSB7XG4gIHBhcnNlci5yZWFkSW50MzJMRSgodmFsdWUpID0+IHtcbiAgICBjYWxsYmFjayh2YWx1ZSAvIE1PTkVZX0RJVklTT1IpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhZE1vbmV5KHBhcnNlcjogUGFyc2VyLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSB7XG4gIHBhcnNlci5yZWFkSW50MzJMRSgoaGlnaCkgPT4ge1xuICAgIHBhcnNlci5yZWFkVUludDMyTEUoKGxvdykgPT4ge1xuICAgICAgY2FsbGJhY2soKGxvdyArICgweDEwMDAwMDAwMCAqIGhpZ2gpKSAvIE1PTkVZX0RJVklTT1IpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhZEJpdChwYXJzZXI6IFBhcnNlciwgY2FsbGJhY2s6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZFVJbnQ4KCh2YWx1ZSkgPT4ge1xuICAgIGNhbGxiYWNrKCEhdmFsdWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdmFsdWVQYXJzZShwYXJzZXI6IFBhcnNlciwgbWV0YWRhdGE6IE1ldGFkYXRhLCBvcHRpb25zOiBQYXJzZXJPcHRpb25zLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNvbnN0IHR5cGUgPSBtZXRhZGF0YS50eXBlO1xuXG4gIHN3aXRjaCAodHlwZS5uYW1lKSB7XG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG5cbiAgICBjYXNlICdUaW55SW50JzpcbiAgICAgIHJldHVybiByZWFkVGlueUludChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgJ1NtYWxsSW50JzpcbiAgICAgIHJldHVybiByZWFkU21hbGxJbnQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICBjYXNlICdJbnQnOlxuICAgICAgcmV0dXJuIHJlYWRJbnQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICBjYXNlICdCaWdJbnQnOlxuICAgICAgcmV0dXJuIHJlYWRCaWdJbnQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICBjYXNlICdJbnROJzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZGF0YUxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcblxuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiByZWFkVGlueUludChwYXJzZXIsIGNhbGxiYWNrKTtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gcmVhZFNtYWxsSW50KHBhcnNlciwgY2FsbGJhY2spO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiByZWFkSW50KHBhcnNlciwgY2FsbGJhY2spO1xuICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIHJldHVybiByZWFkQmlnSW50KHBhcnNlciwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZGF0YUxlbmd0aCAnICsgZGF0YUxlbmd0aCArICcgZm9yIEludE4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlICdSZWFsJzpcbiAgICAgIHJldHVybiByZWFkUmVhbChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgJ0Zsb2F0JzpcbiAgICAgIHJldHVybiByZWFkRmxvYXQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICBjYXNlICdGbG9hdE4nOlxuICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKGRhdGFMZW5ndGgpID0+IHtcbiAgICAgICAgc3dpdGNoIChkYXRhTGVuZ3RoKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuXG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRSZWFsKHBhcnNlciwgY2FsbGJhY2spO1xuICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIHJldHVybiByZWFkRmxvYXQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBkYXRhTGVuZ3RoICcgKyBkYXRhTGVuZ3RoICsgJyBmb3IgRmxvYXROJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgY2FzZSAnU21hbGxNb25leSc6XG4gICAgICByZXR1cm4gcmVhZFNtYWxsTW9uZXkocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICBjYXNlICdNb25leSc6XG4gICAgICByZXR1cm4gcmVhZE1vbmV5KHBhcnNlciwgY2FsbGJhY2spO1xuXG4gICAgY2FzZSAnTW9uZXlOJzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZGF0YUxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcblxuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiByZWFkU21hbGxNb25leShwYXJzZXIsIGNhbGxiYWNrKTtcbiAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gcmVhZE1vbmV5KHBhcnNlciwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZGF0YUxlbmd0aCAnICsgZGF0YUxlbmd0aCArICcgZm9yIE1vbmV5TicpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNhc2UgJ0JpdCc6XG4gICAgICByZXR1cm4gcmVhZEJpdChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgJ0JpdE4nOlxuICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKGRhdGFMZW5ndGgpID0+IHtcbiAgICAgICAgc3dpdGNoIChkYXRhTGVuZ3RoKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIHJlYWRCaXQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBkYXRhTGVuZ3RoICcgKyBkYXRhTGVuZ3RoICsgJyBmb3IgQml0TicpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNhc2UgJ1ZhckNoYXInOlxuICAgIGNhc2UgJ0NoYXInOlxuICAgICAgY29uc3QgY29kZXBhZ2UgPSBtZXRhZGF0YS5jb2xsYXRpb24hLmNvZGVwYWdlITtcbiAgICAgIGlmIChtZXRhZGF0YS5kYXRhTGVuZ3RoID09PSBNQVgpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRNYXhDaGFycyhwYXJzZXIsIGNvZGVwYWdlLCBjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50MTZMRSgoZGF0YUxlbmd0aCkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhTGVuZ3RoID09PSBOVUxMKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVhZENoYXJzKHBhcnNlciwgZGF0YUxlbmd0aCEsIGNvZGVwYWdlLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgY2FzZSAnTlZhckNoYXInOlxuICAgIGNhc2UgJ05DaGFyJzpcbiAgICAgIGlmIChtZXRhZGF0YS5kYXRhTGVuZ3RoID09PSBNQVgpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRNYXhOQ2hhcnMocGFyc2VyLCBjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50MTZMRSgoZGF0YUxlbmd0aCkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhTGVuZ3RoID09PSBOVUxMKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVhZE5DaGFycyhwYXJzZXIsIGRhdGFMZW5ndGghLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgY2FzZSAnVmFyQmluYXJ5JzpcbiAgICBjYXNlICdCaW5hcnknOlxuICAgICAgaWYgKG1ldGFkYXRhLmRhdGFMZW5ndGggPT09IE1BWCkge1xuICAgICAgICByZXR1cm4gcmVhZE1heEJpbmFyeShwYXJzZXIsIGNhbGxiYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQxNkxFKChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGFMZW5ndGggPT09IE5VTEwpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWFkQmluYXJ5KHBhcnNlciwgZGF0YUxlbmd0aCEsIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICBjYXNlICdUZXh0JzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KCh0ZXh0UG9pbnRlckxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAodGV4dFBvaW50ZXJMZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZXIucmVhZEJ1ZmZlcih0ZXh0UG9pbnRlckxlbmd0aCwgKF90ZXh0UG9pbnRlcikgPT4ge1xuICAgICAgICAgIHBhcnNlci5yZWFkQnVmZmVyKDgsIChfdGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICBwYXJzZXIucmVhZFVJbnQzMkxFKChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgICAgICAgIHJlYWRDaGFycyhwYXJzZXIsIGRhdGFMZW5ndGghLCBtZXRhZGF0YS5jb2xsYXRpb24hLmNvZGVwYWdlISwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjYXNlICdOVGV4dCc6XG4gICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50OCgodGV4dFBvaW50ZXJMZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKHRleHRQb2ludGVyTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VyLnJlYWRCdWZmZXIodGV4dFBvaW50ZXJMZW5ndGgsIChfdGV4dFBvaW50ZXIpID0+IHtcbiAgICAgICAgICBwYXJzZXIucmVhZEJ1ZmZlcig4LCAoX3RpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgcGFyc2VyLnJlYWRVSW50MzJMRSgoZGF0YUxlbmd0aCkgPT4ge1xuICAgICAgICAgICAgICByZWFkTkNoYXJzKHBhcnNlciwgZGF0YUxlbmd0aCEsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY2FzZSAnSW1hZ2UnOlxuICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKHRleHRQb2ludGVyTGVuZ3RoKSA9PiB7XG4gICAgICAgIGlmICh0ZXh0UG9pbnRlckxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnNlci5yZWFkQnVmZmVyKHRleHRQb2ludGVyTGVuZ3RoLCAoX3RleHRQb2ludGVyKSA9PiB7XG4gICAgICAgICAgcGFyc2VyLnJlYWRCdWZmZXIoOCwgKF90aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgIHBhcnNlci5yZWFkVUludDMyTEUoKGRhdGFMZW5ndGgpID0+IHtcbiAgICAgICAgICAgICAgcmVhZEJpbmFyeShwYXJzZXIsIGRhdGFMZW5ndGghLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNhc2UgJ1htbCc6XG4gICAgICByZXR1cm4gcmVhZE1heE5DaGFycyhwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgJ1NtYWxsRGF0ZVRpbWUnOlxuICAgICAgcmV0dXJuIHJlYWRTbWFsbERhdGVUaW1lKHBhcnNlciwgb3B0aW9ucy51c2VVVEMsIGNhbGxiYWNrKTtcblxuICAgIGNhc2UgJ0RhdGVUaW1lJzpcbiAgICAgIHJldHVybiByZWFkRGF0ZVRpbWUocGFyc2VyLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuXG4gICAgY2FzZSAnRGF0ZVRpbWVOJzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZGF0YUxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcblxuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiByZWFkU21hbGxEYXRlVGltZShwYXJzZXIsIG9wdGlvbnMudXNlVVRDLCBjYWxsYmFjayk7XG4gICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIHJlYWREYXRlVGltZShwYXJzZXIsIG9wdGlvbnMudXNlVVRDLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBkYXRhTGVuZ3RoICcgKyBkYXRhTGVuZ3RoICsgJyBmb3IgRGF0ZVRpbWVOJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgY2FzZSAnVGltZSc6XG4gICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50OCgoZGF0YUxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAoZGF0YUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVhZFRpbWUocGFyc2VyLCBkYXRhTGVuZ3RoISwgbWV0YWRhdGEuc2NhbGUhLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKGRhdGFMZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKGRhdGFMZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlYWREYXRlKHBhcnNlciwgb3B0aW9ucy51c2VVVEMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlICdEYXRlVGltZTInOlxuICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKGRhdGFMZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKGRhdGFMZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlYWREYXRlVGltZTIocGFyc2VyLCBkYXRhTGVuZ3RoISwgbWV0YWRhdGEuc2NhbGUhLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNhc2UgJ0RhdGVUaW1lT2Zmc2V0JzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIGlmIChkYXRhTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWFkRGF0ZVRpbWVPZmZzZXQocGFyc2VyLCBkYXRhTGVuZ3RoISwgbWV0YWRhdGEuc2NhbGUhLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgY2FzZSAnTnVtZXJpY04nOlxuICAgIGNhc2UgJ0RlY2ltYWxOJzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIGlmIChkYXRhTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWFkTnVtZXJpYyhwYXJzZXIsIGRhdGFMZW5ndGghLCBtZXRhZGF0YS5wcmVjaXNpb24hLCBtZXRhZGF0YS5zY2FsZSEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjYXNlICdVbmlxdWVJZGVudGlmaWVyJzpcbiAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQ4KChkYXRhTGVuZ3RoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZGF0YUxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcblxuICAgICAgICAgIGNhc2UgMHgxMDpcbiAgICAgICAgICAgIHJldHVybiByZWFkVW5pcXVlSWRlbnRpZmllcihwYXJzZXIsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignVW5zdXBwb3J0ZWQgZ3VpZCBzaXplICVkJywgZGF0YUxlbmd0aCEgLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgY2FzZSAnVURUJzpcbiAgICAgIHJldHVybiByZWFkTWF4QmluYXJ5KHBhcnNlciwgY2FsbGJhY2spO1xuXG4gICAgY2FzZSAnVmFyaWFudCc6XG4gICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50MzJMRSgoZGF0YUxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAoZGF0YUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlYWRWYXJpYW50KHBhcnNlciwgb3B0aW9ucywgZGF0YUxlbmd0aCEsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihzcHJpbnRmKCdVbnJlY29nbmlzZWQgdHlwZSAlcycsIHR5cGUubmFtZSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRVbmlxdWVJZGVudGlmaWVyKHBhcnNlcjogUGFyc2VyLCBvcHRpb25zOiBQYXJzZXJPcHRpb25zLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSB7XG4gIHBhcnNlci5yZWFkQnVmZmVyKDB4MTAsIChkYXRhKSA9PiB7XG4gICAgY2FsbGJhY2sob3B0aW9ucy5sb3dlckNhc2VHdWlkcyA/IGJ1ZmZlclRvTG93ZXJDYXNlR3VpZChkYXRhKSA6IGJ1ZmZlclRvVXBwZXJDYXNlR3VpZChkYXRhKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkTnVtZXJpYyhwYXJzZXI6IFBhcnNlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBfcHJlY2lzaW9uOiBudW1iZXIsIHNjYWxlOiBudW1iZXIsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWRVSW50OCgoc2lnbikgPT4ge1xuICAgIHNpZ24gPSBzaWduID09PSAxID8gMSA6IC0xO1xuXG4gICAgbGV0IHJlYWRWYWx1ZTtcbiAgICBpZiAoZGF0YUxlbmd0aCA9PT0gNSkge1xuICAgICAgcmVhZFZhbHVlID0gcGFyc2VyLnJlYWRVSW50MzJMRTtcbiAgICB9IGVsc2UgaWYgKGRhdGFMZW5ndGggPT09IDkpIHtcbiAgICAgIHJlYWRWYWx1ZSA9IHBhcnNlci5yZWFkVU51bWVyaWM2NExFO1xuICAgIH0gZWxzZSBpZiAoZGF0YUxlbmd0aCA9PT0gMTMpIHtcbiAgICAgIHJlYWRWYWx1ZSA9IHBhcnNlci5yZWFkVU51bWVyaWM5NkxFO1xuICAgIH0gZWxzZSBpZiAoZGF0YUxlbmd0aCA9PT0gMTcpIHtcbiAgICAgIHJlYWRWYWx1ZSA9IHBhcnNlci5yZWFkVU51bWVyaWMxMjhMRTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHNwcmludGYoJ1Vuc3VwcG9ydGVkIG51bWVyaWMgZGF0YUxlbmd0aCAlZCcsIGRhdGFMZW5ndGgpKTtcbiAgICB9XG5cbiAgICByZWFkVmFsdWUuY2FsbChwYXJzZXIsICh2YWx1ZSkgPT4ge1xuICAgICAgY2FsbGJhY2soKHZhbHVlICogc2lnbikgLyBNYXRoLnBvdygxMCwgc2NhbGUpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRWYXJpYW50KHBhcnNlcjogUGFyc2VyLCBvcHRpb25zOiBQYXJzZXJPcHRpb25zLCBkYXRhTGVuZ3RoOiBudW1iZXIsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKGJhc2VUeXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IFRZUEVbYmFzZVR5cGVdO1xuXG4gICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKHByb3BCeXRlcykgPT4ge1xuICAgICAgZGF0YUxlbmd0aCA9IGRhdGFMZW5ndGggLSBwcm9wQnl0ZXMgLSAyO1xuXG4gICAgICBzd2l0Y2ggKHR5cGUubmFtZSkge1xuICAgICAgICBjYXNlICdVbmlxdWVJZGVudGlmaWVyJzpcbiAgICAgICAgICByZXR1cm4gcmVhZFVuaXF1ZUlkZW50aWZpZXIocGFyc2VyLCBvcHRpb25zLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnQml0JzpcbiAgICAgICAgICByZXR1cm4gcmVhZEJpdChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdUaW55SW50JzpcbiAgICAgICAgICByZXR1cm4gcmVhZFRpbnlJbnQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnU21hbGxJbnQnOlxuICAgICAgICAgIHJldHVybiByZWFkU21hbGxJbnQocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnSW50JzpcbiAgICAgICAgICByZXR1cm4gcmVhZEludChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdCaWdJbnQnOlxuICAgICAgICAgIHJldHVybiByZWFkQmlnSW50KHBhcnNlciwgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ1NtYWxsRGF0ZVRpbWUnOlxuICAgICAgICAgIHJldHVybiByZWFkU21hbGxEYXRlVGltZShwYXJzZXIsIG9wdGlvbnMudXNlVVRDLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnRGF0ZVRpbWUnOlxuICAgICAgICAgIHJldHVybiByZWFkRGF0ZVRpbWUocGFyc2VyLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuXG4gICAgICAgIGNhc2UgJ1JlYWwnOlxuICAgICAgICAgIHJldHVybiByZWFkUmVhbChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdGbG9hdCc6XG4gICAgICAgICAgcmV0dXJuIHJlYWRGbG9hdChwYXJzZXIsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdTbWFsbE1vbmV5JzpcbiAgICAgICAgICByZXR1cm4gcmVhZFNtYWxsTW9uZXkocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnTW9uZXknOlxuICAgICAgICAgIHJldHVybiByZWFkTW9uZXkocGFyc2VyLCBjYWxsYmFjayk7XG5cbiAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgcmV0dXJuIHJlYWREYXRlKHBhcnNlciwgb3B0aW9ucy51c2VVVEMsIGNhbGxiYWNrKTtcblxuICAgICAgICBjYXNlICdUaW1lJzpcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50OCgoc2NhbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZWFkVGltZShwYXJzZXIsIGRhdGFMZW5ndGgsIHNjYWxlLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgJ0RhdGVUaW1lMic6XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKHNjYWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZERhdGVUaW1lMihwYXJzZXIsIGRhdGFMZW5ndGgsIHNjYWxlLCBvcHRpb25zLnVzZVVUQywgY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgJ0RhdGVUaW1lT2Zmc2V0JzpcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLnJlYWRVSW50OCgoc2NhbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZWFkRGF0ZVRpbWVPZmZzZXQocGFyc2VyLCBkYXRhTGVuZ3RoLCBzY2FsZSwgY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgJ1ZhckJpbmFyeSc6XG4gICAgICAgIGNhc2UgJ0JpbmFyeSc6XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDE2TEUoKF9tYXhMZW5ndGgpID0+IHtcbiAgICAgICAgICAgIHJlYWRCaW5hcnkocGFyc2VyLCBkYXRhTGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSAnTnVtZXJpY04nOlxuICAgICAgICBjYXNlICdEZWNpbWFsTic6XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDgoKHByZWNpc2lvbikgPT4ge1xuICAgICAgICAgICAgcGFyc2VyLnJlYWRVSW50OCgoc2NhbGUpID0+IHtcbiAgICAgICAgICAgICAgcmVhZE51bWVyaWMocGFyc2VyLCBkYXRhTGVuZ3RoLCBwcmVjaXNpb24sIHNjYWxlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlICdWYXJDaGFyJzpcbiAgICAgICAgY2FzZSAnQ2hhcic6XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5yZWFkVUludDE2TEUoKF9tYXhMZW5ndGgpID0+IHtcbiAgICAgICAgICAgIHJlYWRDb2xsYXRpb24ocGFyc2VyLCAoY29sbGF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJlYWRDaGFycyhwYXJzZXIsIGRhdGFMZW5ndGgsIGNvbGxhdGlvbi5jb2RlcGFnZSEsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgJ05WYXJDaGFyJzpcbiAgICAgICAgY2FzZSAnTkNoYXInOlxuICAgICAgICAgIHJldHVybiBwYXJzZXIucmVhZFVJbnQxNkxFKChfbWF4TGVuZ3RoKSA9PiB7XG4gICAgICAgICAgICByZWFkQ29sbGF0aW9uKHBhcnNlciwgKF9jb2xsYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmVhZE5DaGFycyhwYXJzZXIsIGRhdGFMZW5ndGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHR5cGUhJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkQmluYXJ5KHBhcnNlcjogUGFyc2VyLCBkYXRhTGVuZ3RoOiBudW1iZXIsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgcmV0dXJuIHBhcnNlci5yZWFkQnVmZmVyKGRhdGFMZW5ndGgsIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcmVhZENoYXJzKHBhcnNlcjogUGFyc2VyLCBkYXRhTGVuZ3RoOiBudW1iZXIsIGNvZGVwYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgaWYgKGNvZGVwYWdlID09IG51bGwpIHtcbiAgICBjb2RlcGFnZSA9IERFRkFVTFRfRU5DT0RJTkc7XG4gIH1cblxuICByZXR1cm4gcGFyc2VyLnJlYWRCdWZmZXIoZGF0YUxlbmd0aCwgKGRhdGEpID0+IHtcbiAgICBjYWxsYmFjayhpY29udi5kZWNvZGUoZGF0YSwgY29kZXBhZ2UpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWROQ2hhcnMocGFyc2VyOiBQYXJzZXIsIGRhdGFMZW5ndGg6IG51bWJlciwgY2FsbGJhY2s6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZEJ1ZmZlcihkYXRhTGVuZ3RoLCAoZGF0YSkgPT4ge1xuICAgIGNhbGxiYWNrKGRhdGEudG9TdHJpbmcoJ3VjczInKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkTWF4QmluYXJ5KHBhcnNlcjogUGFyc2VyLCBjYWxsYmFjazogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSB7XG4gIHJldHVybiByZWFkTWF4KHBhcnNlciwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiByZWFkTWF4Q2hhcnMocGFyc2VyOiBQYXJzZXIsIGNvZGVwYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiAodmFsdWU6IHVua25vd24pID0+IHZvaWQpIHtcbiAgaWYgKGNvZGVwYWdlID09IG51bGwpIHtcbiAgICBjb2RlcGFnZSA9IERFRkFVTFRfRU5DT0RJTkc7XG4gIH1cblxuICByZWFkTWF4KHBhcnNlciwgKGRhdGEpID0+IHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgY2FsbGJhY2soaWNvbnYuZGVjb2RlKGRhdGEsIGNvZGVwYWdlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRNYXhOQ2hhcnMocGFyc2VyOiBQYXJzZXIsIGNhbGxiYWNrOiAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQpIHtcbiAgcmVhZE1heChwYXJzZXIsIChkYXRhKSA9PiB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNhbGxiYWNrKGRhdGEudG9TdHJpbmcoJ3VjczInKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRNYXgocGFyc2VyOiBQYXJzZXIsIGNhbGxiYWNrOiAodmFsdWU6IG51bGwgfCBCdWZmZXIpID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWRCdWZmZXIoOCwgKHR5cGUpID0+IHtcbiAgICBpZiAodHlwZS5lcXVhbHMoUExQX05VTEwpKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlLmVxdWFscyhVTktOT1dOX1BMUF9MRU4pKSB7XG4gICAgICByZXR1cm4gcmVhZE1heFVua25vd25MZW5ndGgocGFyc2VyLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxvdyA9IHR5cGUucmVhZFVJbnQzMkxFKDApO1xuICAgICAgY29uc3QgaGlnaCA9IHR5cGUucmVhZFVJbnQzMkxFKDQpO1xuXG4gICAgICBpZiAoaGlnaCA+PSAoMiA8PCAoNTMgLSAzMikpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUmVhZCBVSW50NjRMRSA+IDUzIGJpdHMgOiBoaWdoPScgKyBoaWdoICsgJywgbG93PScgKyBsb3cpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBlY3RlZExlbmd0aCA9IGxvdyArICgweDEwMDAwMDAwMCAqIGhpZ2gpO1xuICAgICAgcmV0dXJuIHJlYWRNYXhLbm93bkxlbmd0aChwYXJzZXIsIGV4cGVjdGVkTGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhZE1heEtub3duTGVuZ3RoKHBhcnNlcjogUGFyc2VyLCB0b3RhbExlbmd0aDogbnVtYmVyLCBjYWxsYmFjazogKHZhbHVlOiBudWxsIHwgQnVmZmVyKSA9PiB2b2lkKSB7XG4gIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2ModG90YWxMZW5ndGgsIDApO1xuXG4gIGxldCBvZmZzZXQgPSAwO1xuICBmdW5jdGlvbiBuZXh0KGRvbmU6IGFueSkge1xuICAgIHBhcnNlci5yZWFkVUludDMyTEUoKGNodW5rTGVuZ3RoKSA9PiB7XG4gICAgICBpZiAoIWNodW5rTGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9XG5cbiAgICAgIHBhcnNlci5yZWFkQnVmZmVyKGNodW5rTGVuZ3RoLCAoY2h1bmspID0+IHtcbiAgICAgICAgY2h1bmsuY29weShkYXRhLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gY2h1bmtMZW5ndGg7XG5cbiAgICAgICAgbmV4dChkb25lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmV4dCgoKSA9PiB7XG4gICAgaWYgKG9mZnNldCAhPT0gdG90YWxMZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFydGlhbGx5IExlbmd0aC1wcmVmaXhlZCBCeXRlcyB1bm1hdGNoZWQgbGVuZ3RocyA6IGV4cGVjdGVkICcgKyB0b3RhbExlbmd0aCArICcsIGJ1dCBnb3QgJyArIG9mZnNldCArICcgYnl0ZXMnKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRNYXhVbmtub3duTGVuZ3RoKHBhcnNlcjogUGFyc2VyLCBjYWxsYmFjazogKHZhbHVlOiBudWxsIHwgQnVmZmVyKSA9PiB2b2lkKSB7XG4gIGNvbnN0IGNodW5rczogQnVmZmVyW10gPSBbXTtcblxuICBsZXQgbGVuZ3RoID0gMDtcbiAgZnVuY3Rpb24gbmV4dChkb25lOiBhbnkpIHtcbiAgICBwYXJzZXIucmVhZFVJbnQzMkxFKChjaHVua0xlbmd0aCkgPT4ge1xuICAgICAgaWYgKCFjaHVua0xlbmd0aCkge1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgfVxuXG4gICAgICBwYXJzZXIucmVhZEJ1ZmZlcihjaHVua0xlbmd0aCwgKGNodW5rKSA9PiB7XG4gICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgbGVuZ3RoICs9IGNodW5rTGVuZ3RoO1xuXG4gICAgICAgIG5leHQoZG9uZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5leHQoKCkgPT4ge1xuICAgIGNhbGxiYWNrKEJ1ZmZlci5jb25jYXQoY2h1bmtzLCBsZW5ndGgpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRTbWFsbERhdGVUaW1lKHBhcnNlcjogUGFyc2VyLCB1c2VVVEM6IGJvb2xlYW4sIGNhbGxiYWNrOiAodmFsdWU6IERhdGUpID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWRVSW50MTZMRSgoZGF5cykgPT4ge1xuICAgIHBhcnNlci5yZWFkVUludDE2TEUoKG1pbnV0ZXMpID0+IHtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIGlmICh1c2VVVEMpIHtcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShEYXRlLlVUQygxOTAwLCAwLCAxICsgZGF5cywgMCwgbWludXRlcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSgxOTAwLCAwLCAxICsgZGF5cywgMCwgbWludXRlcyk7XG4gICAgICB9XG4gICAgICBjYWxsYmFjayh2YWx1ZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkRGF0ZVRpbWUocGFyc2VyOiBQYXJzZXIsIHVzZVVUQzogYm9vbGVhbiwgY2FsbGJhY2s6ICh2YWx1ZTogRGF0ZSkgPT4gdm9pZCkge1xuICBwYXJzZXIucmVhZEludDMyTEUoKGRheXMpID0+IHtcbiAgICBwYXJzZXIucmVhZFVJbnQzMkxFKCh0aHJlZUh1bmRyZWR0aHNPZlNlY29uZCkgPT4ge1xuICAgICAgY29uc3QgbWlsbGlzZWNvbmRzID0gTWF0aC5yb3VuZCh0aHJlZUh1bmRyZWR0aHNPZlNlY29uZCAqIFRIUkVFX0FORF9BX1RISVJEKTtcblxuICAgICAgbGV0IHZhbHVlO1xuICAgICAgaWYgKHVzZVVUQykge1xuICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDE5MDAsIDAsIDEgKyBkYXlzLCAwLCAwLCAwLCBtaWxsaXNlY29uZHMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbmV3IERhdGUoMTkwMCwgMCwgMSArIGRheXMsIDAsIDAsIDAsIG1pbGxpc2Vjb25kcyk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmludGVyZmFjZSBEYXRlV2l0aE5hbm9zZWNvbmRzRGVsdGEgZXh0ZW5kcyBEYXRlIHtcbiAgbmFub3NlY29uZHNEZWx0YTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiByZWFkVGltZShwYXJzZXI6IFBhcnNlciwgZGF0YUxlbmd0aDogbnVtYmVyLCBzY2FsZTogbnVtYmVyLCB1c2VVVEM6IGJvb2xlYW4sIGNhbGxiYWNrOiAodmFsdWU6IERhdGVXaXRoTmFub3NlY29uZHNEZWx0YSkgPT4gdm9pZCkge1xuICBsZXQgcmVhZFZhbHVlOiBhbnk7XG4gIHN3aXRjaCAoZGF0YUxlbmd0aCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJlYWRWYWx1ZSA9IHBhcnNlci5yZWFkVUludDI0TEU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICByZWFkVmFsdWUgPSBwYXJzZXIucmVhZFVJbnQzMkxFO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgcmVhZFZhbHVlID0gcGFyc2VyLnJlYWRVSW50NDBMRTtcbiAgfVxuXG4gIHJlYWRWYWx1ZSEuY2FsbChwYXJzZXIsICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHNjYWxlIDwgNykge1xuICAgICAgZm9yIChsZXQgaSA9IHNjYWxlOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIHZhbHVlICo9IDEwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkYXRlO1xuICAgIGlmICh1c2VVVEMpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygxOTcwLCAwLCAxLCAwLCAwLCAwLCB2YWx1ZSAvIDEwMDAwKSkgYXMgRGF0ZVdpdGhOYW5vc2Vjb25kc0RlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUoMTk3MCwgMCwgMSwgMCwgMCwgMCwgdmFsdWUgLyAxMDAwMCkgYXMgRGF0ZVdpdGhOYW5vc2Vjb25kc0RlbHRhO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0ZSwgJ25hbm9zZWNvbmRzRGVsdGEnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiAodmFsdWUgJSAxMDAwMCkgLyBNYXRoLnBvdygxMCwgNylcbiAgICB9KTtcbiAgICBjYWxsYmFjayhkYXRlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWREYXRlKHBhcnNlcjogUGFyc2VyLCB1c2VVVEM6IGJvb2xlYW4sIGNhbGxiYWNrOiAodmFsdWU6IERhdGUpID0+IHZvaWQpIHtcbiAgcGFyc2VyLnJlYWRVSW50MjRMRSgoZGF5cykgPT4ge1xuICAgIGlmICh1c2VVVEMpIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIDAsIGRheXMgLSA3MzAxMTgpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBEYXRlKDIwMDAsIDAsIGRheXMgLSA3MzAxMTgpKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkRGF0ZVRpbWUyKHBhcnNlcjogUGFyc2VyLCBkYXRhTGVuZ3RoOiBudW1iZXIsIHNjYWxlOiBudW1iZXIsIHVzZVVUQzogYm9vbGVhbiwgY2FsbGJhY2s6ICh2YWx1ZTogRGF0ZVdpdGhOYW5vc2Vjb25kc0RlbHRhKSA9PiB2b2lkKSB7XG4gIHJlYWRUaW1lKHBhcnNlciwgZGF0YUxlbmd0aCAtIDMsIHNjYWxlLCB1c2VVVEMsICh0aW1lKSA9PiB7IC8vIFRPRE86ICdpbnB1dCcgaXMgJ3RpbWUnLCBidXQgVHlwZVNjcmlwdCBjYW5ub3QgZmluZCBcInRpbWUubmFub3NlY29uZHNEZWx0YVwiO1xuICAgIHBhcnNlci5yZWFkVUludDI0TEUoKGRheXMpID0+IHtcbiAgICAgIGxldCBkYXRlO1xuICAgICAgaWYgKHVzZVVUQykge1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMjAwMCwgMCwgZGF5cyAtIDczMDExOCwgMCwgMCwgMCwgK3RpbWUpKSBhcyBEYXRlV2l0aE5hbm9zZWNvbmRzRGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoMjAwMCwgMCwgZGF5cyAtIDczMDExOCwgdGltZS5nZXRIb3VycygpLCB0aW1lLmdldE1pbnV0ZXMoKSwgdGltZS5nZXRTZWNvbmRzKCksIHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkpIGFzIERhdGVXaXRoTmFub3NlY29uZHNEZWx0YTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkYXRlLCAnbmFub3NlY29uZHNEZWx0YScsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB0aW1lLm5hbm9zZWNvbmRzRGVsdGFcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2soZGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkRGF0ZVRpbWVPZmZzZXQocGFyc2VyOiBQYXJzZXIsIGRhdGFMZW5ndGg6IG51bWJlciwgc2NhbGU6IG51bWJlciwgY2FsbGJhY2s6ICh2YWx1ZTogRGF0ZVdpdGhOYW5vc2Vjb25kc0RlbHRhKSA9PiB2b2lkKSB7XG4gIHJlYWRUaW1lKHBhcnNlciwgZGF0YUxlbmd0aCAtIDUsIHNjYWxlLCB0cnVlLCAodGltZSkgPT4ge1xuICAgIHBhcnNlci5yZWFkVUludDI0TEUoKGRheXMpID0+IHtcbiAgICAgIC8vIG9mZnNldFxuICAgICAgcGFyc2VyLnJlYWRJbnQxNkxFKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIDAsIGRheXMgLSA3MzAxMTgsIDAsIDAsIDAsICt0aW1lKSkgYXMgRGF0ZVdpdGhOYW5vc2Vjb25kc0RlbHRhO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGF0ZSwgJ25hbm9zZWNvbmRzRGVsdGEnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IHRpbWUubmFub3NlY29uZHNEZWx0YVxuICAgICAgICB9KTtcbiAgICAgICAgY2FsbGJhY2soZGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlUGFyc2U7XG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlUGFyc2U7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLElBQUksR0FBRyxDQUFDLEtBQUssRUFBTixJQUFZLENBQXpCO0FBQ0EsTUFBTUMsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFOLElBQVksQ0FBeEI7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxJQUFLLElBQUksQ0FBbkM7QUFDQSxNQUFNQyxh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