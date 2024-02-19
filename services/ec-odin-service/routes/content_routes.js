const express = require('express');

const contentRouter = express.Router();

const middleware = require('../middlewares/middleware');
const contentService = require('../services/content_service');
const contentValidator = require('../validators/contentValidator');

// Custom middlewares
contentRouter.use(middleware.getAccessToken);
contentRouter.use(middleware.getBaseUrl);
contentRouter.use(middleware.parseRequestBody);

contentRouter.post(
  '/content/:content_id/validate',
  contentService.validateContent,
);

contentRouter.post(
  '/site/:site_id/content/:content_id/approval',
  contentService.contentApproval,
);

contentRouter.get(
  '/video',
  contentValidator.fetchVideoMetaDataValidator,
  contentService.fetchVideoMetadata,
);

contentRouter.get('/approval', contentService.getAllContentForApproval);

contentRouter.post('/video/upload', contentService.uploadVideo);

contentRouter.post(
  '/site/:site_id/album/:content_id',
  contentService.uploadImageToAlbum,
);

contentRouter.delete(
  '/site/:site_id/album',
  contentValidator.deleteAlbumImagesValidator,
  contentService.deleteAlbumImages,
);

contentRouter.get(
  '/page/:content_id',
  contentValidator.getPageByIdValidator,
  contentService.getPageById,
);

contentRouter.get(
  '/event/all',
  contentValidator.getAllEventsValidator,
  contentService.getAllEvents,
);

contentRouter.get(
  '/event/:content_id',
  contentValidator.getEventByIdValidator,
  contentService.getEventById,
);
contentRouter.post(
  '/site/:site_id/page',
  contentValidator.createPageValidator,
  contentService.createPage,
);
contentRouter.post(
  '/site/:site_id/event',
  contentValidator.createEventValidator,
  contentService.createEvent,
);
contentRouter.get('/', contentValidator.searchValidator, contentService.search);
contentRouter.put(
  '/site/:site_id/page/:content_id',
  contentValidator.updatePageValidator,
  contentService.updatePage,
);
contentRouter.put(
  '/site/:site_id/event/:content_id',
  contentValidator.updateEventValidator,
  contentService.updateEvent,
);
contentRouter.delete(
  '/site/:site_id/content/:content_id',
  contentValidator.deleteContentValidator,
  contentService.deleteContent,
);
contentRouter.delete(
  '/site/:site_id/event/:content_id',
  contentValidator.deleteEventValidator,
  contentService.deleteEvent,
);

contentRouter.get(
  '/mustread/active',
  contentValidator.getMustReadContentValidator,
  contentService.getMustReadContent,
);

contentRouter.post(
  '/:site_id/album',
  contentValidator.createAlbumValidator,
  contentService.createAlbum,
);

contentRouter.put(
  '/:site_id/album/:content_id',
  contentValidator.updateAlbumValidator,
  contentService.updateAlbum,
);

contentRouter.post(
  '/site/:site_id/files',
  contentValidator.fileUploadValidator,
  contentService.uploadFileOnSite,
);

module.exports = {
  contentRouter,
};
