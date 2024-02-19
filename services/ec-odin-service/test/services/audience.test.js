const audience = require('../../services/audience_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test add audience
describe('Test add audience', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);

    utils.makeReqBodyForAudience = jest.spyOn(utils, 'makeReqBodyForAudience');
    utils.makeReqBodyForAudience.mockReturnValue(1);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();

    utils.makeReqBodyForAudience.mockRestore();
  });

  it('Should add audience', async () => {
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await audience.addOrEditAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('Should add audience when hire-date and hire-date-filter are truthy value', async () => {
    const request = {
      body: {
        'hire-date': '2018-05-01',
        'hire-date-filter': 'hireDateBefore',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await audience.addOrEditAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('Should throw error if hire-date is truthy value but hire-date-filter if falsy value', async () => {
    const request = {
      body: {
        'hire-date': '2018-05-01',
      },
    };
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'hire-date-filter is required',
        }),
      }),
    };

    const result = await audience.addOrEditAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'hire-date-filter is required',
    });
  });
  it('Should throw error if list-of-people is a falsy value', async () => {
    const request = {
      body: {
        type: 'people',
      },
    };
    const response = {
      status: () => ({
        send: () => ({
          status: 'error',
          message: 'list-of-people is required when type is people',
        }),
      }),
    };

    const result = await audience.addOrEditAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'error',
      message: 'list-of-people is required when type is people',
    });
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await audience.addOrEditAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

//Test deleteAudience

describe('Test delete audience', () => {
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

  it('should delete audience ', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await audience.deleteAudience(request, response);
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

    const result = await audience.deleteAudience(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
