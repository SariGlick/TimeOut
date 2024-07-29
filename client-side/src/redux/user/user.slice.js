import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/types';

/**
 * @typedef {Object} UserStateType
 * @property {User[]} users
 */

/** @type {UserStateType} */
const initialState = { users: [], currentUser: {
    "_id": "669535fa91606a13857abd0b",
    "name": "jack",
    "email": "jack@gmail.com",
    "password": "fdfdfd",
    "googleId": "fdfdffdfd",
    "profileImage": "rimon.jpg",
    "visitsWebsites": [
      {
        "_id": "6694ed068b0ebdbe10fbb8d3",
        "visitsTime": [
          {
            "visitDate": "2024-06-15T15:56:20.000Z",
            "activityTime": 150,
            "_id": "669546b0a60b7afddfdcfd1e"
          }
        ],
        "__v": 0,
        "websiteId": {
          "_id": "669d07ea77f0de67ad26038a",
          "name": "google",
          "url": "https:/google.com",
          "__v": 0
        }
      }
    ],
    "profiles": [],
    "preferences": null,
    "__v": 0
  } };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<User[]>} action
         */
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        /**
         * @param {UserStateType} state
         * @param {PayloadAction<User>} action
         */
        setUser: (state, action) => {
            state.currentUser = action.payload;
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
