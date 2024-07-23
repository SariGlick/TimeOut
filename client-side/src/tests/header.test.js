import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResponsiveAppBar from '../stories/header/header.jsx'; 

describe('ResponsiveAppBar', () => {
  test('renders the component with the logo and avatar', () => {
    render(<ResponsiveAppBar />);
    expect(screen.getByText('TimeOut')).toBeInTheDocument();
    expect(screen.getByAltText('Remy Sharp')).toBeInTheDocument();
  });

  test('opens and closes the navigation menu', () => {
    render(<ResponsiveAppBar />);
    const menuButton = screen.getByLabelText('account of current user');
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside to close the menu
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('opens and closes the user menu', () => {
    render(<ResponsiveAppBar />);
    const userButton = screen.getByTitle('Open settings');
    fireEvent.click(userButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside to close the menu
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('renders LabTabs with the expected props', () => {
    render(<ResponsiveAppBar />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4); // Assuming there are 4 tabs in the middle-side-box

    // Check text of tabs
    expect(tabs[0]).toHaveTextContent('home');
    expect(tabs[1]).toHaveTextContent('reports');
    expect(tabs[2]).toHaveTextContent('statistics');
    expect(tabs[3]).toHaveTextContent('profiles');
  });
});
