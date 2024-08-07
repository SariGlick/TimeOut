import { createSlice } from '@reduxjs/toolkit';
/**
 * @typedef {Object} ProfileStateType
 * @property {Profile[]} profiles
 */

/** @type {ProfileStateType} */
const initialState = {
    profiles: []
};
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile[]>} action
         */
        setProfiles: (state, action) => {
            state.profiles = action.payload;
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile>} action
         */
        addProfile: (state, action) => {
            state.profiles.push(action.payload);
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile>} action
         */
        updateProfile: (state, action) => {
            const updatedProfile = action.payload;
            state.profiles = state.profiles.map(profile =>
                profile._id === updatedProfile._id ? updatedProfile : profile
            );
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<string>} action
         */
        deleteProfile: (state, action) => {
            state.profiles = state.profiles.filter(profile => profile._id !== action.payload);
        }
    }
});

export const { setProfiles, addProfile, updateProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
