/**
 * @typedef {Object} RootState
 * @property {PreferenceStateType} preference
 */

/**
 * @typedef {Object} PreferenceStateType
 * @property {Preference[]} preferences
 */

/**
 * Selects the preferences array from the state.
 * 
 * @param {RootState} state - The current Redux state.
 * @returns {Preference[]} The array of preferences.
 */
export const selectPreference = (state) => state.preference.preferences;
