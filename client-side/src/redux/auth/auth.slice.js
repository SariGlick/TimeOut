import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/types.js";

/**
 * @typedef {Object} AuthStateType
 * @property {AuthUser|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isInitialized
 */

/** @type {AuthStateType} */
const initialState = {
    user: {
        "_id": "66940b051ccb2852370d5a17",
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "password": "securePassword123",
        "visitsWebsites": [],
        "profiles": [],
        "preferences": [],
        "profileImage": "profile1.jpg",
        "preference": {
            "_id": "66930c2e2aad987e24078e12",
            "emailFrequency": "never",
            "timeZone": "Europe/Gibraltar",
            "language": "en",
            "sendNotificationTime": 43,
            "soundVoice": "alertSound.mp3",
            "dateFormat": "YYYY-MM-DD",
            "displayBrowsingTimeLimit": false,
            "displayIncomeMessages": false
        },
    },
    isAuthenticated: true,
    isInitialized: true
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * @param {AuthStateType} state
         * @param {PayloadAction<AuthUser>} action
         */
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        /**
         * @param {AuthStateType} state
         */
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        /**
         * @param {AuthStateType} state
         */
        deleteCurrentUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = false;
        },
        /**
         * @param {AuthStateType} state
         * @param {PayloadAction<AuthUser>} action
         */
        updateCurrentUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setCurrentUser, setInitialized, deleteCurrentUser, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
