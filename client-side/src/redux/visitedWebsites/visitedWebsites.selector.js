import './types.js';
/**
 * @typedef {import('./types.js').RootState} RootState
 */

/**
 * @param {RootState} state
 * @returns {Profile[]}
 */
export const selectProfile = (state) => state.profile.profiles;
