// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var websocket = require('websocket-stream')
var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;

var deviceConnectionString = process.env.DEVICE_CONNECTION_STRING;
var client = Client.fromConnectionString(deviceConnectionString, Protocol);
client.on('error', function (err) {
  console.error(err.toString());
  process.exit(-1);
})
client.open(function (err) {
  if (err) {
    console.error('could not connect client: ' + err.toString());
    process.exit(-1);
  } else {
    console.log('connected');
    client.onStreamRequest(function (request) {
      console.log('Received stream request:');
      console.log(JSON.stringify(request));

      request.accept(function (err) {
        if (err) {
          console.error('error accepting the request: ' + err.toString());
          process.exit(-1);
        } else {
          console.log('request accepted!');
          var ws = websocket(request.url, { headers: { 'Authorization': 'Bearer ' + request.authorizationToken} });
          process.stdin.pipe(ws);
          ws.pipe(process.stdout);
        }
      });
    });
  }
});
