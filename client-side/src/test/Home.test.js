import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/homeComponent/homePageComponent'; // Adjust the import based on your file structure

describe('HomePage', () => {
  test('renders all sections with correct content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for section headings
    const headings = [
      'Enhance Your Browsing Experience with Our Chrome Add-on',
      'Personalize Your Profiles',
      'Manage Your Settings',
      'Get Detailed Reports'
    ];

    headings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });

    // Check for section descriptions
    const descriptions = [
      'Install our Chrome extension to block or limit access to specific websites. Create profiles for work, home, and more, giving you control over your online activity.',
      'Create and manage profiles for different settings like work and home. Link accounts from over 17,000 financial institutions and view your transactions in one place.',
      'Customize your preferences to better track and understand your spending habits. Adjust your profile settings to suit your needs and enhance your browsing experience.',
      'Review your transactions, track your spending by category, and receive monthly insights to help you better understand your money habits.'
    ];

    descriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    // Check for buttons with correct text
    const buttons = [
      'Login',
      'Go to Profiles',
      'Go to Settings',
      'Go to Reports'
    ];

    buttons.forEach((button) => {
      expect(screen.getByText(button)).toBeInTheDocument();
    });
  });

  test('renders icons in each section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for icons (ensure you import '@testing-library/jest-dom' for toBeInTheDocument())
    const icons = [
      'AccountCircleIcon',
      'PeopleIcon',
      'SettingsIcon',
      'ReportIcon'
    ];

    icons.forEach((icon) => {
      expect(screen.getByTestId(icon)).toBeInTheDocument();
    });
  });
});
