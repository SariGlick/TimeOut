import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileForm from './ProfileForm';

const formData = {
    userId: '1',
    profileName: 'Test Profile',
    timeProfile: {
        timeStart: '08:00',
        timeEnd: '17:00',
    },
    statusBlockedSites: 'black list',
    websites: [],
};

const setFormData = jest.fn();

describe('ProfileForm', () => {
    test('renders profile name input', () => {
        render(<ProfileForm formData={formData} setFormData={setFormData} />);
        expect(screen.getByLabelText('Profile Name')).toBeInTheDocument();
    });

    test('renders time start input', () => {
        render(<ProfileForm formData={formData} setFormData={setFormData} />);
        expect(screen.getByLabelText('Time Start')).toBeInTheDocument();
    });

    test('renders time end input', () => {
        render(<ProfileForm formData={formData} setFormData={setFormData} />);
        expect(screen.getByLabelText('Time End')).toBeInTheDocument();
    });

    test('renders status blocked sites select', () => {
        render(<ProfileForm formData={formData} setFormData={setFormData} />);
        expect(screen.getByLabelText('Status Blocked Sites')).toBeInTheDocument();
    });
});
