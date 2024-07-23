import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LabTabs from '../stories/tabs/tabs.jsx';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LabTabs', () => {
  const text = ['home', 'reports', 'statistics', 'profiles'];
  const nav = ['/home', '/reports', '/statistics', '/profiles'];
  
  test('renders the component with the given tabs', () => {
    render(
      <MemoryRouter>
        <LabTabs text={text} nav={nav} />
      </MemoryRouter>
    );

    text.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('navigates to the correct route on tab click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <LabTabs text={text} nav={nav} />
      </MemoryRouter>
    );

    text.forEach((label, index) => {
      const tab = screen.getByText(label);
      fireEvent.click(tab);
      expect(mockNavigate).toHaveBeenCalledWith(nav[index]);
    });
  });
});
