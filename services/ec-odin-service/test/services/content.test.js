/* eslint-disable no-undef */
const utils = require('../../utils/utils');
const content = require('../../services/content_service');
const res = require('../../utils/responses');
const fileUploadService = require('../../services/fileUpload_service');
const constants = require('./constants');

// Test get Page by ID
describe('Test Get PageByID', () => {
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
  it('should get Page by id', async () => {
    const request = {
      params: {},
      query: {},
    };
    const response = {
      status: () => ({ send: () => constants.getRequestResponse }),
    };

    const result = await content.getPageById(request, response);
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

    const result = await content.getPageById(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test get Event by ID
describe('Tes Get EventByID', () => {
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
  it('should get Event by id', async () => {
    const request = {
      params: {},
      query: {},
    };
    const response = {
      status: () => ({ send: () => constants.getRequestResponse }),
    };

    const result = await content.getEventById(request, response);
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

    const result = await content.getEventById(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Create a Page
describe('Test Create a Page', () => {
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
  it('should create Page', async () => {
    const request = {
      body: {
        'category-name': 'myCategory',
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.createPage(request, response);
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

    const result = await content.createPage(request, response);
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

    const result = await content.createPage(request, response);
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

    const result = await content.createPage(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Test create an Event
describe('Test Create Event', () => {
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

  it('should create an Event', async () => {
    const request = {
      body: {
        'has-rsvp': true,
        'rsvp-due-at-date': true,
        'rsvp-capacity-count': true,
        'rsvp-has-maybe-option': true,
        'rsvp-note-label': true,
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.createEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should create an Event without rsvp params', async () => {
    const request = {
      body: {
        'has-rsvp': true,
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.createEvent(request, response);
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

    const result = await content.createEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce(
      constants.promiseRejectError,
    );
    const request = {};
    const response = {
      status: () => ({ send: () => constants.promiseRejectError }),
    };

    const result = await content.createEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.promiseRejectError);
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

    const result = await content.createEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Delete Page / content
describe('Delete Page / content', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();
  });
  it('should delete a Page / content', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.deleteContent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.deleteContent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Delete an Event
describe('Delete Event', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();
  });
  it('should delete a Event', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.deleteEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should throw an error if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.deleteEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Update a Page
describe('Update a Page', () => {
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

  it('should update the Page', async () => {
    const request = {
      body: {
        'category-name': 'myCategory',
        'authored-by': 'me',
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.updatePage(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.updatePage(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce(
      constants.promiseRejectResponse,
    );
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.promiseRejectResponse }),
    };

    const result = await content.updatePage(request, response);
    expect(result).toEqual(constants.promiseRejectResponse);
  });
  it('should throw error Object if promise is rejected and response status get selected as 500', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce({
      status: 'error',
      message: 'Async Error.',
    });
    const request = {
      body: {},
    };
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'Async Error.',
        }),
      }),
    };

    const result = await content.updatePage(request, response);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Update an Event
describe('Update an EVent', () => {
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

  it('should update the Event', async () => {
    const request = {
      body: {
        'authored-by': 'me',
        'has-rsvp': true,
        'rsvp-due-at-date': true,
        'rsvp-capacity-count': true,
        'rsvp-has-maybe-option': true,
        'rsvp-note-label': true,
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.updateEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should update the Event without rsvp params', async () => {
    const request = {
      body: {
        'authored-by': 'me',
        'has-rsvp': true,
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.updateEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      body: {},
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.updateEvent(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce(
      constants.promiseRejectResponse,
    );
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.promiseRejectResponse }),
    };

    const result = await content.updateEvent(request, response);
    expect(result).toEqual(constants.promiseRejectResponse);
  });
  it('should throw error Object if promise is rejected and response status get selected as 500', async () => {
    fileUploadService.processFileRequest.mockRejectedValueOnce({
      status: 'error',
      message: 'Async Error.',
    });
    const request = {
      body: {},
    };
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'Async Error.',
        }),
      }),
    };

    const result = await content.updateEvent(request, response);
    expect(result).toEqual({
      status: 'error',
      message: 'Async Error.',
    });
  });
});

// Test Search
describe('Search Content', () => {
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

  it('Should Search the Contents', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await content.search(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.search(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Upload a file on a site
describe('Test upload file on a site', () => {
  beforeEach(() => {
    fileUploadService.processFileRequestUpload = jest.spyOn(
      fileUploadService,
      'processFileRequestUpload',
    );
    fileUploadService.processFileRequestUpload.mockReturnValue(1);
  });
  afterEach(() => {
    fileUploadService.processFileRequestUpload.mockRestore();
  });
  it('should upload file on a site', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await content.uploadFileOnSite(request, response);
  });
  it('should throw error Object if promise is rejected', async () => {
    fileUploadService.processFileRequestUpload.mockRejectedValueOnce(
      constants.promiseRejectResponse,
    );
    const request = {};
    const response = {
      status: () => ({ send: () => constants.promiseRejectResponse }),
    };
    const result = await content.uploadFileOnSite(request, response);
    expect(result).toEqual(constants.promiseRejectResponse);
  });
});

// Test fetch video meta data
describe('Test fetch video meta data from a site', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makeGetRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makeGetRequest.mockReturnValue(constants.videoMetaDataResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makeGetRequest.mockRestore();

    res.mapingError.mockRestore();
  });

  it('Should fetch video meta data from a site', async () => {
    const request = {
      query: {
        directory: 'mydir',
      },
    };
    const response = {
      status: () => ({ send: () => constants.videoMetaDataResponse }),
    };

    const result = await content.fetchVideoMetadata(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.videoMetaDataResponse);
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await content.fetchVideoMetadata(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
