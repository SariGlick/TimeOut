/**
 * @typedef {Object} RootState
 * @property {AuthStateType} auth
 */

/**
 * @typedef {Object} AuthStateType
 * @property {AuthUser | null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isInitialized
 */

/**
 * @param {RootState} state
 * @returns {AuthStateType}
 */
export const selectAuth = (state) => state.auth;
