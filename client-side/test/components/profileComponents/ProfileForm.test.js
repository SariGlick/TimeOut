import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; // Import userEvent
import ProfileForm from '../../../src/components/profileComponents/ProfileForm.jsx';

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

    test('renders select options correctly', async () => {
        render(<ProfileForm formData={formData} setFormData={setFormData} />);
        const select = screen.getByRole('combobox', { name: /Status Blocked Sites/i });

        // Open the select menu
        userEvent.click(select);

        // Verify options text
        expect(await screen.findByText('Black List')).toBeInTheDocument();
        expect(await screen.findByText('White List')).toBeInTheDocument();
    });
});
