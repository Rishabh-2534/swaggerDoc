/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const btoa = require('btoa');

const utils = require('../utils/utils');
const logger = require('../utils/logger');
const config = require('../config/config');
const constants = require('../config/constants');

/**
 * @function <b>getFile</b> Get File
 * @return {Object}
 */
const getFile = async (fileUploadBaseUrl, accessToken, fileVersionId) => {
  // Query SF database to fetch extra params
  const urn = `${utils.getRequestUrn(
    'file',
    'get',
  )}?q=select%20Id%2C%20ContentDocumentId%2C%20Title%2C%20ContentSize%2C%20FileType%20from%20ContentVersion%20where%20id%20%3D%20%27${fileVersionId}%27`;
  const { status, data, statusCode, message } = await utils.makeGetRequest(
    fileUploadBaseUrl + urn,
    accessToken,
    {},
  );
  logger.debug({ status, data });
  const { response } = data;
  if (
    status === 'success' &&
    response &&
    response.records &&
    response.records[0]
  ) {
    logger.debug({ fileId: response.records[0].ContentDocumentId });
    return {
      fileId: response.records[0].ContentDocumentId,
      fileVersionId,
      size: response.records[0].ContentSize,
      type: response.records[0].FileType,
      title: response.records[0].Title,
    };
  }
  logger.error(
    ` ***  File Not Found, status is : ${status}  ***  data is : ${data}`,
  );
  return {
    status,
    data,
    statusCode,
    message,
    err: 'file Not Found',
  };
};

/**
 * @function <b>uploadFile</b> Upload File
 * @return {Object}
 */
const uploadFile = async (baseUrl, accessToken, fileData) => {
  // logger.trace({ fileData });
  let fileUploadBaseUrl;
  if (baseUrl.includes('/services/Simpplr/apexrest')) {
    fileUploadBaseUrl = baseUrl.split('/services/Simpplr/apexrest')[0];
  } else if (baseUrl.includes('/services/apexrest')) {
    fileUploadBaseUrl = baseUrl.split('/services/apexrest')[0];
  } else {
    fileUploadBaseUrl = baseUrl.split('/apex')[0];
  }
  logger.trace({ fileData });
  const urn = utils.getRequestUrn('file', 'upload');
  // Upload File to SF using Base64 data
  const { status, data, statusCode, message } = await utils.makePostRequest(
    fileUploadBaseUrl + urn,
    accessToken,
    fileData,
    1,
  );
  logger.debug({ status, data });
  const { response } = data;
  // Sample Response : {\"id\":\"0685e000004ZwRZAA0\",\"success\":true,\"errors\":[]}
  if (status === 'success' && response && response.success) {
    // Fetch Extra params required using ID in response
    // eslint-disable-next-line object-curly-newline
    const { fileId, fileVersionId, size, type, title, err } = await getFile(
      fileUploadBaseUrl,
      accessToken,
      response.id,
    );
    logger.debug({ fileId, fileVersionId, err });
    return {
      fileId,
      fileVersionId,
      size,
      type,
      title,
      err,
    };
  }
  logger.error(
    ` ***  File Upload Error, status is : ${status}  ***  data is : ${data}`,
  );
  return {
    status,
    data,
    statusCode,
    message,
    err: 'Upload File Error',
  };
};

const addFileToAlbum = async (req, baseUrl, accessToken, fileData) => {
  const urn = utils.getRequestUrn('file', 'addToAlbum');
  const { status, data } = await utils.makePostRequest(
    baseUrl + urn,
    accessToken,
    fileData,
    req.use_json_headers,
  );
  logger.debug({ status, data });
  if (status === 'success' && data && data.id) {
    return data.id;
  }
  return 'error';
};

const makeFileRequestParam = (fileData, siteId) => ({
  isImage: true,
  isAccessible: true,
  size: fileData.size,
  contentDocumentId: fileData.fileId,
  context: 'intranet',
  title: fileData.title,
  type: fileData.type,
  contentVersionId: fileData.fileVersionId,
  url: `/apex/FileDetail?siteId=${siteId}&fileId=${fileData.fileId}`,
  fileUrl: `/sfc/servlet.shepherd/version/Download/${fileData.fileVersionId}?asPdf=false&operationContext=CHATTER`,
});

const processFileRequest = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      if (req.listOfFiles && req.listOfFiles.length) {
        const listFileUploadArray = [];
        req.listOfFiles.map((listFileData) => {
          listFileUploadArray.push(
            uploadFile(req.base_url, req.access_token, {
              Title: listFileData.filename,
              PathOnClient: listFileData.filename,
              VersionData: btoa(listFileData.fileContent),
            }),
          );
        });
        if (listFileUploadArray.length) {
          const listFileUploadResult = await Promise.all(listFileUploadArray);
          req.body.listOfFiles = [];
          listFileUploadResult.map((fileRes) => {
            if (fileRes.err) {
              return reject({
                statusCode: 500,
                msg: 'File upload error.',
                status: 'error',
              });
            }
            req.body.listOfFiles.push(
              makeFileRequestParam(fileRes, req.params.site_id),
            );
          });
        }
      }
      // Process album media files
      if (
        req.listOfAlbumMedia &&
        req.listOfAlbumMedia.length &&
        req.params.content_id
      ) {
        const listFileUploadArray = [];
        req.listOfAlbumMedia.map((listOfAlbumMediaData) => {
          listFileUploadArray.push(
            uploadFile(req.base_url, req.access_token, {
              Title: listOfAlbumMediaData.filename,
              PathOnClient: listOfAlbumMediaData.filename,
              VersionData: btoa(listOfAlbumMediaData.fileContent),
            }),
          );
        });
        if (listFileUploadArray.length) {
          const listFileUploadResult = await Promise.all(listFileUploadArray);
          req.body.listOfAlbumMedia = [];
          const addMediaToAlbumArray = [];
          listFileUploadResult.map((fileRes) => {
            if (fileRes.err) {
              return reject({
                statusCode: 500,
                msg: 'File upload error.',
                status: 'error',
              });
            }
            addMediaToAlbumArray.push(
              addFileToAlbum(req, req.base_url, req.access_token, {
                id: req.params.content_id,
                fileContentVersionId: fileRes.fileVersionId,
                fileContentDocId: fileRes.fileId,
                fileDescription: fileRes.title,
              }),
            );
          });
          const addMediaToAlbumResult = await Promise.all(addMediaToAlbumArray);
          // TODO : ERROR HANDLING
          addMediaToAlbumResult.map((mediaRes) => {
            if (mediaRes !== 'error') {
              req.body.listOfAlbumMedia.push({
                id: mediaRes,
              });
            }
          });
        }
      }
      if (req.files && req.files.length) {
        // Each endpoint will be having their own set of assets to handle
        const fileUploadArray = [];
        let fileBody;
        // eslint-disable-next-line array-callback-return
        req.files.map((fileData) => {
          fileBody = {
            Title: fileData.filename,
            PathOnClient: fileData.filename,
          };
          if (fileData['original-file']) {
            fileBody.VersionData = btoa(fileData['original-file']);
            fileUploadArray.unshift(fileBody);
          } else if (fileData['landscape-file']) {
            fileBody.VersionData = btoa(fileData['landscape-file']);
            fileUploadArray.push(fileBody);
          }
        });

        if (fileUploadArray.length) {
          if (!fileUploadArray[0] || !fileUploadArray[1]) {
            return reject({
              statusCode: 401,
              msg: 'Validation error: "original-file" & "landscape-file" are required',
              status: 'error',
            });
          }
          const fileUploadResult = await Promise.all([
            uploadFile(req.base_url, req.access_token, fileUploadArray[0]),
            uploadFile(req.base_url, req.access_token, fileUploadArray[1]),
          ]);
          if (
            (fileUploadResult[0] && fileUploadResult[0].err) ||
            (fileUploadResult[1] && fileUploadResult[1].err)
          ) {
            return reject({
              statusCode: 500,
              msg: 'File upload error.',
              status: 'error',
            });
          }
          // Make apt req for SF
          if (fileUploadResult[0]) {
            req.body.imgLayout = 'small';
            req.body.img = `/sfc/servlet.shepherd/version/Download/${fileUploadResult[0].fileVersionId}?asPdf=false&operationContext=CHATTER`;
            req.body.imgFile = makeFileRequestParam(
              fileUploadResult[0],
              req.params.site_id,
            );
          }
          if (fileUploadResult[1]) {
            req.body.imgOriginal = `/sfc/servlet.shepherd/version/Download/${fileUploadResult[1].fileVersionId}?asPdf=false&operationContext=CHATTER`;
            req.body.imgLandscape = `/sfc/servlet.shepherd/version/Download/${fileUploadResult[1].fileVersionId}?asPdf=false&operationContext=CHATTER`;
            req.body.imgLandscapeFile = makeFileRequestParam(
              fileUploadResult[1],
              req.params.site_id,
            );
            req.body.imgOriginalFile = makeFileRequestParam(
              fileUploadResult[1],
              req.params.site_id,
            );
          }
        }
      }
      resolve();
    } catch (err) {
      return reject({
        statusCode: 500,
        msg: 'File upload error.',
        status: 'error',
      });
    }
  });

const processFileRequestUpload = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      if (req.listOfFiles && req.listOfFiles.length) {
        const listFileUploadArray = [];
        req.listOfFiles.map((listFileData) => {
          listFileUploadArray.push(
            uploadFile(req.base_url, req.access_token, {
              Title: listFileData.filename,
              PathOnClient: `${constants.FILE_UPLOAD_CONSTANT}#${
                req.params.site_id
              }#${req.body['folder-id'] ? req.body['folder-id'] : ''}#${
                listFileData.filename
              }`,
              VersionData: btoa(listFileData.fileContent),
            }),
          );
        });

        if (listFileUploadArray.length) {
          const listFileUploadResult = await Promise.all(listFileUploadArray);
          req.body.listOfFiles = [];
          listFileUploadResult.map((fileRes) => {
            if (fileRes.err) {
              return reject({
                statusCode: 500,
                msg: 'File upload error.',
                status: 'error',
              });
            }
          });
        }
      }
      resolve(req.body.listOfFiles);
    } catch (err) {
      return reject({
        statusCode: 500,
        msg: 'File upload error.',
        status: 'error',
      });
    }
  });

module.exports = {
  uploadFile,
  getFile,
  processFileRequest,
  makeFileRequestParam,
  addFileToAlbum,
  processFileRequestUpload,
};
