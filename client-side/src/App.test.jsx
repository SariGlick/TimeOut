import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Footer component
jest.mock('./stories/footer/FooterComponent', () => () => <div>Footer Mock</div>);

// Mock the RouterProvider component
jest.mock('react-router-dom', () => ({
  RouterProvider: ({ router }) => <div>Router Mock</div>
}));

// Mock the Redux store
jest.mock('./redux/store.jsx', () => ({
  store: {
    // Provide mock implementations for the store if needed
  }
}));

test('renders the App component with essential elements', () => {
  render(<App />);

  // Check if the mocked Footer component is rendered
  expect(screen.getByText(/Footer Mock/i)).toBeInTheDocument();

  // Check if the mocked RouterProvider component is rendered
  expect(screen.getByText(/Router Mock/i)).toBeInTheDocument();
});
