import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Preferences from '../../../src/components/settings/Preferences.jsx';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Mocking the useSelector hook from redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mocking useTranslation hook from react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Preferences Component', () => {
  const mockOnUpdate = jest.fn();
  const mockData = {
    language: 'en',
    timeZone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  };

  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        auth: {
          user: {
            preference: {
              language: 'en',
              timeZone: 'UTC',
              dateFormat: 'MM/DD/YYYY',
            },
          },
        },
      })
    );
  });

  test('renders Preferences component correctly', () => {
    render(<Preferences onUpdate={mockOnUpdate} data={mockData} />);
    expect(screen.getByTestId('select-language')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-zone')).toBeInTheDocument();
    expect(screen.getByTestId('select-date-format')).toBeInTheDocument();
  });

  test('calls onUpdate when language changes', () => {
    render(<Preferences onUpdate={mockOnUpdate} data={mockData} />);
    fireEvent.change(screen.getByTestId('select-language'), { target: { value: 'es' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ language: 'es' });
  });

  test('calls onUpdate when timeZone changes', () => {
    render(<Preferences onUpdate={mockOnUpdate} data={mockData} />);
    fireEvent.change(screen.getByTestId('select-time-zone'), { target: { value: 'GMT+1' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ timeZone: 'GMT+1' });
  });

  test('calls onUpdate when dateFormat changes', () => {
    render(<Preferences onUpdate={mockOnUpdate} data={mockData} />);
    fireEvent.change(screen.getByTestId('select-date-format'), { target: { value: 'DD-MM-YYYY' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ dateFormat: 'DD-MM-YYYY' });
  });

});
