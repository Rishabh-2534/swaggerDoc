/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const digitalDisplay_service = require('../../services/digitalDisplay_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test carousel
describe('Test carousel', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.invalidParam = jest.spyOn(res, 'invalidParam');
    res.invalidParam.mockReturnValue(constants.invalidParamResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.invalidParam.mockRestore();

    res.mapingError.mockRestore();
  });
  it('should throw error if req.params.type is falsy value', async () => {
    const request = {
      params: {
        type: 'Home',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await digitalDisplay_service.carousel(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw error if urn is false', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {
        type: 'Home',
      },
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };
    const result = await digitalDisplay_service.carousel(request, response);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw error if req.params if false', async () => {
    const request = {
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.invalidParamResponse }),
    };
    const result = await digitalDisplay_service.carousel(request, response);
    expect(result).toEqual(constants.invalidParamResponse);
  });
});
