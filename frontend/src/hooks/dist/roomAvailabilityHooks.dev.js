"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _api = _interopRequireDefault(require("../services/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useRoomAvailability = function useRoomAvailability() {
  var _useState = (0, _react.useState)({
    isAvailable: true,
    availableRooms: 0,
    message: '',
    loading: false,
    error: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      availability = _useState2[0],
      setAvailability = _useState2[1];

  var checkAvailability = function checkAvailability(roomId, checkIn, checkOut) {
    var response, errorMsg;
    return regeneratorRuntime.async(function checkAvailability$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!roomId || !checkIn || !checkOut)) {
              _context.next = 3;
              break;
            }

            setAvailability({
              isAvailable: false,
              availableRooms: 0,
              message: 'Please select room and dates',
              loading: false,
              error: null
            });
            return _context.abrupt("return");

          case 3:
            setAvailability(function (prev) {
              return _objectSpread({}, prev, {
                loading: true,
                error: null
              });
            });
            _context.prev = 4;
            _context.next = 7;
            return regeneratorRuntime.awrap(_api["default"].post('/bookings/check_availability/', {
              room: roomId,
              check_in: checkIn,
              check_out: checkOut
            }));

          case 7:
            response = _context.sent;
            setAvailability({
              isAvailable: response.data.is_available,
              availableRooms: response.data.available_rooms,
              message: response.data.message,
              loading: false,
              error: null
            });
            return _context.abrupt("return", response.data.is_available);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            errorMsg = _context.t0.message || 'Failed to check availability';
            setAvailability({
              isAvailable: false,
              availableRooms: 0,
              message: errorMsg,
              loading: false,
              error: errorMsg
            });
            return _context.abrupt("return", false);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 12]]);
  };

  var resetAvailability = function resetAvailability() {
    setAvailability({
      isAvailable: true,
      availableRooms: 0,
      message: '',
      loading: false,
      error: null
    });
  };

  return {
    availability: availability,
    checkAvailability: checkAvailability,
    resetAvailability: resetAvailability
  };
};

var _default = useRoomAvailability;
exports["default"] = _default;
//# sourceMappingURL=roomAvailabilityHooks.dev.js.map
