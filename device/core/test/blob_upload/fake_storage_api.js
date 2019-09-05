// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

// function FakeBlobService() {}

// FakeBlobService.prototype.createBlockBlobFromStream = function (containerName, blobName, stream, streamLength, done) {
//   done('fakeError', 'fakeBody', 'fakeResponse');
// };

// BlockBlobURL: any;
// Aborter: Aborter;
// StorageURL: any;
// AnonymousCredential: any;
// uploadStreamToBlockBlob: any;

function AnonymousCredential() {};

class Aborter {
  constructor () {
  }
  static timeout() {
    return 'fakeTimeout';
  }
}

function fakePipeline() {};

class StorageURL {
  constructor() {
   }

  static newPipeline() {
    return fakePipeline;
  }
};

class BlockBlobURL {
  constructor(url, pipeline) {
    return 'fakeBlockBlobURL'
  }
}

function uploadStreamToBlockBlob() {
  return new Promise((resolve, reject) => {
    resolve('fakeUploadResponse');
  });
}



// const blockBlobURL = new this.storageApi.BlockBlobURL(`https://${blobInfo.hostName}/${blobInfo.containerName}/${blobInfo.blobName}${blobInfo.sasToken}`, pipeline);
// const uploadPromise = this.storageApi.uploadStreamToBlockBlob(this.storageApi.Aborter.timeout(30 * 60 * 1000), stream, blockBlobURL, streamLength, 20, { progress: ev => console.log(ev) });
// uploadPromise

// function createBlobServiceWithSas (host, sasToken) {
//   if (!host) throw new ReferenceError('host cannot be falsy');
//   if (!sasToken) throw new ReferenceError('host cannot be falsy');
//   return new FakeBlobService();
// }


module.exports = {
  AnonymousCredential: AnonymousCredential,
  Aborter: Aborter,
  StorageURL: StorageURL,
  BlockBlobURL: BlockBlobURL,
  uploadStreamToBlockBlob: uploadStreamToBlockBlob
};
