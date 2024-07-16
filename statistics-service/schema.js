const typeDefs = `
  type Websites {
    name: String
    url: String
  }
     type Users {
    name: String
    email: String
    password: String
    googleId: String
    visitsWebsites: [String]
    profiles: [String]
    preferences: [String]
    profileImage: String
  }
   type LimitedTimes {
    start: String
    end: String
  }

  type LimitedWebsite {
    websiteId: String
    status: String
    limitedTimes: [LimitedTimes]
  }

  type Profiles {
    userId: String
    profileName: String
    blockedSites: [String]
    limitedWebsites: [LimitedWebsite]
  }

    type VisitsTime {
    visitDate: String
    activityTime: String
  }

  type VisitedWebsites {
    websitesId: [String]
    visitsTime: [VisitsTime]
  }

  type Preference{
  emailFrequency: String  
  sendNotificationTime: Int
  soundVoice: String
  }

  type Query {
    websites: [Websites]
    users: [Users]
    profile: [Profiles]
    visitedWebsites: [VisitedWebsites]
    preferences: [Preference]
  }
`;

export default typeDefs;

