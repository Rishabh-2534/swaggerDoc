const utils = require('../../utils/utils');
const blogs = require('../../services/blogs_service');
const res = require('../../utils/responses');
const fileUploadService = require('../../services/fileUpload_service');
const constants = require('./constants');

// Test Get Blog By ID
describe('Test GetBlogById', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makeGetRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makeGetRequest.mockReturnValue(constants.getRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makeGetRequest.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should get the Blog by id', async () => {
    const request = {
      params: {},
      query: {},
    };
    const response = {
      status: () => ({ send: () => constants.getRequestResponse }),
    };

    const result = await blogs.getBlogById(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.getRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await blogs.getBlogById(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Create Blog
describe('Test Create Blog', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);

    fileUploadService.processFileRequest = jest.spyOn(
      fileUploadService,
      'processFileRequest',
    );
    fileUploadService.processFileRequest.mockReturnValue(1);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();

    fileUploadService.processFileRequest.mockRestore();
  });

  it('should create the blog by site id', async () => {
    const request = {
      body: {
        'site-id': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await blogs.createBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(fileUploadService.processFileRequest).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should create the blog without site id', async () => {
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await blogs.createBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(fileUploadService.processFileRequest).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await blogs.createBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });

  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce(
      constants.promiseRejectResponse,
    );
    const request = {};
    const response = {
      status: () => ({ send: () => constants.promiseRejectResponse }),
    };

    const result = await blogs.createBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.promiseRejectResponse);
  });
  it('should throw error Object if promise is rejected and response status get selected as 500', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce({
      status: 'error',
      message: 'Async Error.',
    });
    const request = {};
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'Async Error.',
        }),
      }),
    };

    const result = await blogs.createBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Test Update Blog
describe('Test Update Blog', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);

    fileUploadService.processFileRequest = jest.spyOn(
      fileUploadService,
      'processFileRequest',
    );
    fileUploadService.processFileRequest.mockReturnValue(1);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();

    fileUploadService.processFileRequest.mockRestore();
  });

  it('should Update the Blog', async () => {
    const request = {
      params: {},
      body: {
        'authored-by': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await blogs.updateBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(fileUploadService.processFileRequest).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await blogs.updateBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });

  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce(
      constants.promiseRejectResponse,
    );
    const request = {};
    const response = {
      status: () => ({ send: () => constants.promiseRejectResponse }),
    };

    const result = await blogs.updateBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.promiseRejectResponse);
  });
  it('should throw error Object if promise is rejected and response status get selected as 500', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce({
      status: 'error',
      message: 'Async Error.',
    });
    const request = {};
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'Async Error.',
        }),
      }),
    };

    const result = await blogs.updateBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Delete a Blog
describe('Test Delete a Blog', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should delete an Blog', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await blogs.deleteBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await blogs.deleteBlog(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
