/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const utils = require('../../utils/utils');
const fileUpload = require('../../services/fileUpload_service');
const constants = require('./constants');

// Test GetFile
describe('Test GetFile', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makeGetRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makeGetRequest.mockReturnValue(
      constants.getRequestResponseFileUpload,
    );
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makeGetRequest.mockRestore();
  });

  it('should get file data from SF', async () => {
    const fileUploadBaseUrl = 'http://baseUrl.com';
    const accessToken = '123qwe';
    const fileVersionId = '123Version';

    const result = await fileUpload.getFile(
      fileUploadBaseUrl,
      accessToken,
      fileVersionId,
    );
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      fileId: '123',
      fileVersionId: '123Version',
      size: 10,
      type: 'any',
      title: 'Data',
    });
  });
  it('Should return Not Found status message when file is not present in SF', async () => {
    utils.makeGetRequest.mockReturnValueOnce({
      status: 'Error',
      statusCode: '400',
      data: {},
      message: 'Data not found in SF',
      err: 'file Not Found',
    });
    const fileUploadBaseUrl = 'http://baseUrl.com';
    const accessToken = '123qwe';
    const fileVersionId = '123Version';

    const result = await fileUpload.getFile(
      fileUploadBaseUrl,
      accessToken,
      fileVersionId,
    );
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'Error',
      statusCode: '400',
      data: {},
      message: 'Data not found in SF',
      err: 'file Not Found',
    });
  });
});

// Test UploadFile
describe('Test Upload File', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makeGetRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makeGetRequest.mockReturnValue(
      constants.getRequestResponseFileUpload,
    );

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(
      constants.postRequestResponseFileUpload,
    );
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makeGetRequest.mockRestore();

    utils.makePostRequest.mockRestore();
  });
  it('Should upload File', async () => {
    const baseUrl = 'http://baseUrl.com/apex';
    const accessToken = '123qwe';
    const fileData = 'qwert345';

    const result = await fileUpload.uploadFile(baseUrl, accessToken, fileData);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(2);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      fileId: '123',
      fileVersionId: 123,
      size: 10,
      type: 'any',
      title: 'Data',
      err: undefined,
    });
  });
  it('Should return error Object when can not upload File to SF', async () => {
    utils.makePostRequest.mockReturnValueOnce({
      status: 'Fail',
      statusCode: 404,
      data: {},
      message: 'data not found',
      err: 'Upload File Error',
    });
    const baseUrl = 'http://baseUrl.com/apex';
    const accessToken = '123qwe';
    const fileData = 'qwert345';

    const result = await fileUpload.uploadFile(baseUrl, accessToken, fileData);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 'Fail',
      statusCode: 404,
      data: {},
      message: 'data not found',
      err: 'Upload File Error',
    });
  });
  it('Should return error Object when can not upload File to SF', async () => {
    utils.makeGetRequest.mockReturnValueOnce({
      status: 'Error',
      statusCode: '400',
      data: {},
      message: 'Data not found in SF',
      err: 'file Not Found',
    });
    const baseUrl = 'http://baseUrl.com/apex';
    const accessToken = '123qwe';
    const fileData = 'qwert345';

    const result = await fileUpload.uploadFile(baseUrl, accessToken, fileData);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(2);
    expect(utils.makePostRequest).toHaveBeenCalledTimes(1);
    expect(utils.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      fileId: undefined,
      fileVersionId: undefined,
      size: undefined,
      type: undefined,
      title: undefined,
      err: 'file Not Found',
    });
  });
});

// Test makeFileRequestParam
describe('Test makeFileRequestParam', () => {
  it('should makeFileRequestParam', async () => {
    const fileData = {
      size: 10,
      fileId: '12ab',
      title: 'Simpplr',
      type: 'Latest',
      fileVersionId: '2qwe',
    };
    const siteId = '13ert';

    const result = fileUpload.makeFileRequestParam(fileData, siteId);
    expect(result).toEqual({
      isImage: true,
      isAccessible: true,
      size: fileData.size,
      contentDocumentId: fileData.fileId,
      context: 'intranet',
      title: fileData.title,
      type: fileData.type,
      contentVersionId: fileData.fileVersionId,
      url: `/apex/FileDetail?siteId=${siteId}&fileId=${fileData.fileId}`,
      fileUrl: `/sfc/servlet.shepherd/version/Download/${fileData.fileVersionId}?asPdf=false&operationContext=CHATTER`,
    });
  });
});

// Test processFileElement
describe('Test processFileElement', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makeGetRequest = jest.spyOn(utils, 'makeGetRequest');
    utils.makeGetRequest.mockReturnValue(
      constants.getRequestResponseFileUpload,
    );

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(
      constants.postRequestResponseFileUpload,
    );
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makeGetRequest.mockRestore();

    utils.makePostRequest.mockRestore();
  });
  it('should process file element when file has a type "original-file" ', async () => {
    const request = {
      params: {
        site_Id: '123Id',
      },
      body: {},
      listOfFiles: [
        {
          filename: 'abc',
          fileContent: '123ertyu',
        },
      ],
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
      files: [
        { filename: 'abc', 'original-file': 'simpplr.jpg' },
        { filename: 'bcd', 'original-file': 'simpplrr.jpg' },
      ],
    };
    await fileUpload.processFileRequest(request);
  });
  it('should process file element when file has a type "landscape-file" ', async () => {
    const request = {
      params: {
        site_Id: '123Id',
      },
      body: {},
      listOfFiles: [
        {
          filename: 'abc',
          fileContent: '123ertyu',
        },
      ],
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
      files: [
        { filename: 'abc', 'original-file': 'simpplr.jpg' },
        { filename: 'bcd', 'landscape-file': 'simpplrr.jpg' },
      ],
    };
    await fileUpload.processFileRequest(request);
  });
  it('should reject the promise when file-array has one file', async () => {
    const request = {
      params: {
        site_Id: '123Id',
      },
      body: {},
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
      files: [{ filename: 'abc', 'original-file': 'simpplr.jpg' }],
    };
    await expect(fileUpload.processFileRequest(request)).rejects.toEqual({
      statusCode: 401,
      msg: 'Validation error: "original-file" & "landscape-file" are required',
      status: 'error',
    });
  });
  it('should throw an error object when site_id param is a falsy value and send as argument to makeFileRequestParam', async () => {
    const request = {
      body: {},
      listOfFiles: [
        {
          filename: 'abc',
          fileContent: '123ertyu',
        },
      ],
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
    };
    await expect(fileUpload.processFileRequest(request)).rejects.toEqual({
      statusCode: 500,
      msg: 'File upload error.',
      status: 'error',
    });
  });
  it('should thow an error object when list of file is a truthy value and upload file return error ', async () => {
    utils.makeGetRequest.mockReturnValueOnce({
      status: 'Error',
      statusCode: '400',
      data: {},
      message: 'Data not found in SF',
      err: 'file Not Found',
    });
    const request = {
      body: {},
      listOfFiles: [
        {
          filename: 'abc',
          fileContent: '123ertyu',
        },
      ],
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
    };
    await expect(fileUpload.processFileRequest(request)).rejects.toEqual({
      statusCode: 500,
      msg: 'File upload error.',
      status: 'error',
    });
  });
  it('should throw an error Object when files has truthy value and upload file return error  ', async () => {
    utils.makeGetRequest.mockReturnValueOnce({
      status: 'Error',
      statusCode: '400',
      data: {},
      message: 'Data not found in SF',
      err: 'file Not Found',
    });
    const request = {
      params: {
        site_Id: '123Id',
      },
      body: {},
      base_url: 'http://baseUrl.com/apex',
      access_token: '123qwe',
      files: [
        { filename: 'abc', 'original-file': 'simpplr.jpg' },
        { filename: 'bcd', 'landscape-file': 'simpplrr.jpg' },
      ],
    };
    await expect(fileUpload.processFileRequest(request)).rejects.toEqual({
      statusCode: 500,
      msg: 'File upload error.',
      status: 'error',
    });
  });
});
