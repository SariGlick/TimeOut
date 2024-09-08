import '@testing-library/jest-dom'; 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../src/components/homePageComponent';

describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });


  test('renders HomePage component without crashing', () => {
    expect(screen.getByText('Enhance Your Browsing Experience with Our Chrome Add-on')).toBeInTheDocument();
  });

  test('renders all section titles', () => {
    expect(screen.getByText('Enhance Your Browsing Experience with Our Chrome Add-on')).toBeInTheDocument();
    expect(screen.getByText('Personalize Your Profiles')).toBeInTheDocument();
    expect(screen.getByText('Manage Your Settings')).toBeInTheDocument();
    expect(screen.getByText('Get Detailed Reports')).toBeInTheDocument();
  });

  test('renders all section descriptions', () => {
    expect(screen.getByText('Install our Chrome extension to block or limit access to specific websites. Create profiles for work, home, and more, giving you control over your online activity.')).toBeInTheDocument();
    expect(screen.getByText('Create and manage profiles for different settings like work and home. Link accounts from over 17,000 financial institutions and view your transactions in one place.')).toBeInTheDocument();
    expect(screen.getByText('Customize your preferences to better track and understand your spending habits. Adjust your profile settings to suit your needs and enhance your browsing experience.')).toBeInTheDocument();
    expect(screen.getByText('Review your transactions, track your spending by category, and receive monthly insights to help you better understand your money habits.')).toBeInTheDocument();
  });

  test('renders all buttons with correct text and links', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Go to Profiles')).toBeInTheDocument();
    expect(screen.getByText('Go to Settings')).toBeInTheDocument();
    expect(screen.getByText('Go to Reports')).toBeInTheDocument();

    
    expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Go to Profiles').closest('a')).toHaveAttribute('href', '/profiles');
    expect(screen.getByText('Go to Settings').closest('a')).toHaveAttribute('href', '/settings');
    expect(screen.getByText('Go to Reports').closest('a')).toHaveAttribute('href', '/reports');
  });

  test('renders all icons', () => {
   
    expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
    expect(screen.getByTestId('PeopleIcon')).toBeInTheDocument();
    expect(screen.getByTestId('SettingsIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ReportIcon')).toBeInTheDocument();
  });

  test('renders sections with correct styles', () => {

    const evenSections = document.querySelectorAll('.feature.even');
    const oddSections = document.querySelectorAll('.feature.odd');
    
    expect(evenSections.length).toBe(2);
    expect(oddSections.length).toBe(2);
  });

  test('should render links with correct classes', () => {

    expect(screen.getByText('Login').closest('a')).toHaveClass('btn-primary');
    expect(screen.getByText('Go to Profiles').closest('a')).toHaveClass('btn-primary');
    expect(screen.getByText('Go to Settings').closest('a')).toHaveClass('btn-primary');
    expect(screen.getByText('Go to Reports').closest('a')).toHaveClass('btn-primary');
  });
});
