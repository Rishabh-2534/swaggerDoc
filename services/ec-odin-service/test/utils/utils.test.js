const jwt = require('jsonwebtoken');
const jsforce = require('jsforce');
const got = require('got');

const utils = require('../../utils/utils');
const response = require('../../utils/responses');
const constants = require('../services/constants');

jest.mock('jsonwebtoken', () => {
  const jsonwebtokenMethods = {
    sign: jest.fn(() => 'auth_Token'),
  };
  return jsonwebtokenMethods;
});

jest.mock('jsforce', () => {
  const jsforceMethods = {
    Connection: jest.fn(() => {}),
  };
  return jsforceMethods;
});

jest.mock('got', () => {
  const gotMethods = {
    post: jest.fn(() => ({
      body: {},
      status: 'SUCCESS',
      statusCode: 200,
    })),
    get: jest.fn(() => ({
      body: {},
      status: 'SUCCESS',
      statusCode: 200,
    })),
  };
  return gotMethods;
});

// Test getRedirectUri
describe('Test getRedirectUri', () => {
  it('should Prepare JWT Token and redirect to readme', () => {
    const accessToken = '123qwe';
    const name = 'myName';
    const email = 'myEmail@gmail.com';

    const result = utils.getRedirectUri(accessToken, name, email);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(result).toBe('https://developer.simpplr.com/?auth_token=auth_Token');
  });
});

// Test getSfConnection
describe('Test getSfConnection', () => {
  it('should return an Object of getSfConnection', () => {
    const instanceUrl = 'http://instanceUrl.com';
    const accessToken = '123qwe';

    const result = utils.getSfConnection(instanceUrl, accessToken);
    expect(jsforce.Connection).toHaveBeenCalledTimes(1);
    expect(result).toEqual({});
  });
});

// Test getParamName
describe('Test getParamName', () => {
  it('should convert hyphenated param names to camel case param names', () => {
    const param = 'camel-case';

    const result = utils.getParamName(param);
    expect(result).toBe('camelCase');
  });
  it('should return same value if the value is not hyphenated ', () => {
    const param = 'camelCase';

    const result = utils.getParamName(param);
    expect(result).toBe('camelCase');
  });
});

// Test makeReqBody
describe('Test makeReqBody', () => {
  it('should make request Body', () => {
    const body = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = utils.makeReqBody(body);
    expect(result).toEqual({
      myName: 'Simpplr',
      myLocation: 'Delhi',
    });
  });
  it('should return same object body if key value is not hyphenated', () => {
    const body = {
      myName: 'Simpplr',
      myLocation: 'Delhi',
    };

    const result = utils.makeReqBody(body);
    expect(result).toEqual({
      myName: 'Simpplr',
      myLocation: 'Delhi',
    });
  });
  it('should return same object body if key value is not hyphenated', () => {
    const body = {
      'my-name': 'Simpplr',
      'my-location': {
        'country-name': 'india',
      },
    };

    const result = utils.makeReqBody(body);
    expect(result).toEqual({
      myName: 'Simpplr',
      myLocation: {
        countryName: 'india',
      },
    });
  });
});

// Test makeQueryString
describe('Test makeQueryString', () => {
  it('should make Query String Body', () => {
    const body = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = utils.makeQueryString(body);
    expect(result).toBe('&myName=Simpplr&myLocation=Delhi');
  });
  it('should make Query String Body when send simple string value', () => {
    const body = 'Simpplr';

    const result = utils.makeQueryString(body);
    expect(result).toBe('&0=S&1=i&2=m&3=p&4=p&5=l&6=r');
  });
});

// Test makePost Request
describe('Test makePost Request', () => {
  beforeEach(() => {
    response.getResponseObj = jest.spyOn(response, 'getResponseObj');
    response.getResponseObj.mockReturnValue({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  afterEach(() => {
    response.getResponseObj.mockRestore();
  });
  it('should make a Post request to SF when req.body is an Object', async () => {
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const reqBody = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = await utils.makePostRequest(url, accessToken, reqBody);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  it('should make a Post request to SF when req.body is a string', async () => {
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const reqBody = 'Simpplr';

    const result = await utils.makePostRequest(url, accessToken, reqBody);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  it('should make a Post request to SF when req.body is an Object and usejsonHeader is truthy Value', async () => {
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const reqBody = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = await utils.makePostRequest(url, accessToken, reqBody, 1);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  it('should throw an error Object when promise get Rejected', async () => {
    got.post.mockRejectedValueOnce({ msg: 'error' });
    response.getResponseObj.mockReturnValueOnce({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const reqBody = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = await utils.makePostRequest(url, accessToken, reqBody);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  });
});

// Test makeGetRequest
describe('Test makeGetRequest', () => {
  beforeEach(() => {
    response.getResponseObj = jest.spyOn(response, 'getResponseObj');
    response.getResponseObj.mockReturnValue({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  afterEach(() => {
    response.getResponseObj.mockRestore();
  });
  it('should make a get Request to SF when send a Query', async () => {
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const query = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = await utils.makeGetRequest(url, accessToken, query);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 200,
      status: 'success',
      message: response,
      data: {},
    });
  });
  it('should throw an error Object when promise get Rejected', async () => {
    got.get.mockRejectedValueOnce({ msg: 'error' });
    response.getResponseObj.mockReturnValueOnce({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
    const url = 'http://url.com';
    const accessToken = '123qwe';
    const query = {
      'my-name': 'Simpplr',
      'my-location': 'Delhi',
    };

    const result = await utils.makeGetRequest(url, accessToken, query);
    expect(response.getResponseObj).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      statusCode: 500,
      status: 'error',
      message: 'Something went wrong.',
    });
  });
});

// Test getRequestUrn
describe('Test getRequestUrn', () => {
  it('should return request URN', () => {
    const result = utils.getRequestUrn('alerts', 'create');
    expect(result).toBe('/DataServerRW?target=AlertDataServer&action=create');
  });
  it('should return null if URN for resource does not present', () => {
    const result = utils.getRequestUrn('alert', 'create');
    expect(result).toBe(null);
  });
});

// Test getMatching
describe('Test getMatching', () => {
  it('should return matches', () => {
    const result = utils.getMatching('THE Quick', /[A-Z]/g);
    expect(result).toBe('H');
  });
  it('should return null when length less than 1', () => {
    const result = utils.getMatching('The quick', /[A-Z]/g);
    expect(result).toBe(null);
  });
});

// Test getBoundary
describe('Test getBoundary', () => {
  it('should throw null when "Boundary=" is not present in array', () => {
    const contentTypeArray = ['Simpplr', 'SimpplrGurugram'];
    const result = utils.getBoundary(contentTypeArray);
    expect(result).toBe(null);
  });
  it('should get Boundary', () => {
    const contentTypeArray = ['Simpplr', 'boundary=SimpplrGurugram'];
    const result = utils.getBoundary(contentTypeArray);
    expect(result).toBe('SimpplrGurugram');
  });
});

// Test parseBoundaryData
describe('Test parseBoundary Data', () => {
  beforeEach(() => {
    response.endRequestWithError = jest.spyOn(response, 'endRequestWithError');
    response.endRequestWithError.mockReturnValue(1);
  });
  afterEach(() => {
    response.endRequestWithError.mockRestore();
  });

  it('should throw an error object if content-type is not multipart', () => {
    const request = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = '';
    const maxLength = 255;
    const cb = () => 0;
    utils.parseBoundaryData(request, res, maxLength, cb);
    expect(response.endRequestWithError).toHaveBeenCalledTimes(1);
  });
  it('should throw an error object if content-type is a falsy value', () => {
    const request = {
      headers: {
        'content-type': ';;',
      },
    };
    const res = '';
    const maxLength = 255;
    const cb = () => 0;
    utils.parseBoundaryData(request, res, maxLength, cb);
    expect(response.endRequestWithError).toHaveBeenCalledTimes(1);
  });
  it('should throw an error object if boundary is a falsy value', () => {
    const request = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      setEncoding: () => {},
      on: (a, b) => b(),
    };
    const res = '';
    const maxLength = 255;
    const cb = () => 0;
    utils.parseBoundaryData(request, res, maxLength, cb);
    expect(response.endRequestWithError).toHaveBeenCalledTimes(1);
  });
  // it('should parse Boundary Data', () => {
  //   const request = {
  //     headers: {
  //       'content-type': 'boundary=multipart/form-data',
  //     },
  //     setEncoding: () => {},
  //     on: (a, b) => {
  //       return b(
  //         'name="SimpplrGurugram"multipart/form-datatruemultipart/form-datafilename=
  //         "AGAJ&HW[ Uy7o#"\r\nContent-Type: image/jpeg\r\nnÿØÿàJFIFÿÛC\r\n--',
  //       );
  //     },
  //   };
  //   const res = '';
  //   const maxLength = 255;
  //   cb = (err) => {
  //     return;
  //   };
  //   const result = utils.parseBoundaryData(request, res, maxLength, cb);
  // });
});

// Test validRequest
describe('Test validRequest', () => {
  beforeEach(() => {
    response.invalidParam = jest.spyOn(response, 'invalidParam');
    response.invalidParam.mockReturnValue({
      statusCode: 401,
      status: 'error',
      message: 'Please input a valid Request.',
    });
  });

  afterEach(() => {
    response.invalidParam.mockRestore();
  });
  it('should return inavlid error object when validate function returns error', () => {
    const request = {
      body: {},
    };
    const schema = {
      validate: () => ({
        error: {
          details: [
            {
              message: 'abc',
            },
          ],
        },
      }),
    };
    const responses = {};
    const next = () => {};
    const result = utils.validateRequest(request, responses, next, schema);
    expect(result).toStrictEqual({
      statusCode: 401,
      status: 'error',
      message: 'Please input a valid Request.',
    });
  });
  it('should test valid request when request.body is truthy value', () => {
    const request = {
      body: {},
    };
    const schema = {
      validate: () => ({ value: {} }),
    };
    const responses = {};
    const next = () => {};
    utils.validateRequest(request, responses, next, schema);
  });
  it('should test valid request when request.body is fasly value', () => {
    const request = {};
    const schema = {
      validate: () => ({ value: {} }),
    };
    const responses = {};
    const next = () => {};
    utils.validateRequest(request, responses, next, schema, 0);
  });
});

// Test makeReqBodyForListOfPeople
describe('Test makeReqBodyForListOfPeople', () => {
  it('should Prepare request body of list-of-people', () => {
    const body = ['Simpplr'];

    const result = utils.makeReqBodyForListOfPeople(body);
    expect(result).toStrictEqual([{ peopleId: 'Simpplr' }]);
  });
});

// Test makereqBodyForListOfConditions
describe('Test makereqBodyForListOfConditions', () => {
  it('should Prepare request body of list-of-conditions', () => {
    const body = ['Simpplr'];

    const result = utils.makereqBodyForListOfConditions(body);
    expect(result).toStrictEqual([{ name: 'Simpplr' }]);
  });
});

// Test makeReqBodyForAudience
describe('Test makeReqBodyForAudience', () => {
  it('Should make makereqBodyForListOfConditions when type is "people"', () => {
    const request = {
      body: {
        type: 'people',
        'list-of-people': ['Simpplr'],
      },
    };
    utils.makeReqBodyForAudience(request);
  });
  it('Should make makereqBodyForListOfConditions when type is "conditions"', () => {
    const request = {
      body: {
        city: ['Bengaluru', 'Delhi'],
        company: ['Simpplr Software India Private Limited'],
        country: ['india', 'US'],
        department: ['Product Management'],
        division: ['Sales Development'],
        name: 'Saurya audience 1',
        title: ['Associate Software Engineer'],
        state: ['MA'],
        'hire-date': '2021-03-12',
        'hire-date-filter': 'hireDateAfter',
      },
    };
    utils.makeReqBodyForAudience(request);
  });
});

// Test addVideoToCategory
describe('Test addVideoToCategory', () => {
  it('should add video to category', async () => {
    const request = {};
    const result = await utils.addVideoToCategory(request, 'site1234', {}, {});
    expect(result).toEqual(constants.gotResponse);
  });

  it('should fail to add video to category, if mandatory param is missing', async () => {
    const request = {};
    const result = await utils.addVideoToCategory(request, null, {});
    expect(result).toEqual(null);
  });
});
