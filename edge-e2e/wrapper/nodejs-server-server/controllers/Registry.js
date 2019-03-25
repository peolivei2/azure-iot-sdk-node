'use strict';

var utils = require('../utils/writer.js');
var Registry = require('../service/RegistryService');

module.exports.registry_Connect = function registry_Connect (req, res, next) {
  var connectionString = req.swagger.params['connectionString'].value;
  Registry.registry_Connect(connectionString)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registry_Disconnect = function registry_Disconnect (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  Registry.registry_Disconnect(connectionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registry_GetModuleTwin = function registry_GetModuleTwin (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  var deviceId = req.swagger.params['deviceId'].value;
  var moduleId = req.swagger.params['moduleId'].value;
  Registry.registry_GetModuleTwin(connectionId,deviceId,moduleId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registry_PatchModuleTwin = function registry_PatchModuleTwin (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  var deviceId = req.swagger.params['deviceId'].value;
  var moduleId = req.swagger.params['moduleId'].value;
  var props = req.swagger.params['props'].value;
  Registry.registry_PatchModuleTwin(connectionId,deviceId,moduleId,props)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
