/**
 * @typedef {Object} ProfileStateType
 * @property {Profile[]} profilesName
 * @property {ProfileDetails[]} profilesDetails
 */

/**
 * @typedef {Object} RootState
 * @property {ProfileStateType} profile
 */

/**
 * @param {RootState} state
 * @returns {Profile[]}
 */
export const selectProfilesName = (state) => state.profile.profilesName;

/**
 * @param {RootState} state
 * @param {string} profileId
 * @returns {ProfileDetails | null}
 */
export const selectProfileDetails = (state, profileId) => {
    const profile = state.profile.profilesDetails.find(profile => profile.id === profileId);
    return profile ? profile.details : null;
};



