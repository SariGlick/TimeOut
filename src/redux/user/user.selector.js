/**
 * @typedef {Object} RootState
 * @property {UserStateType} user
 */

/**
 * @typedef {Object} UserStateType
 * @property {User[]} users
 */

/**
 * @param {RootState} state
 * @returns {User[]}
 */
export const selectUser = (state) => state.user.users;
