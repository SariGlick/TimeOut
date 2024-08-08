import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileActions from '../../../src/components/profileComponents/profileActions.jsx';
import '@testing-library/jest-dom';

describe('ProfileActions', () => {
    const handleSave = jest.fn();
    const handleClose = jest.fn();
    const handleDelete = jest.fn();

    test('renders Save button', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    test('renders Cancel button', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('renders Delete Profile button', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        expect(screen.getByText('Delete Profile')).toBeInTheDocument();
    });

    test('calls handleDelete on Delete Profile button click', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        fireEvent.click(screen.getByText('Delete Profile'));
        expect(handleDelete).toHaveBeenCalled();
    });

    test('calls handleSave on Save button click', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        fireEvent.click(screen.getByText('Save'));
        expect(handleSave).toHaveBeenCalled();
    });

    test('calls handleClose on Cancel button click', () => {
        render(<ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(handleClose).toHaveBeenCalled();
    });
});
