import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Header from './stories/header/header';
import Footer from './stories/footer/FooterComponent';

// Mock the Header and Footer components
jest.mock('./stories/header/header', () => () => <div>Header</div>);
jest.mock('./stories/footer/FooterComponent', () => () => <div>Footer</div>);

test('renders Header and Footer', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check if Header is rendered
  expect(getByText('Header')).toBeInTheDocument();

  // Check if Footer is rendered
  expect(getByText('Footer')).toBeInTheDocument();
});
