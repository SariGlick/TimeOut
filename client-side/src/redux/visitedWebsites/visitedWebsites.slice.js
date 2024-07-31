import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VisitedWebsites } from '../../types/types.js';

/**
 * @typedef {Object} visitedWebsitesStateType
 * @property {VisitedWebsites[]} visitedWebsites
 */

/** @type {visitedWebsitesStateType} */
const initialState = { visitedWebsites: [] };

const visitedWebsiteSlice = createSlice({
    name: 'visitedWebsite',
    initialState,
    reducers: {
        /**
         * @param {visitedWebsitesStateType} state
         * @param {PayloadAction<VisitedWebsites[]>} action
         */
        setVisitedWebsite: (state, action) => {
            state.visitedWebsites = action.payload;
        },
        /**
         * @param {visitedWebsitesStateType} state
         * @param {PayloadAction<VisitedWebsites>} action
         */
        addVisitedWebsite: (state, action) => {
            state.visitedWebsites.push(action.payload);
        },
        /**
         * @param {visitedWebsitesStateType} state
         * @param {PayloadAction<VisitedWebsites>} action
         */
        updateVisitedWebsite: (state, action) => {
            const index = state.visitedWebsites.findIndex(visitedWebsite => visitedWebsite.id === action.payload.id);
            if (index !== -1) {
                state.visitedWebsites[index] = action.payload;
            }
        },
        /**
         * @param {visitedWebsitesStateType} state
         * @param {PayloadAction<string>} action
         */
        deleteVisitedWebsite: (state, action) => {
            const index = state.visitedWebsites.findIndex(visitedWebsite => visitedWebsite.id === action.payload);
            if (index !== -1) {
                state.visitedWebsites.splice(index, 1);
            }
        }
    }
});

export const { setVisitedWebsite, addVisitedWebsite, updateVisitedWebsite, deleteVisitedWebsite } = visitedWebsiteSlice.actions;
export default visitedWebsiteSlice.reducer;
