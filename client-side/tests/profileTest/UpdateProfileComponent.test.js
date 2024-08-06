import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SnackbarProvider } from 'notistack';
import UpdateProfileComponent from '../../src/components/profileComponents/updateProfileCpmponent.jsx';

const mockStore = configureStore([]);
const profile = {
    userId: '1',
    profileName: 'Test Profile',
    timeProfile: {
        timeStart: '08:00',
        timeEnd: '17:00',
    },
    statusBlockedSites: 'black list',
    websites: [],
};

describe('UpdateProfileComponent', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    test('renders Edit Profile button', () => {
        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <UpdateProfileComponent profile={profile} />
                </SnackbarProvider>
            </Provider>
        );
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    test('opens dialog on Edit Profile button click', () => {
        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <UpdateProfileComponent profile={profile} />
                </SnackbarProvider>
            </Provider>
        );
        fireEvent.click(screen.getByText('Edit Profile'));
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
});
