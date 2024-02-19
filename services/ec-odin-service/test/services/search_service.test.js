/* eslint-disable camelcase */
/* eslint-disable no-undef */
const search_service = require('../../services/search_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test searchBySection

describe('searchBySection', () => {
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
  });
  it('should throw error if unable to search', async () => {
    const request = {
      query: 'Home',
    };
    const response = {
      status: () => ({
        send: () => constants.postRequestResponse,
      }),
    };
    const result = await search_service.searchBySection(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw error if unable to fetch Urn', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({
        send: () => constants.mapingErrorResponse,
      }),
    };
    const result = await search_service.searchBySection(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getAutocomplete

describe('getAutocomplete', () => {
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
  });
  it('throw err if unable to autocomplete', async () => {
    const request = {};
    const response = {
      status: () => ({
        send: () => constants.postRequestResponse,
      }),
    };
    const result = await search_service.getAutocomplete(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw error if unable to fetch urn', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: 'Home',
    };
    const response = {
      status: () => ({
        send: () => constants.mapingErrorResponse,
      }),
    };
    const result = await search_service.getAutocomplete(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test searchFeed

describe('searchFeed', () => {
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
  });
  it('throw error if unable to search ', async () => {
    const request = {
      query: {},
    };
    const response = {
      status: () => ({
        send: () => constants.getRequestResponse,
      }),
    };
    const result = await search_service.searchFeed(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.getRequestResponse);
  });
  it('should throw err if req.query is falsy value', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({
        send: () => constants.mapingErrorResponse,
      }),
    };
    const result = await search_service.searchFeed(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
