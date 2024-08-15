import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProfilePageComponent from '../../../src/components/profileComponents/profilePageComponent.jsx';
import profileReducer from '../../../src/redux/profile/profile.slice';
import * as profileService from '../../../src/services/profileService';
import { SnackbarProvider } from 'notistack';
import { render, screen, fireEvent  } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProfiles = [
    {
        _id: '1',
        profileName: 'Profile 1',
        timeProfile: { start: '2024-08-15T08:00:00Z', end: '2024-08-15T17:00:00Z' },
        listWebsites: [],
    },
];

const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
    preloadedState: {
        profile: {
            profiles: mockProfiles,
        },
    },
});

jest.mock('../../../src/services/profileService.js', () => ({
    getProfilesByUserId: jest.fn(),
}));

describe('ProfilePageComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders profile list and selects a profile', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>
                        <ProfilePageComponent userId="user1" />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        );

        const combobox = screen.getByRole('combobox');
        expect(combobox).toBeInTheDocument();

        fireEvent.mouseDown(combobox);

        const listbox = screen.getByRole('listbox');
        expect(listbox).toBeInTheDocument();

        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(0);
    });

    test('handles errors when fetching profiles', async () => {
        profileService.getProfilesByUserId.mockRejectedValue(new Error('Fetch error'));
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>
                        <ProfilePageComponent userId="user1" />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(await screen.findByText(/An error occurred in fetching the data from the server!/i)).toBeInTheDocument(); // Adjust based on your actual error handling UI
    });
});
