const express = require('express');

const siteRouter = express.Router();

const middleware = require('../middlewares/middleware');
const siteService = require('../services/site_service');
const siteValidator = require('../validators/siteValidator');

// Custom middlewares
siteRouter.use(middleware.getAccessToken);
siteRouter.use(middleware.getBaseUrl);
siteRouter.use(middleware.parseRequestBody);

siteRouter.get('/mysite', siteValidator.mySiteValidator, siteService.mySite);
siteRouter.get(
  '/:site_id',
  siteValidator.getByIdValidator,
  siteService.getById,
);
siteRouter.get(
  '/:site_id/getFiles',
  siteValidator.getFilesByIdValidator,
  siteService.getFilesBySiteId,
);
siteRouter.get('/', siteValidator.searchValidator, siteService.search);
siteRouter.post('/', siteValidator.createSiteValidator, siteService.create);
siteRouter.post(
  '/:site_id/member/:member_id',
  siteValidator.addMemberValidator,
  siteService.addMember,
);
siteRouter.delete(
  '/:site_id/member/:member_id',
  siteValidator.removeMemberValidator,
  siteService.removeMember,
);
siteRouter.post(
  '/:site_id/follower/:follower_id',
  siteValidator.addFollowerValidator,
  siteService.addFollower,
);
siteRouter.delete(
  '/:site_id/follower/:follower_id',
  siteValidator.removeFollowerValidator,
  siteService.removeFollower,
);
siteRouter.put(
  '/activate',
  siteValidator.activateValidator,
  siteService.activate,
);
siteRouter.put(
  '/:site_id',
  siteValidator.updateSiteValidator,
  siteService.update,
);

module.exports = {
  siteRouter,
};
