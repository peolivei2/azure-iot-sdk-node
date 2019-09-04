// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

import { RestErrorStub } from './../interfaces';

/**
 * @private
 * @class         module:azure-iot-device.BlobUploadResult
 * @classdesc     Result object used by the {@link module:azure-iot-device.blobUpload.BlobUploader} class to describe a successful upload to a blob.
 *
 * @params        isSuccess          {Boolean} Indicates whether the upload was successful or failed
 * @params        statusCode         {Number}  Status code returned by the blob storage upload operation
 * @params        statusDescription  {String}  String containing useful information pertaining to the result of the blob upload.
 *
 * @augments      {Error}
 */
export class BlobUploadResult {
  isSuccess: boolean;
  statusCode: number;
  statusDescription: string;

  constructor(isSuccess: boolean, statusCode: number, statusDescription: string) {
    /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_001: [The `isSuccess` parameter shall be assigned to the the `isSuccess` property of the newly created `BlobUploadResult` instance.]*/
    this.isSuccess = isSuccess;
    /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_002: [The `statusCode` parameter shall be assigned to the the `statusCode` property of the newly created `BlobUploadResult` instance.]*/
    this.statusCode = statusCode;
    /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_003: [The `statusDescription` parameter shall be assigned to the the `statusDescription` property of the newly created `BlobUploadResult` instance.]*/
    this.statusDescription = statusDescription;
  }

  /**
   * @method           module:azure-iot-device.BlobUploadResult#fromAzureStorageCallbackArgs
   * @description      The `fromAzureStorageCallbackArgs` static method creates a new BlobUploadResult instance from the arguments passed to the callback of the azure storage upload method.
   *
   * @param {Object}   err         The error object that is passed to the callback.
   * @param {Object}   body        The body of the HTTP response.
   * @param {Object}   response    The HTTP response object.
   *
   * @throws {ReferenceException} If err is null and either body or response are also falsy.
   */
  // DISCUSS WITH PIERRE BECAUSE THESE BLOB REQUIREMENTS DONT MAKE SENSE AT ALL
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_004: [If the `err` argument is not `null`, the `BlobUploadResult` error shall have the `isSuccess` property set to `false`.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_005: [If `err`, `body` and `response` are not `null` (HTTP error), the `BlobUploadResult` error shall have the `statusCode` property set to the HTTP error code of the blob upload response.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_006: [If `err`, `body` and `response` are not `null` (HTTP error), the `BlobUploadResult` error shall have the `statusDescription` property set to the HTTP error body of the blob upload response.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_007: [If the `err` argument is not `null` but body and response are `undefined` (non HTTP error), the `BlobUploadResult` error shall have the `statusCode` property set to -1.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_008: [If the `err` argument is not `null` but body and response are `undefined` (non HTTP error), the `BlobUploadResult` error shall have the `statusDescription` property set to the error message.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_009: [If `err` is null but `body` and `reponse` are provided, the `BlobUploadResult` error shall have the `isSuccess` property set to `true`.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_010: [If `err` is null but `body` and `reponse` are provided, the `BlobUploadResult` error shall have the `statusCode` property set to the HTTP status code of the blob upload response.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_011: [If `err` is null but `body` and `reponse` are provided, the `BlobUploadResult` error shall have the `statusDescription` property set to the HTTP response body of the blob upload response.]*/
  /*Codes_SRS_NODE_DEVICE_BLOB_UPLOAD_RESULT_16_012: [If `err` is null and `body` and/or `response` is/are falsy, `fromAzureStorageCallbackArgs` shall throw a `ReferenceError`.]*/
  static fromAzureStorageCallbackArgs(err?: Error & RestErrorStub, uploadResponse?: any): BlobUploadResult {
    let uploadResult: BlobUploadResult;
    if (!err && (!uploadResponse)) throw new ReferenceError('if err is null, response must be supplied');
    // from new storage API
    if (err) {
      const statusCode = err.statusCode;
      const statusDescription = err.response;
      uploadResult = new BlobUploadResult(false, statusCode, statusDescription) 
    }
    if (uploadResponse.errorCode) {
      const statusCode = uploadResponse._response ? uploadResponse._response.status : -1;
      const statusDescription = uploadResponse._response ? uploadResponse._response.bodyAsText : 'no status description';
      uploadResult = new BlobUploadResult(false, statusCode, statusDescription);
    } else {
      const statusCode = uploadResponse._response.status;
      const statusDescription = uploadResponse._response.bodyAsText;
        if (uploadResponse._response.status >= 200 && uploadResponse._response.status < 300) {
          uploadResult = new BlobUploadResult(true, statusCode, statusDescription);
        } else {
          uploadResult = new BlobUploadResult(false, statusCode, statusDescription);
        }
    }
    return uploadResult;
  }
}

