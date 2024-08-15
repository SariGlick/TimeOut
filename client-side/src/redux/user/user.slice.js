import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/types';

/**
 * @typedef {Object} UserStateType
 * @property {User[]} users
 */

/** @type {UserStateType} */
const initialState = { users: [] };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<User[]>} action
         */
        setUser: (state, action) => {
            state.users = action.payload;
        },
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<User>} action
         */
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<User>} action
         */
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<string>} action
         */
        deleteUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload);
            if (index !== -1) {
                state.users.splice(index, 1);
            }
        },
    }
});

export const { setUser, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
