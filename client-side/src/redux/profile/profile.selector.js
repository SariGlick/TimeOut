/**
 * @param {RootState} state 
 * @returns {Profile[]} 
 */
export const selectProfile = (state) => state.profile.profiles;
/**
 * @param {RootState} state 
 * @returns {Profile | null} 
 */
export const selectSelectedProfile = (state) => state.profile.selectedProfile;

