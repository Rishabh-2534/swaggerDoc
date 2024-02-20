const express = require('express');

const blogsRouter = express.Router();

const middleware = require('../middlewares/middleware');
const blogsService = require('../services/blogs_service');
const blogValidator = require('../validators/blogValidator.js');

// Custom middlewares
blogsRouter.use(middleware.getAccessToken);
blogsRouter.use(middleware.getBaseUrl);
blogsRouter.use(middleware.parseRequestBody);

blogsRouter
  .route('/')
  .post(blogValidator.createBlogValidator, blogsService.createBlog);

blogsRouter
  .route('/:content_id')
  .get(blogValidator.blogSearchValidator, blogsService.getBlogById)
  .put(blogValidator.updateBlogValidator, blogsService.updateBlog)
  .delete(blogValidator.deleteBlogValidator, blogsService.deleteBlog);

module.exports = {
  blogsRouter,
};
