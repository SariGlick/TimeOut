/**
 * @typedef {Object} Website
 * @property {string} id
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} VisitTime
 * @property {Date} visitDate
 * @property {number} activityTime
 */

/**
 * @typedef {Object} VisitedWebsite
 * @property {string|Website} website
 * @property {VisitTime[]} visitsTime
 */

/**
 * @typedef {Object} VisitedWebsites
 * @property {string} id
 * @property {VisitedWebsite[]} visitedWebsites
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [password]
 * @property {string} [googleId]
 * @property {(string|VisitedWebsite)[]} visitsWebsites
 * @property {string[]} profiles
 * @property {string[]} preferences
 * @property {string} [profileImage]
 */

/**
 * @typedef {Object} ListWebsite
 * @property {string|Website} websiteId
 * @property {'block' | 'open' | 'limit'} status
 * @property {number} limitedMinutes
 */

/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string|User} userId
 * @property {string} profileName
 * @property {'black list' | 'white list'} [statusBlockedSites]
 * @property {ListWebsite[]} listWebsites
 * @property {{start: Date, end: Date}} timeProfile
 */

/**
 * @typedef {Object} Preference
 * @property {string} id
 * @property {'never' | 'daily' | 'weekly' | 'monthly' | 'yearly'} emailFrequency
 * @property {number} sendNotificationTime
 * @property {string} [soundVoice]
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} [token]
 * @property {User} user
 */


/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * @type {import('react-redux').TypedUseSelectorHook<RootState>}
 */