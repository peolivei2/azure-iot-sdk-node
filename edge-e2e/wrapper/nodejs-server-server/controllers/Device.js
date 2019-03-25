'use strict';

var utils = require('../utils/writer.js');
var Device = require('../service/DeviceService');

module.exports.device_Connect = function device_Connect (req, res, next) {
  var transportType = req.swagger.params['transportType'].value;
  var connectionString = req.swagger.params['connectionString'].value;
  var caCertificate = req.swagger.params['caCertificate'].value;
  Device.device_Connect(transportType,connectionString,caCertificate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_Disconnect = function device_Disconnect (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  Device.device_Disconnect(connectionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_EnableC2dMessages = function device_EnableC2dMessages (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  Device.device_EnableC2dMessages(connectionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_EnableMethods = function device_EnableMethods (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  Device.device_EnableMethods(connectionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_RoundtripMethodCall = function device_RoundtripMethodCall (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  var methodName = req.swagger.params['methodName'].value;
  var requestAndResponse = req.swagger.params['requestAndResponse'].value;
  Device.device_RoundtripMethodCall(connectionId,methodName,requestAndResponse)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_SendEvent = function device_SendEvent (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  var eventBody = req.swagger.params['eventBody'].value;
  Device.device_SendEvent(connectionId,eventBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.device_WaitForC2dMessage = function device_WaitForC2dMessage (req, res, next) {
  var connectionId = req.swagger.params['connectionId'].value;
  Device.device_WaitForC2dMessage(connectionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
