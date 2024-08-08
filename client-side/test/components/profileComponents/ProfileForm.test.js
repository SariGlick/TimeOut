import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileForm from '../../../src/components/profileComponents/profileForm.jsx';

describe('ProfileForm', () => {
    test('renders profile name input', () => {
        const formData = {
            profileName: '',
            timeProfile: {
                timeStart: '',
                timeEnd: '',
            },
            statusBlockedSites: '',
        };
        render(<ProfileForm formData={formData} setFormData={() => { }} />);
        const profileNameInput = document.querySelector('input[name="profileName"]');
        expect(profileNameInput).toBeInTheDocument();
    });

    test('renders time start input', () => {
        const formData = {
            profileName: '',
            timeProfile: {
                timeStart: '',
                timeEnd: '',
            },
            statusBlockedSites: '',
        };
        render(<ProfileForm formData={formData} setFormData={() => { }} />);
        const timeStartInput = document.querySelector('input[name="timeStart"]');
        expect(timeStartInput).toBeInTheDocument();
    });

    test('renders time end input', () => {
        const formData = {
            profileName: '',
            timeProfile: {
                timeStart: '',
                timeEnd: '',
            },
            statusBlockedSites: '',
        };
        render(<ProfileForm formData={formData} setFormData={() => { }} />);
        const timeEndInput = document.querySelector('input[name="timeEnd"]');
        expect(timeEndInput).toBeInTheDocument();
    });
});
