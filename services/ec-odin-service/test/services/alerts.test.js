/* eslint-disable no-undef */
const alert = require('../../services/alerts_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test Create Alert
describe('Test Create an Alert', () => {
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

  it('Should create an Alert', async () => {
    const request = {
      body: {
        'audience-id': '123',
        'audience-count': '234',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await alert.createAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('Should create an Alert without audience-param', async () => {
    const request = {
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await alert.createAlert(request, response);
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

    const result = await alert.createAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Get Alert
describe('Test Get an Alert', () => {
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

  it('Should Get the alert', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await alert.getAlert(request, response);
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

    const result = await alert.getAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Update an Alert
describe('Test Update an Alert', () => {
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

  it('Should Update the alert', async () => {
    const request = {
      query: {
        expire: '123',
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await alert.updateAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('Should Update the alert if expire has a falsy value', async () => {
    const request = {
      query: {
        expire: null,
      },
      params: {},
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await alert.updateAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN when expire has truthy value', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {
        expire: '123',
      },
      params: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await alert.updateAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw an error Object if unable to fetch URN and expire has a falsy value', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {
        expire: null,
      },
      params: {},
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await alert.updateAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Delete an Alert
describe('Test Delete an Alert', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);

    res.invalidParam = jest.spyOn(res, 'invalidParam');
    res.invalidParam.mockReturnValue(constants.invalidParamResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    res.mapingError.mockRestore();

    res.invalidParam.mockRestore();
  });

  it('Should Delete the alert', async () => {
    const request = {
      params: {
        alert_id: '1234',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };
    const result = await alert.deleteAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });

  it('should throw an error Object if request.body.param.alert_id is a falsy value', async () => {
    const request = {
      params: {
        alert_id: null,
      },
    };
    const response = {
      status: () => ({ send: () => constants.invalidParamResponse }),
    };

    const result = await alert.deleteAlert(request, response);
    expect(res.invalidParam).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.invalidParamResponse);
  });

  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {
        alert_id: '1234',
      },
    };
    const response = {
      status: () => ({ send: () => constants.invalidParamResponse }),
    };

    const result = await alert.deleteAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should throw an error Object if unable to fetch URN', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      params: {
        alert_id: '1234',
      },
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await alert.deleteAlert(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
