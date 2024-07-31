import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileDetails } from '../../types/types';

/**
 * @typedef {Object} ProfileStateType
 * @property {Profile[]} profilesName
 * @property {ProfileDetails[]} profilesDetails
 */

/** @type {ProfileStateType} */
const initialState = {
    profilesName: [],
    profilesDetails: []
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile[]>} action
         */
        setProfilesName: (state, action) => {
            state.profilesName = action.payload;
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<{ id: string, details: ProfileDetails }>} action
         */
        setProfileDetails: (state, action) => {
            const existingProfileIndex = state.profilesDetails.findIndex(profile => profile.id === action.payload.id);
            if (existingProfileIndex !== -1) {
                state.profilesDetails[existingProfileIndex] = action.payload.details;
            } else {
                state.profilesDetails.push(action.payload);
            }
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<ProfileDetails>} action
         */
        addProfile: (state, action) => {
            state.profilesDetails.push(action.payload);
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<ProfileDetails>} action
         */
        updateProfile: (state, action) => {
            const index = state.profilesDetails.findIndex(profile => profile.id === action.payload.id);
            if (index !== -1) {
                state.profilesDetails[index] = action.payload;
            }
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<string>} action
         */
        deleteProfile: (state, action) => {
            const index = state.profilesDetails.findIndex(profile => profile.id === action.payload);
            if (index !== -1) {
                state.profilesDetails.splice(index, 1);
            }
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<{ profileId: string, websiteId: string }>} action
         */
        deleteWebsiteFromProfile: (state, action) => {
            const profile = state.profilesDetails.find(profile => profile.id === action.payload.profileId);
            if (profile) {
                profile.listWebsites = profile.listWebsites.filter(website => website._id !== action.payload.websiteId);
            }
        },
    }
});

export const { setProfilesName, setProfileDetails, addProfile, updateProfile, deleteProfile, deleteWebsiteFromProfile} = profileSlice.actions;
export default profileSlice.reducer;
