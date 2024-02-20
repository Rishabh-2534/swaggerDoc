/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const notification = require('../../services/notification_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test Search
describe('Test Search', () => {
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
  it('should return search response', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await notification.search(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error when urn is falsy value ', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };
    const result = await notification.search(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Create
describe('Test Create', () => {
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
  it('should return create response', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await notification.create(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error when urn is falsy value ', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };
    const result = await notification.create(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test markAsActioned
describe('Test markAsActioned', () => {
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
  it('should return markAsActioned response', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await notification.markAsActioned(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error when urn is falsy value ', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };
    const result = await notification.markAsActioned(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
