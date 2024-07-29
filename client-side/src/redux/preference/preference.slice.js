import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Preference } from '../../types/types';
/**
 * @typedef {Object} PreferenceStateType
 * @property {Preference[]} preferences
 */

/** @type {PreferenceStateType} */
const initialState = { preferences: [] };

const preferenceSlice = createSlice({
    name: 'preference',
    initialState,
    reducers: {
        /**
         * @param {PreferenceStateType} state
         * @param {PayloadAction<Preference[]>} action
         */
        setPreference: (state, action) => {
            state.preferences = action.payload;
        },
        /**
         * @param {PreferenceStateType} state
         * @param {PayloadAction<Preference>} action
         */
        addPreference: (state, action) => {
            state.preferences.push(action.payload);
        },
        /**
         * @param {PreferenceStateType} state
         * @param {PayloadAction<Preference>} action
         */
        updatePreference: (state, action) => {
            const index = state.preferences.findIndex(preference => preference.id === action.payload.id);
            if (index !== -1) {
                state.preferences[index] = action.payload;
            }
        },
        /**
         * @param {PreferenceStateType} state
         * @param {PayloadAction<string>} action
         */
        deletePreference: (state, action) => {
            const index = state.preferences.findIndex(preference => preference.id === action.payload);
            if (index !== -1) {
                state.preferences.splice(index, 1);
            }
        }
    }
});

export const { setPreference, addPreference, updatePreference, deletePreference } = preferenceSlice.actions;
export default preferenceSlice.reducer;
