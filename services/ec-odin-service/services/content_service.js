/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

/* eslint-disable no-unused-expressions */
const utils = require('../utils/utils');
const logger = require('../utils/logger');
const response = require('../utils/responses');
const fileUploadService = require('./fileUpload_service');

const kaltura = require('kaltura-client');
const constants = require('../config/constants');
const config = new kaltura.Configuration();
const client = new kaltura.Client(config);

const validateContent = async (req, res) => {
  const { content_id } = req.params;
  try {
    const urn = utils.getRequestUrn('contents', 'validate');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}`;
    const body = {
      contentId: content_id,
      isValid: true,
    };
    const resultObj = await utils.makePostRequest(uri, req.access_token, body);
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ err });
    return res.status(err.statusCode || 500).send(err);
  }
};

const contentApproval = async (req, res) => {
  const { action } = req.body;
  const { site_id, content_id } = req.params;
  const { CONTENT_APPROVAL_ACTIONS } = constants;

  if (!(action && CONTENT_APPROVAL_ACTIONS.includes(action))) {
    logger.error('No valid action sent - contentApproval');
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: `Valid actions can be ${CONTENT_APPROVAL_ACTIONS}`,
    });
  }
  try {
    const urn = utils.getRequestUrn('contents', 'approveContent');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}action=${action}&siteId=${site_id}`;
    const body = {
      siteId: site_id,
      contentId: content_id,
      setPublishedBool: action === 'publish',
    };
    const resultObj = await utils.makePostRequest(uri, req.access_token, body);
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ err });
    return res.status(err.statusCode || 500).send(err);
  }
};

const getAllContentForApproval = async (req, res) => {
  let domainName = req.headers['x-simpplr-domain'];
  const url = `${domainName}/services/data/v50.0/query/?q=${constants.CONTENT_APPROVAL_QUERY}`;
  try {
    const resultObj = await utils.fetchContentForApproval(
      url,
      req.access_token,
    );
    return res.status(resultObj.statusCode).json(resultObj);
  } catch (error) {
    logger.error({ err });
    return res.status(err.statusCode || 500).send(err);
  }
};

const uploadChunks = (
  uploadTokenId,
  fileData,
  resume,
  finalChunk,
  resumeAt,
  client,
) => {
  return new Promise((resolve, reject) => {
    kaltura.services.uploadToken
      .upload(uploadTokenId, fileData, resume, finalChunk, resumeAt)
      .execute(client)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const uploadVideo = async (req, res) => {
  if (!(req.files && req.files[0].videoData)) {
    logger.error('Video file not found in Request - uploadVideo');
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Video file not found in Request',
    });
  }
  if (req.files.length > 1) {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Not more than 1 files are allowed',
    });
  }
  const fileData = req.files[0].videoData;
  const fileName = req.files[0].filename;
  const { siteId } = req.body;
  const parts = fileName.split('.');
  const fileExtension = parts[1].toLowerCase();
  if (!constants.ALLOWED_VIDEO_FORMATS.includes(fileExtension)) {
    logger.error('No valid file - uploadVideo');
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'Uploaded file format is not supported.',
    });
  }

  let chunkSize = constants.KALTURA_VIDEO_CHUNK_SIZE;
  let chunks = Math.ceil(fileData.length / chunkSize, chunkSize);
  let chunk = 0;
  let videoChunks = [];

  while (chunk <= chunks - 1) {
    let offset = chunk * chunkSize;
    let tempFile = fileData.slice(offset, offset + chunkSize);
    chunk += 1;
    videoChunks.push(Buffer.from(tempFile, 'binary'));
  }

  try {
    const accessTokenResponse = await utils.getAccessToken(req);
    if (!accessTokenResponse) {
      logger.error('Failed to fetch video Upload Token - uploadVideo');
      return res.status(500).send('Something went wrong');
    }
    const { playerUrl, accessToken } = accessTokenResponse.data;
    const { ks } = accessToken;
    client.setKs(ks);

    let uploadToken = new kaltura.objects.UploadToken();
    uploadToken.fileName = fileName;
    uploadToken.fileSize = fileData.length;
    uploadToken.format = 1;

    kaltura.services.uploadToken
      .add(uploadToken)
      .execute(client)
      .then(async (token) => {
        let uploadTokenId = token.id;
        let resume = false;
        let finalChunk = false;
        let finalChunkResponse = null;

        for (let i = 0; i < videoChunks.length; i++) {
          if (i !== 0) resume = true;
          if (i === videoChunks.length - 1) finalChunk = true;
          let result = await uploadChunks(
            uploadTokenId,
            videoChunks[i],
            resume,
            finalChunk,
            i * chunkSize,
            client,
          ).catch((error) => {
            logger.error(
              `Failed to upload chunk ${i + 1
              } - videoUpload error is  : ${error}`,
            );
            return res.status(error.statusCode || 500).send(error);
          });
          if (finalChunk) finalChunkResponse = result;
        }

        let mediaEntry = new kaltura.objects.MediaEntry();
        mediaEntry.name = fileName;
        mediaEntry.description = fileName;
        mediaEntry.mediaType = kaltura.enums.MediaType.VIDEO;
        const entry = await kaltura.services.media
          .add(mediaEntry)
          .execute(client);

        let entryId = entry.id;
        let resource = new kaltura.objects.UploadedFileTokenResource();
        resource.token = uploadTokenId;

        const addContentResult = await kaltura.services.media
          .addContent(entryId, resource)
          .execute(client);
        const addVideoResponse = await utils.addVideoToCategory(
          req,
          addContentResult,
          finalChunkResponse,
          siteId,
        );
        if (addVideoResponse.statusCode !== 200) {
          return res.status(404).send({
            statusCode: 404,
            status: 'error',
            message: 'Site not found',
          });
        }

        const splittedPlayerURL = playerUrl.split('&ks');
        const config = constants.KALTURA_PLAYER_URL_CONFIG;
        const url =
          `${splittedPlayerURL[0]}&entry_id=${entryId}&config[playback]=` +
          JSON.stringify(config);
        let textBody = await utils.makeTextBodyForVideoUpload(
          addContentResult,
          finalChunkResponse,
          url,
        );
        const resultObj = await utils.postVideoDataOnFeed(req, textBody);
        return res.status(resultObj.statusCode).send(resultObj);
      });
  } catch (err) {
    logger.error({ err });
    return res.status(err.statusCode || 500).send(err);
  }
};

const uploadImageToAlbum = async (req, res) => {
  logger.info(`Starting file upload to album process, request is : ${req}`);
  let albumMediaList;
  try {
    await fileUploadService.processFileRequest(req);
    albumMediaList = req.body.listOfAlbumMedia;
    const body = {
      albumMediaList,
      albumId: req.params.content_id,
    };
    const urn = utils.getRequestUrn('file', 'submitMediaToAlbum');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}`;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (err) {
    logger.error({ err });
    return res.status(err.statusCode || 500).send(err);
  }
};

const getPageById = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'getPageById');
  if (!urn) {
    return response.mapingError(res);
  }
  req.query.contentId = req.params.content_id;
  const resultObj = await utils.makeGetRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getPageCategories = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'getPageCategories');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.body,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const deleteAlbumImages = async (req, res) => {
  const body = {
    fileId: req.body['file-ids'],
    provider: req.body['provider'],
    fileSiteId: req.params['site_id'],
  };
  const urn = utils.getRequestUrn('contents', 'deleteImagesFromAlbum');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(
    uri,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getEventById = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'getEventById');
  if (!urn) {
    return response.mapingError(res);
  }
  req.query.contentId = req.params.content_id;
  const resultObj = await utils.makeGetRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const createPage = async (req, res) => {
  try {
    const urn = utils.getRequestUrn('contents', 'createPage');
    if (!urn) {
      return response.mapingError(res);
    }
    await fileUploadService.processFileRequest(req, res);
    req.body.siteId = req.params.site_id;
    if (req.body['category-name']) {
      req.body.category = { name: req.body['category-name'] };
      delete req.body['category-name'];
    }
    const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const createEvent = async (req, res) => {
  try {
    const urn = utils.getRequestUrn('contents', 'createEvent');
    if (!urn) {
      return response.mapingError(res);
    }
    if (req.body['has-rsvp']) {
      req.body.rsvp = {
        dueAtDate: null,
        capacityCount: null,
      };
      req.body['rsvp-due-at-date']
        ? (req.body.rsvp.dueAtDate = req.body['rsvp-due-at-date'])
        : '';
      req.body['rsvp-capacity-count']
        ? (req.body.rsvp.capacityCount = req.body['rsvp-capacity-count'])
        : '';
      req.body['rsvp-has-maybe-option']
        ? (req.body.rsvp.hasMaybeOption = req.body['rsvp-has-maybe-option'])
        : '';
      req.body['rsvp-note-label']
        ? (req.body.rsvp.noteLabel = req.body['rsvp-note-label'])
        : '';
      delete req.body['rsvp-due-at-date'];
      delete req.body['rsvp-capacity-count'];
      delete req.body['rsvp-has-maybe-option'];
      delete req.body['rsvp-note-label'];
    }
    await fileUploadService.processFileRequest(req, res);
    const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const deleteContent = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    contentId: req.params.content_id,
  };
  const urn = utils.getRequestUrn('contents', 'deleteContent');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(
    uri,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const deleteEvent = async (req, res) => {
  const body = {
    siteId: req.params.site_id,
    contentId: req.params.content_id,
  };
  const urn = utils.getRequestUrn('contents', 'deleteEvent');
  if (!urn) {
    return response.mapingError(res);
  }
  const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
  const resultObj = await utils.makePostRequest(
    uri,
    req.access_token,
    body,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const updatePage = async (req, res) => {
  try {
    if (req.body['category-name']) {
      req.body.category = { name: req.body['category-name'] };
      delete req.body['category-name'];
    }
    if (req.body['authored-by']) {
      req.body.authoredBy = {
        peopleId: req.body['authored-by'],
      };
    }
    await fileUploadService.processFileRequest(req, res);
    const urn = utils.getRequestUrn('contents', 'updatePage');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}&contentId=${req.params.content_id
      }&siteId=${req.params.site_id}`;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    if (req.body['has-rsvp']) {
      req.body.rsvp = {
        dueAtDate: null,
        capacityCount: null,
      };
      req.body['rsvp-due-at-date']
        ? (req.body.rsvp.dueAtDate = req.body['rsvp-due-at-date'])
        : '';
      req.body['rsvp-capacity-count']
        ? (req.body.rsvp.capacityCount = req.body['rsvp-capacity-count'])
        : '';
      req.body['rsvp-has-maybe-option']
        ? (req.body.rsvp.hasMaybeOption = req.body['rsvp-has-maybe-option'])
        : '';
      req.body['rsvp-note-label']
        ? (req.body.rsvp.noteLabel = req.body['rsvp-note-label'])
        : '';
      delete req.body['rsvp-due-at-date'];
      delete req.body['rsvp-capacity-count'];
      delete req.body['rsvp-has-maybe-option'];
      delete req.body['rsvp-note-label'];
    }
    if (req.body['authored-by']) {
      req.body.authoredBy = {
        peopleId: req.body['authored-by'],
      };
    }
    await fileUploadService.processFileRequest(req, res);
    req.body.siteId = req.params.site_id;
    const urn = utils.getRequestUrn('contents', 'updateEvent');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}&contentId=${req.params.content_id
      }&siteId=${req.params.site_id}`;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const search = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'search');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getMustReadContent = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'getMustRead');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const getAllEvents = async (req, res) => {
  const urn = utils.getRequestUrn('contents', 'getAllEvents');
  if (!urn) {
    return response.mapingError(res);
  }
  const resultObj = await utils.makePostRequest(
    req.base_url + urn,
    req.access_token,
    req.query,
    req.use_json_headers,
  );
  return res.status(resultObj.statusCode).send(resultObj);
};

const createAlbum = async (req, res) => {
  try {
    if (req.body['authored-by']) {
      req.body.authoredBy = {
        id: req.body['authored-by'],
      };
    }
    const albumDraftResult = await utils.makePostRequest(
      `${req.base_url + utils.getRequestUrn('contents', 'saveAlbumDraft')
      }&siteId=${req.params.site_id}`,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    if (
      albumDraftResult &&
      albumDraftResult.status &&
      albumDraftResult.status === 'success' &&
      albumDraftResult.data &&
      albumDraftResult.data.id
    ) {
      req.params.content_id = albumDraftResult.data.id;
      // Process Album Files
      await fileUploadService.processFileRequest(req, res);
      const urn = utils.getRequestUrn('contents', 'updateAlbum');
      if (!urn) {
        return response.mapingError(res);
      }
      req.body.id = req.params.content_id;
      const uri = `${req.base_url + urn}&siteId=${req.params.site_id}`;
      const resultObj = await utils.makePostRequest(
        uri,
        req.access_token,
        req.body,
        req.use_json_headers,
      );
      return res.status(resultObj.statusCode).send(resultObj);
    }
    return response.invalidParam(res, 'Invalid Request');
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const updateAlbum = async (req, res) => {
  try {
    if (req.body['authored-by']) {
      req.body.authoredBy = {
        id: req.body['authored-by'],
      };
    }
    // Process Album Files
    await fileUploadService.processFileRequest(req, res);
    const urn = utils.getRequestUrn('contents', 'updateAlbum');
    if (!urn) {
      return response.mapingError(res);
    }
    const uri = `${req.base_url + urn}&siteId=${req.params.site_id}&contentId=${req.params.content_id
      }`;
    req.body.id = req.params.content_id;
    const resultObj = await utils.makePostRequest(
      uri,
      req.access_token,
      req.body,
      req.use_json_headers,
    );
    return res.status(resultObj.statusCode).send(resultObj);
  } catch (error) {
    logger.error({ error });
    return res.status(error.statusCode || 500).send(error);
  }
};

const uploadFileOnSite = async (req, res) => {
  try {
    const resultObj = await fileUploadService.processFileRequestUpload(
      req,
      res,
    );

    return res
      .status(200)
      .send({ status: 'Success', message: 'File Uploaded' });
  } catch (error) {
    logger.error({ error });
    return res
      .status(error.statusCode || 500)
      .send({ status: 'error', message: 'Internal Server Error' });
  }
};

const fetchVideoMetadata = async (req, res) => {
  const urn = utils.getRequestUrn('videos', 'fetchVideoMetaData');
  if (!urn) {
    return response.mapingError(res);
  }
  const { size, directory } = req.query;
  const body = {};
  body['site-id'] = req.query['site-id'];
  body.data = JSON.stringify({
    siteId: req.query['site-id'],
    sortBy: req.query['sort-by'],
    size,
    fullControl: true,
    provider: constants.VIDEO_PROVIDER,
    directory: directory ? directory : '',
  });

  const resultObj = await utils.makeGetRequest(
    req.base_url + urn,
    req.access_token,
    body,
  );

  const videoResult = [];
  if (resultObj.status === 'success' && resultObj.data.listOfItems) {
    const { listOfItems } = resultObj.data;
    for (let i = 0; i < listOfItems.length; i++) {
      if (listOfItems[i].isVideo) {
        const { title, owner, size, url } = listOfItems[i];
        const obj = {
          title,
          owner,
          size,
          url,
        };
        videoResult.push(obj);
      }
    }
  }
  const videoObj = {
    status: resultObj.status,
    statusCode: resultObj.statusCode,
    message: resultObj.message,
  };
  if (resultObj.data.listOfItems && resultObj.status === 'success') {
    videoObj.videoMetaData = videoResult;
  }
  return res.status(videoObj.statusCode).send(videoObj);
};

module.exports = {
  getPageById,
  getPageCategories,
  getEventById,
  createEvent,
  createPage,
  deleteEvent,
  deleteContent,
  updatePage,
  updateEvent,
  search,
  getMustReadContent,
  getAllEvents,
  createAlbum,
  updateAlbum,
  deleteAlbumImages,
  uploadImageToAlbum,
  uploadFileOnSite,
  uploadVideo,
  getAllContentForApproval,
  contentApproval,
  validateContent,
  fetchVideoMetadata,
};
