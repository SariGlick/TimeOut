/**
 * @typedef {Object} RootState
 * @property {PreferenceStateType} preference
 */

/**
 * Selects the preferences array from the state.
 * 
 * @param {RootState} state - The current Redux state.
 * @returns {Preference| null} The array of preferences.
 */
export const selectPreference = (state) => state.preference.preference;
