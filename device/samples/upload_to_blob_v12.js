// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// UPLOAD TO BLOB SAMPLE 
// This is the new api for upload to blob. While before the upload to blob task was abstracted as a 
// single API call, this API removes the Azure Storage Blob package from within the Node.js Client Library
// and instead exposes two new APIs: 
//
// blobGetSharedAccessSignatureFromIotHub 
// > Using a HTTP POST, retrieve a SAS Token for the Storage Account linked to your IoT Hub.
//
// blobNotifyIotHubUploadComplete
// > Using HTTP POST, notify IoT Hub of the status of a finished file upload (success/failure).
// 
// More information on Uploading Files with IoT Hub can be found here:
// https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-file-upload



const { BlobServiceClient, SharedKeyCredential } = require("@azure/storage-blob"); // Change to "@azure/storage-blob" in your package

const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const fs = require('fs');

// make sure you set these environment variables prior to running the sample.
const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING;
const account = process.env.STORAGE_ACCOUNT;
const accountKey = process.env.STORAGE_ACCOUNT_KEY;




async function uploadToBlob(client) {
  // OUR CODE
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const containerName = `newcontainer${new Date().getTime()}`;
  
  let blobInfo = await client.blobGetSharedAccessSignatureFromIotHub(blobName);
  if (!blobInfo) { 
    throw new errors.ArgumentError('Invalid upload parameters');
  }
  
  // STORAGE BLOB CODE
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
    );
    
    
    // Create a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();

  const createContainerResponse = await containerClient.create();
  console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

  // Create a blob
  let uploadError;
  try {
    const uploadBlobResponse = blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  } catch (e) {
    console.log(`Upload block blob failed`);
    uploadError = e;
  }
  // END STORAGE CODE

  // notify IoT Hub of upload to blob status (success/faillure)
  await client.blobNotifyIotHubUploadComplete(uploadStatus);
  return 0;
}

uploadToBlob(Client.fromConnectionString(deviceConnectionString, Protocol))
  .catch((err) => {
    return new Error(err);
  });

