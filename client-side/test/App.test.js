import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

test('handles case where geolocation is not supported', () => {
  global.navigator.geolocation = undefined;

  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  expect(consoleError).toHaveBeenCalledWith('Geolocation is not supported by your browser');

  consoleError.mockRestore();
});

