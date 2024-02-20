const analytics = require('../../services/analytics_service');
const utils = require('../../utils/utils');
const res = require('../../utils/responses');
const constants = require('./constants');

// Test getAdoptionData
describe('Test get adoption data', () => {
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

  it('should get adoption data', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getAdoptionData(request, response);
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

    const result = await analytics.getAdoptionData(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getAdoptionAverage
describe('Test get adoption average', () => {
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

  it('should get adoption average', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getAdoptionAverage(request, response);
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

    const result = await analytics.getAdoptionAverage(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getAppPageViews
describe('Test get page views', () => {
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

  it('should get page views', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getAppPageViews(request, response);
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

    const result = await analytics.getAppPageViews(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test get app adoption
describe('Test get app adoption', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    utils.checkResultTypeParamValue = jest.spyOn(
      utils,
      'checkResultTypeParamValue',
    );
    utils.checkResultTypeParamValue.mockReturnValue(0);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    utils.checkResultTypeParamValue.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should get app adoption', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getAppAdoption(request, response);
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

    const result = await analytics.getAppAdoption(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should return the exact obj when checkResultTypeParamValue return truthy value', async () => {
    utils.checkResultTypeParamValue.mockReturnValueOnce(1);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await analytics.getAppAdoption(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(1);
  });
});

// Test get views list
describe('Test get views list', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    utils.checkResultTypeParamValue = jest.spyOn(
      utils,
      'checkResultTypeParamValue',
    );
    utils.checkResultTypeParamValue.mockReturnValue(0);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    utils.checkResultTypeParamValue.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should get views list', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getViewsList(request, response);
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

    const result = await analytics.getViewsList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should return the exact obj when checkResultTypeParamValue return truthy value', async () => {
    utils.checkResultTypeParamValue.mockReturnValueOnce(1);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await analytics.getViewsList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(1);
  });
});

// Test getContentEngagement
describe('Test get content engagement', () => {
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

  it('should get content engagement', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getContentEngagement(request, response);
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

    const result = await analytics.getContentEngagement(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getContentPublications
describe('Test get content publications', () => {
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

  it('should get content publications', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getContentPublications(request, response);
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

    const result = await analytics.getContentPublications(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getContentViewsByType
describe('Test get content views by type', () => {
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

  it('should get content views by type', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getContentViewsByType(request, response);
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

    const result = await analytics.getContentViewsByType(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getContentViewsList
describe('Test get content views list', () => {
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

  it('should get content views list', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getContentViewsList(request, response);
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

    const result = await analytics.getContentViewsList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getContentReferralSources
describe('Test get content referral sources', () => {
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

  it('should get content referral sources', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getContentReferralSources(request, response);
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

    const result = await analytics.getContentReferralSources(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getKnowledgePageStats
describe('Test get knowledge page stats', () => {
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

  it('should get knowledge page stats', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getKnowledgePageStats(request, response);
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

    const result = await analytics.getKnowledgePageStats(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// Test getNewsletters
describe('Test get news letters', () => {
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

  it('should get news letters', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getNewsletters(request, response);
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

    const result = await analytics.getNewsletters(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Social Engagement
describe('Test get Social Engagement', () => {
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

  it('should get Social Engagement', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSocialEngagement(request, response);
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

    const result = await analytics.getSocialEngagement(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Social Engagement list
describe('Test get Social Engagement list', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    utils.checkResultTypeParamValue = jest.spyOn(
      utils,
      'checkResultTypeParamValue',
    );
    utils.checkResultTypeParamValue.mockReturnValue(0);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    utils.checkResultTypeParamValue.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should get Social Engagement list', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSocialEngagementList(request, response);
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

    const result = await analytics.getSocialEngagementList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should return the exact obj when checkResultTypeParamValue return truthy value', async () => {
    utils.checkResultTypeParamValue.mockReturnValueOnce(1);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await analytics.getSocialEngagementList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(1);
  });
});

// get Social Campagins
describe('Test get Social Campagins', () => {
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

  it('should get Social Campagins', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getCampaigns(request, response);
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

    const result = await analytics.getCampaigns(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Searches
describe('Test get Searches', () => {
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

  it('should get Searches', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSearches(request, response);
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

    const result = await analytics.getSearches(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Searches list
describe('Test get Searches list', () => {
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

  it('should get Searches list', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSearchList(request, response);
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

    const result = await analytics.getSearchList(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Searches performed
describe('Test get Searches performed', () => {
  beforeEach(() => {
    utils.getRequestUrn = jest.spyOn(utils, 'getRequestUrn');
    utils.getRequestUrn.mockReturnValue(1);

    utils.makePostRequest = jest.spyOn(utils, 'makePostRequest');
    utils.makePostRequest.mockReturnValue(constants.postRequestResponse);

    utils.checkResultTypeParamValue = jest.spyOn(
      utils,
      'checkResultTypeParamValue',
    );
    utils.checkResultTypeParamValue.mockReturnValue(0);

    res.mapingError = jest.spyOn(res, 'mapingError');
    res.mapingError.mockReturnValue(constants.mapingErrorResponse);
  });
  afterEach(() => {
    utils.getRequestUrn.mockRestore();

    utils.makePostRequest.mockRestore();

    utils.checkResultTypeParamValue.mockRestore();

    res.mapingError.mockRestore();
  });

  it('should get Searches performed', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSearchesPerfomed(request, response);
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

    const result = await analytics.getSearchesPerfomed(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
  it('should return the exact obj when checkResultTypeParamValue return truthy value', async () => {
    utils.checkResultTypeParamValue.mockReturnValueOnce(1);
    const request = {};
    const response = {
      status: () => ({ send: () => constants.mapingErrorResponse }),
    };

    const result = await analytics.getSearchesPerfomed(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(1);
  });
});

// get People Overview
describe('Test get People Overview', () => {
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

  it('should get People Overview', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getPeopleOverview(request, response);
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

    const result = await analytics.getPeopleOverview(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get People Performance
describe('Test get People Performance', () => {
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

  it('should get People Performance', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getPeoplePerformance(request, response);
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

    const result = await analytics.getPeoplePerformance(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get People Profile Completeness
describe('Test People Profile Completeness', () => {
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

  it('should People Profile Completeness', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getPeopleProfileCompleteness(
      request,
      response,
    );
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

    const result = await analytics.getPeopleProfileCompleteness(
      request,
      response,
    );
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get site count
describe('Test get site count', () => {
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

  it('should get site count', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSiteCounts(request, response);
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

    const result = await analytics.getSiteCounts(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Low Activity Sites
describe('Test get Low Activity Sites', () => {
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

  it('should get Low Activity Sites', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getLowActivitySites(request, response);
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

    const result = await analytics.getLowActivitySites(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Site Popularity
describe('Test get Site Popularity', () => {
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

  it('should get Site Popularity', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSitePopularity(request, response);
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

    const result = await analytics.getSitePopularity(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});

// get Site Publications
describe('Test get Site Publications', () => {
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

  it('should get Site Publications', async () => {
    const request = {};
    const response = {
      status: () => ({ send: () => constants.postRequestResponse }),
    };

    const result = await analytics.getSitePublications(request, response);
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

    const result = await analytics.getSitePublications(request, response);
    expect(utils.getRequestUrn).toHaveBeenCalledTimes(1);
    expect(res.mapingError).toHaveBeenCalledTimes(1);
    expect(result).toEqual(constants.mapingErrorResponse);
  });
});
