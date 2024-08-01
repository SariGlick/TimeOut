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
    user: null,
    isAuthenticated: false,
    isInitialized: false
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
