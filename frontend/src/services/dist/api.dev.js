"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var api = _axios["default"].create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(function (config) {
  try {
    var stored = localStorage.getItem('luxeAuth');

    if (stored) {
      var _JSON$parse = JSON.parse(stored),
          token = _JSON$parse.token;

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer ".concat(token);
      }
    }
  } catch (e) {// ignore
  }

  return config;
}); // Add response interceptor to handle errors

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.data) {
    // Extract error message from response
    if (error.response.data.non_field_errors) {
      error.message = error.response.data.non_field_errors[0];
    } else if (_typeof(error.response.data) === 'object') {
      // Get the first error message from the response
      var firstKey = Object.keys(error.response.data)[0];
      error.message = error.response.data[firstKey][0];
    } else {
      error.message = error.response.data;
    }
  }

  return Promise.reject(error);
});
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
