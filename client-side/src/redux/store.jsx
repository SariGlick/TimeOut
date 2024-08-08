import { useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile/profile.slice.js';
import VisitedWebsitesReducer from './visitedWebsites/visitedWebsites.slice.js';
import userReducer from './user/user.slice.js';
import preferenceReducer from './preference/preference.slice.js';
import authReducer from './auth/auth.slice.js';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        preference: preferenceReducer,
        user: userReducer,
        visitedWebsites: VisitedWebsitesReducer,
        auth: authReducer
    }
});
export const useAppSelector = useSelector;
