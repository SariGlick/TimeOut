import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {import('../../types/types').Preference} Preference
 * @typedef {Object} PreferenceStateType
 * @property {Preference | null} preference
 */

/** @type {PreferenceStateType} */
const initialState = { preference: null };

const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    /**
     * @param {PreferenceStateType} state
     * @param {import('@reduxjs/toolkit').PayloadAction<Preference>} action
     */
    setPreference: (state, action) => {
      state.preference = action.payload;
    },
    /**
     * @param {PreferenceStateType} state
     * @param {import('@reduxjs/toolkit').PayloadAction<Preference>} action
     */
    updatePreference: (state, action) => {
      state.preference = { ...state.preference, ...action.payload };
    },
    /**
     * @param {PreferenceStateType} state
     */
    clearPreference: (state) => {
      state.preference = null;
    }
  }
});

export const { setPreference, updatePreference, clearPreference } = preferenceSlice.actions;
export default preferenceSlice.reducer;
