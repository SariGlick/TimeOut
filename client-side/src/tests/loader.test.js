import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../stories/loader/loader.jsx'; 

test('renders Loader component with default class', () => {
  render(<Loader />);

  const circularProgress = screen.getByRole('progressbar'); 
  expect(circularProgress).toBeInTheDocument();
  expect(circularProgress).toHaveClass('primary');
});

test('renders Loader component with custom class', () => {
  const customClass = 'custom-class';
  render(<Loader className={customClass} />);

  const circularProgress = screen.getByRole('progressbar');
  expect(circularProgress).toBeInTheDocument();

  expect(circularProgress).toHaveClass(customClass);
});
