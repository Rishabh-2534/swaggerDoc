const utils = require('../../utils/utils');
const people = require('../../services/people_service');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test Get People
describe('Test Get People', () => {
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

  it('should get People without search param', async () => {
    const request = {
      query: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN when search-param is falsy value', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {},
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should get People when search-param is PeopleID', async () => {
    const request = {
      query: {
        'search-param': 'PeopleID',
        'people-id': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw error Object when search-param is peopleID but people-id is a falsy value', async () => {
    const request = {
      query: {
        'search-param': 'PeopleID',
      },
    };
    const response = {
      status: () => ({ send: () => constants.invalidParamResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(res.invalidParam).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.invalidParamResponse);
  });
  it('should throw an error Object if unable to fetch URN when search-param is PeopleID', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {
        'search-param': 'PeopleID',
        'people-id': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should get People when search-param is SfUserID', async () => {
    const request = {
      query: {
        'search-param': 'SfUserID',
        'sf-user-id': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw error when search-param is SfUserID but sf-user-id is a falsy value', async () => {
    const request = {
      query: {
        'search-param': 'SfUserID',
      },
    };
    const response = {
      status: () => ({ send: () => constants.invalidParamResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(res.invalidParam).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.invalidParamResponse);
  });
  it('should throw an error Object if unable to fetch URN when search-param is SfUserID', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {
        'search-param': 'SfUserID',
        'sf-user-id': '123',
      },
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should get People when search-param is a value from ValidSearchParam', async () => {
    const request = {
      query: {
        'search-param': 'Department',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should get People when search-param is a truthy value but not present in ValidSearchParam', async () => {
    const request = {
      query: {
        'search-param': 'people',
      },
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.postRequestResponse);
  });
  it('should throw an error Object if unable to fetch URN when search-param is a value from ValidSearchParam', async () => {
    utils.getRequestUrn.mockReturnValueOnce(null);
    const request = {
      query: {
        'search-param': 'Department',
      },
    };
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await people.getPeople(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test Update People Setting
describe('Test People Update Setting', () => {
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

  it('should update people setting', async () => {
    const request = {
      params: {},
      body: {},
    };
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await people.updatePeopleSettings(request, response);
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

    const result = await people.updatePeopleSettings(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
