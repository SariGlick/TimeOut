const typeDefs = `
  type Websites {
    name: String
    url: String
  }
    
    type VisitsTime {
    visitDate: String
    activityTime: String
  }

  type VisitedWebsites {
    websiteId: Websites
    visitsTime: [VisitsTime]
  }
        
   type LimitedTimes {
    start: String
    end: String
  }

     type LimitedWebsite {
    websiteId: Websites
    status: String
    limitedTimes: [LimitedTimes]
  }

  type Profiles {
    profileName: String
    blockedSites: [Websites]
    limitedWebsites: [LimitedWebsite]
  }
  type Preference{
    emailFrequency: String  
    sendNotificationTime: Int
    soundVoice: String
    }

     type Users {
    name: String
    email: String
    password: String
    googleId: String
    visitsWebsites: [VisitedWebsites]
    profiles: [Profiles]
    preferences: [Preference]
    profileImage: String
  }

  type Query {
    websites: [Websites]
    users: [Users]
    userByEmail(email: String!): Users
    profile: [Profiles]
    visitedWebsites: [VisitedWebsites]
    preferences: [Preference]
  }
`;

export default typeDefs;

