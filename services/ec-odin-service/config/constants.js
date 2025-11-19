const constants = {
  urn_dict: {
    sites: {
      getById: '/DataServerRW?target=SiteDataServer&action=getsiteDetailData',
      search: '/DataServerRW?target=SiteDataServer&action=search',
      searchMysite: '/DataServerRW?target=SiteDataServer&action=search&Mysite',
      create: '/DataServerRW?target=SiteDataServer&action=createSite',
      addMember:
        '/DataServerRW?target=ManageSiteDataServer&action=addPeople&membershipType=member&addMember',
      removeMember:
        '/DataServerRW?target=ManageSiteDataServer&action=removePeople&membershipType=member&removeMember',
      addFollower:
        '/DataServerRW?target=ManageSiteDataServer&action=addPeople&membershipType=follower&addFollower',
      removeFollower:
        '/DataServerRW?target=ManageSiteDataServer&action=removePeople&membershipType=follower&removeFollower',
      update:
        '/DataServerRW?target=ManageSiteDataServer&action=saveSiteDetail&edit=SiteDetails',
      activate: '/DataServerRW?target=SiteDataServer&action=setActivated',
      getFilesBySiteId: '/DataServerRW?target=FileDataServer&action=search',
    },
    people: {
      default: '/DataServerRW?target=peopledataserver&action=search',
      getByDepartment:
        '/DataServerRW?target=peopledataserver&action=search&Department',
      getByLocation:
        '/DataServerRW?target=peopledataserver&action=search&Location',
      getByExpertise:
        '/DataServerRW?target=peopledataserver&action=search&Expertise',
      getById: '/DataServerRW?target=peopledataserver&action=getUser',
      updatePeopleSettings:
        '/DataServerRW?target=MySettingDataServer&action=saveProfileSettings',
    },
    blog: {
      getById: '/DataServerRW?target=ProfileAddBlogPostDataServer&action=get',
      createBlog:
        '/DataServerRW?target=ProfileAddBlogPostDataServer&action=publish',
      update: '/DataServerRW?target=ProfileAddBlogPostDataServer&action=update',
      delete:
        '/DataServerRW?target=AllContentDataServer&action=delete&type=Blog',
    },
    search: {
      getBySite:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=Site',
      getByTop:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=Top',
      getByFile:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=File',
      getByUser:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=User',
      getByContent:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=Content',
      getByCrmFile:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=CrmFile',
      getByServiceNow:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=ServiceNow',
      getByGoogleDriveFile:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=GoogleDriveFile',
      autocomplete:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalAutoComplete',
      feed: '/DataServerRW?target=FeedDataServer&action=search',
      getByOneDriveFile:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=OneDriveFile',
      getBySharepoint:
        '/DataServerRW?target=ExternalSearchDataServer&action=externalSearch&searchForType=SharePointFile',
      getByConfluence:
        '/DataServerRW?target=AtlassianDataServer&action=searchConfluence&searchForType=Confluence',
    },
    alerts: {
      create: '/DataServerRW?target=AlertDataServer&action=create',
      get: '/DataServerRW?target=AlertDataServer&action=searchAlert',
      update: '/DataServerRW?target=AlertDataServer&action=update',
      expire: '/DataServerRW?target=AlertDataServer&action=expireNow',
      delete: '/DataServerRW?target=AlertDataServer&action=delete',
    },
    contents: {
      getPageById: '/DataServerRW?target=SiteAddPageDataServer&action=get',
      getPageCategories:
        '/DataServerRW?target=CategoryDataServer&action=search',
      getEventById: '/DataServerRW?target=SiteAddEventDataServer&action=get',
      createEvent: '/DataServerRW?target=SiteAddEventDataServer&action=publish',
      createPage: '/DataServerRW?target=SiteAddPageDataServer&action=publish',
      updateEvent: '/DataServerRW?target=SiteAddEventDataServer&action=update',
      updatePage: '/DataServerRW?target=SiteAddPageDataServer&action=update',
      search: '/DataServerRW?target=AllContentDataServer&action=search',
      deleteContent: '/DataServerRW?target=AllContentDataServer&action=delete',
      deleteEvent:
        '/DataServerRW?target=AllContentDataServer&action=delete&type=Event',
      getMustRead:
        '/DataServerRW?target=FeedDataServer&action=getMustReadContent',
      getAllEvents: '/DataServerRO?target=EventDataServer&action=search',
      createAlbum: '/DataServerRW?target=SiteAddAlbumDataServer&action=publish',
      updateAlbum: '/DataServerRW?target=SiteAddAlbumDataServer&action=update',
      saveAlbumDraft:
        '/DataServerRW?target=SiteAddAlbumDataServer&action=saveDraft',
      deleteImagesFromAlbum:
        '/DataServerRW?target=FileDataServer&action=deleteFile',
      approveContent: '/DataServerRW?target=AllContentDataServer&',
      validate: '/DataServerRW?target=AllContentDataServer&action=setValid',
    },
    notifications: {
      search: '/DataServerRW?target=NotificationDataServer&action=search',
      markAsActioned:
        '/DataServerRW?target=NotificationDataServer&action=markAsActioned',
      create: '/DataServerRW?target=NotificationDataServer&action=create',
    },
    digitalDisplay: {
      home: '/DataServerRW?target=CarouselDataServer&action=get&Carousel=Home',
      site: '/DataServerRW?target=CarouselDataServer&action=get&Carousel=Site',
      segment:
        '/DataServerRW?target=CarouselDataServer&action=get&Carousel=Segment',
    },
    file: {
      upload: '/services/data/v50.0/sobjects/ContentVersion',
      get: '/services/data/v50.0/queryAll',
      addToAlbum: '/DataServerRW?target=SiteAddAlbumDataServer&action=addPhoto',
      submitMediaToAlbum:
        '/DataServerRW?target=SiteAddAlbumDataServer&action=submitMedia',
    },
    analytics: {
      getAdoptionData:
        '/DataServerRO?target=AnalyticsDataServer&action=getAdoptionData',
      getAdoptionAverage:
        '/DataServerRO?target=AnalyticsDataServer&action=getAdoptionAverage',
      getAppPageViews:
        '/DataServerRO?target=AnalyticsDataServer&action=getAppPageViews',
      getAppAdoption:
        '/DataServerRO?target=AnalyticsDataServer&action=getAppAdoption',
      getViewsList:
        '/DataServerRO?target=AnalyticsDataServer&action=getViewsList',
      getContentEngagement:
        '/DataServerRO?target=AnalyticsDataServer&action=getContentEngagement',
      getContentPublications:
        '/DataServerRO?target=AnalyticsDataServer&action=getContentPublications',
      getContentViewsByType:
        '/DataServerRO?target=AnalyticsDataServer&action=getContentViewsByType',
      getContentViewsList:
        '/DataServerRO?target=AnalyticsDataServer&action=getContentViewsList',
      getContentReferralSources:
        '/DataServerRO?target=AnalyticsDataServer&action=getContentReferralSources',
      getKnowledgePageStats:
        '/DataServerRO?target=AnalyticsDataServer&action=getKnowledgePageStats',
      getNewsletters:
        '/DataServerRO?target=AnalyticsDataServer&action=getNewsletters',
      getSocialEngagement:
        '/DataServerRO?target=AnalyticsDataServer&action=getEngagement',
      getSocialEngagementList:
        '/DataServerRO?target=AnalyticsDataServer&action=getEngagementList',
      getSocialCampaigns:
        '/DataServerRO?target=AnalyticsDataServer&action=getCampaigns',
      getSearches:
        '/DataServerRO?target=AnalyticsDataServer&action=getSearches',
      getSearchList:
        '/DataServerRO?target=AnalyticsDataServer&action=getSearchList',
      getPeopleOverview:
        '/DataServerRO?target=AnalyticsDataServer&action=getPeopleOverview',
      getPeoplePerformance:
        '/DataServerRO?target=AnalyticsDataServer&action=getPeoplePerformance',
      getPeopleProfileCompleteness:
        '/DataServerRO?target=AnalyticsDataServer&action=getPeopleProfileCompleteness',
      getSiteCounts:
        '/DataServerRO?target=AnalyticsDataServer&action=getSiteCounts',
      getLowActivitySites:
        '/DataServerRO?target=AnalyticsDataServer&action=getLowActivitySites',
      getSitePopularity:
        '/DataServerRO?target=AnalyticsDataServer&action=getSitePopularity',
      getSitePublications:
        '/DataServerRO?target=AnalyticsDataServer&action=getSitePublications',
    },
    audience: {
      addOrEditAudience: '/DataServerRW?target=AudienceDataServer&action=save',
      deleteAudience: '/DataServerRW?target=AudienceDataServer&action=delete',
      uploadAudience:
        'https://staging.api.simpplr.com/audience/manage-audience',
    },
    videos: {
      getAccessToken:
        '/DataServerRW?target=VideoDataServer&action=getAccessToken',
      addVideoToCategory:
        '/DataServerRW?target=VideoDataServer&action=addVideoToCategory',
      connectAPIInteraction:
        '/DataServerRW?target=ConnectAPIInteractionDataServer',
      fetchVideoMetaData: '/DataServerRW?target=FileDataServer&action=search',
    },
  },
  DEV_ENV_NAME: 'dev',
  README_JWT_SECRET: 'e9cVmihDpizxtTEHBdSC',
  README_URL: 'https://dev-simpplr.readme.io/',
  APPLICATION_JSON: 'application/json',
  ALLOWED_VIDEO_FORMATS: ['mp4', 'mov', 'wmv', 'flv', 'avi', 'mkv', 'webm'],
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
  MULTIPART_FORMDATA: 'multipart/form-data',
  VIDEO_PROVIDER: 'native_video',
  MAX_LIMIT_FILE_UPLOAD: '40000000',
  CAROUSEL_TYPE_LIST: ['Home', 'Site', 'Segment'],
  FILE_UPLOAD_CONSTANT: 'A0F29C47EA374DF79BDB3A280F1B7D5C',
  KALTURA_PLAYER_URL_CONFIG: { autoplay: false, startTime: 0 },
  KALTURA_VIDEO_CHUNK_SIZE: 2 * (1024 * 1024),
  CONTENT_APPROVAL_ACTIONS: ['publish', 'unpublish'],
  CONTENT_APPROVAL_QUERY:
    "Select id, content__c, Sub_Type__c, status__c, Object_Type__c, Sent_By__r.External_Photo_URL__c, Sent_By__r.External_Photo_URL_Expiry_Date__c, category__c, Submitter_Comment__c, Simpplr_Site__c, Sent_By__r.Full_Name__c, Sent_By__c, Sent_to__c, Object_Id__c, Is_Read__c, Is_New__c, CreatedDate, Simpplr_Site__r.name, Action_By__c FROM App_Notification__c WHERE sub_type__c != 'Must Read' AND Category__c IN ('Page_Submitted_For_Moderation','Event_Submitted_For_Moderation','Album_Submitted_For_Moderation') AND is_Deleted__c = false AND Category__c != 'Private_Site_Membership_Requests' AND (Simpplr_Site__c = null OR (Simpplr_Site__r.is_active__c = true AND Simpplr_Site__r.Show_In_Simpplr__c = true)) AND type__c='Actionable' AND Action_By__c=null And Sent_By__r.User__r.isActive = true ORDER BY CreatedDate desc",
  GET_JWT_TOKEN: '/DataServerRO?target=UtilityDataServer&action=getJWTToken',
  GET_USER_INFO: '/DataServerRW?target=UtilityDataServer&action=getAppConfig',
  IP_LIMIT: 20,
  API_TIME_LIMIT: 60,
  SKIP_PATHS: ['/ping', '/health', '/startUpProbe', '/livenessProbe'],
};

module.exports = constants;
