import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["FIRST_NAME", "LAST_NAME"];
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { parse as parseCsv } from 'papaparse';
import isEmail from 'validator/lib/isEmail';
import { AccessLevel } from '../../lib/model/AccessLevel';
import { toFullName } from '../../lib';
var accessLevelMappings = {
  ADMIN: AccessLevel.Admin,
  EDITOR: AccessLevel.Editor,
  READER: AccessLevel.Reader
};
var BLANK_DETAILS = {
  fullName: '',
  businessEmail: '',
  role: '',
  company: '',
  accessLevel: AccessLevel.Reader
};

var headerMappings = function headerMappings(t) {
  return [// FIRST_NAME and LAST_NAME also combine to FULL_NAME
  {
    propName: 'fullName',
    csvHeader: 'FULL_NAME',
    required: true
  }, {
    propName: 'businessEmail',
    csvHeader: 'BUSINESS_EMAIL',
    required: true,
    getValidationError: function getValidationError(value) {
      return isEmail(value) ? null : t('BULK_INVITE_EMAIL_VALIDATION_ERROR', 'Add a valid email', 'Add a valid email');
    }
  }, {
    propName: 'role',
    csvHeader: 'ROLE',
    required: true
  }, {
    propName: 'company',
    csvHeader: 'COMPANY',
    required: true
  }, {
    propName: 'accessLevel',
    csvHeader: 'ACCESS_LEVEL',
    parse: function parse(v) {
      return accessLevelMappings[v.toUpperCase()];
    },
    getValidationError: function getValidationError(raw, parsed) {
      return parsed ? null : t('BULK_INVITE_ACCESS_LEVEL_VALUES_ERROR', 'Could not convert {raw} to an access level. Valid values: {validValues}', 'We were not able to convert the value you entered into a valid access level.', {
        raw: raw,
        validValues: Object.keys(accessLevelMappings).join(', ')
      });
    }
  }];
};

var expectedHeaders = function expectedHeaders(t) {
  return headerMappings(t).map(function (h) {
    return h.csvHeader;
  });
};

var updateInviteDetailProp = function updateInviteDetailProp(propName, value, originalInviteDetail, t) {
  var _ref = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : headerMappings(t).find(function (hm) {
    return hm.propName === propName;
  }),
      required = _ref.required,
      parse = _ref.parse,
      getValidationError = _ref.getValidationError;

  var parsedValue = parse ? parse(value) : value;
  var error = required && !value ? t('BULK_INVITE_VALIDATION_ERROR', 'Enter a value', 'This value is required. Please enter a value.') : getValidationError && getValidationError(value, parsedValue);
  var errorsWithoutProp = originalInviteDetail.validationErrors.filter(function (e) {
    return e.field !== propName;
  });
  return _objectSpread(_objectSpread({}, originalInviteDetail), {}, {
    details: _objectSpread(_objectSpread({}, originalInviteDetail.details), {}, _defineProperty({}, propName, parsedValue)),
    validationErrors: error ? [].concat(_toConsumableArray(errorsWithoutProp), [{
      field: propName,
      error: error
    }]) : errorsWithoutProp
  });
};

var csvRowToInviteBase = function csvRowToInviteBase(row, t) {
  return headerMappings(t).reduce(function (inviteBase, headerMappingDetails) {
    var value = row[headerMappingDetails.csvHeader];
    return updateInviteDetailProp(headerMappingDetails.propName, value.trim(), inviteBase, t, headerMappingDetails);
  }, {
    validationErrors: [],
    details: _objectSpread({}, BLANK_DETAILS)
  });
};

var fieldsForEmptyOrCommentCheck = ['fullName', 'businessEmail', 'role', 'company'];

var isComment = function isComment(value) {
  return value.startsWith('NOTES:');
};

var isEmpty = function isEmpty(value) {
  return !value;
};

var isIgnored = function isIgnored(item) {
  // item is empty if it can't find a property from fieldsForEmptyOrCommentCheck with a value
  var isEmptyRow = !fieldsForEmptyOrCommentCheck.find(function (prop) {
    return !isEmpty(item.details[prop]);
  });
  var isCommentRow = !!fieldsForEmptyOrCommentCheck.find(function (prop) {
    return isComment(item.details[prop]);
  });
  var isExampleRow = item.details.businessEmail.trim().endsWith('@example.com');
  return isEmptyRow || isExampleRow || isCommentRow;
};

export var MissingHeaderError = /*#__PURE__*/function (_Error) {
  _inherits(MissingHeaderError, _Error);

  var _super = _createSuper(MissingHeaderError);

  function MissingHeaderError(message, headers) {
    var _this;

    _classCallCheck(this, MissingHeaderError);

    _this = _super.call(this, message);
    _this.headers = headers;
    return _this;
  }

  return MissingHeaderError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
export var InvalidFileTypeError = /*#__PURE__*/function (_Error2) {
  _inherits(InvalidFileTypeError, _Error2);

  var _super2 = _createSuper(InvalidFileTypeError);

  function InvalidFileTypeError() {
    _classCallCheck(this, InvalidFileTypeError);

    return _super2.apply(this, arguments);
  }

  return InvalidFileTypeError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var extractAndTransformData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file) {
    var _yield$Promise, meta, data, parseErrors, headers, rows;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (r) {
              return parseCsv(file, {
                complete: r,
                header: true,
                trimHeaders: true,
                skipEmptyLines: true
              });
            });

          case 2:
            _yield$Promise = _context.sent;
            meta = _yield$Promise.meta;
            data = _yield$Promise.data;
            parseErrors = _yield$Promise.errors;
            headers = new Set(meta.fields);
            rows = data; // Maintain backwards compatibility with old FIRST_NAME/LAST_NAME template

            if (headers.has('FIRST_NAME') || headers.has('LAST_NAME')) {
              headers.delete('FIRST_NAME');
              headers.delete('LAST_NAME');
              headers.add('FULL_NAME');
              rows = data.map(function (_ref3) {
                var FIRST_NAME = _ref3.FIRST_NAME,
                    LAST_NAME = _ref3.LAST_NAME,
                    rest = _objectWithoutProperties(_ref3, _excluded);

                return _objectSpread(_objectSpread({}, rest), {}, {
                  FULL_NAME: toFullName(FIRST_NAME || '', LAST_NAME || '')
                });
              });
            }

            return _context.abrupt("return", {
              parseErrors: parseErrors,
              headers: headers,
              rows: rows
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function extractAndTransformData(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Takes a CSV file, parses the contents, and converts to an array of InviteBases which contain
 * details that could be parsed as well as any validation errors that were encountered.
 *
 * "Comment cells" are cells that start and end with an underscore.
 *
 * Rows will be ignored if:
 *  - they have an @example.com email
 *  - they are blank
 *  - they contain NOTES:
 *
 * Returns an empty array if no items are present.
 *
 * Throws if the file is malformed or cannot be parsed.
 */


export var parseBulkInviteCsv = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(file, t) {
    var isValidType, _yield$extractAndTran, parseErrors, headers, rows, missingHeaders, inviteList;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Assume .csv files are valid as windows browsers don't reliably report mime type
            isValidType = file.name.endsWith('.csv') || file.type && file.type.startsWith('text/csv');

            if (isValidType) {
              _context2.next = 3;
              break;
            }

            throw new InvalidFileTypeError(t('BULK_INVITE_PARSE_CSV_INVALID_FILE_TYPE_ERROR', 'Invalid type: {fileType}', 'The file you uploaded is invalid. Make sure it is a CSV file and try again.', {
              fileType: file.type
            }));

          case 3:
            _context2.next = 5;
            return extractAndTransformData(file);

          case 5:
            _yield$extractAndTran = _context2.sent;
            parseErrors = _yield$extractAndTran.parseErrors;
            headers = _yield$extractAndTran.headers;
            rows = _yield$extractAndTran.rows;
            missingHeaders = expectedHeaders(t).filter(function (expectedHeader) {
              return !headers.has(expectedHeader);
            });

            if (!parseErrors.length) {
              _context2.next = 12;
              break;
            }

            throw new Error(JSON.stringify(parseErrors));

          case 12:
            if (!(missingHeaders.length > 0)) {
              _context2.next = 14;
              break;
            }

            throw new MissingHeaderError(t('BULK_INVITE_MISSING_HEADERS_ERROR_MESSAGE', 'Missing headers: {headers}', 'You are missing these headers.', {
              headers: missingHeaders.join(', ')
            }), missingHeaders);

          case 14:
            inviteList = rows.map(function (row) {
              return csvRowToInviteBase(row, t);
            }).filter(function (r) {
              return !isIgnored(r);
            });
            return _context2.abrupt("return", {
              inviteList: inviteList
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function parseBulkInviteCsv(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();