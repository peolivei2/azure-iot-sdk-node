'use strict';

var utils = require('../utils/writer.js');
var Wrapper = require('../service/WrapperService');

module.exports.wrapper_Cleanup = function wrapper_Cleanup (req, res, next) {
  Wrapper.wrapper_Cleanup()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.wrapper_GetCapabilities = function wrapper_GetCapabilities (req, res, next) {
  Wrapper.wrapper_GetCapabilities()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.wrapper_LogMessage = function wrapper_LogMessage (req, res, next) {
  var msg = req.swagger.params['msg'].value;
  Wrapper.wrapper_LogMessage(msg)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
