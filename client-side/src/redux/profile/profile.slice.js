import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    profiles: []
};
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfiles: (state, action) => {
            state.profiles = action.payload;
        },
        addProfile: (state, action) => {
            state.profiles.push(action.payload);
        },
        updateProfile: (state, action) => {
            const index = state.profiles.findIndex(profile => profile._id === action.payload._id);
            if (index !== -1) {
                state.profiles[index] = action.payload;
            }
        },
        deleteProfile: (state, action) => {
            const index = state.profiles.findIndex(profile => profile._id === action.payload);
            if (index !== -1) {
                state.profiles.splice(index, 1);
            }
        },
        deleteWebsiteFromProfile: (state, action) => {
            const profile = state.profiles.find(profile => profile.id === action.payload.profileId);
            if (profile) {
                profile.listWebsites = profile.listWebsites.filter(website => website._id !== action.payload.websiteId);
            }
        },
    }
});
export const { setProfiles, addProfile, updateProfile, deleteProfile,deleteWebsiteFromProfile} = profileSlice.actions;
export default profileSlice.reducer;