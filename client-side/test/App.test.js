import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

test('renders App component', () => {
  render(<App />);
  // No specific elements to check since App is empty
});