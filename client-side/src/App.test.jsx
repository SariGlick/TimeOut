import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./stories/footer/FooterComponent', () => () => <div>Footer Mock</div>);

jest.mock('react-router-dom', () => ({
  RouterProvider: ({ router }) => <div>Router Mock</div>
}));

jest.mock('./redux/store.jsx', () => ({
  store: {
    // Provide mock implementations for the store if needed
  }
}));

test('renders the App component with essential elements', () => {
  render(<App />);

  expect(screen.getByText(/Footer Mock/i)).toBeInTheDocument();

  expect(screen.getByText(/Router Mock/i)).toBeInTheDocument();
});
