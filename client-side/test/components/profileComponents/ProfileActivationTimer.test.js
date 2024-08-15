import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileActivationTimer from '../../../src/components/profileComponents/profileActivationTimer.jsx';
import '@testing-library/jest-dom';

test('renders timer with correct profile name and time', () => {
  render(<ProfileActivationTimer profileActivationTime={1} profileName="Test Profile" />);
  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();
  
});


test('renders timer with correct time', () => {
  render(<ProfileActivationTimer profileActivationTime={2} profileName="Test Profile" />);
  
  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();
  expect(screen.getByText(/Time Left/i)).toBeInTheDocument();
});



test('renders timer with different activation times', () => {
  const { rerender } = render(<ProfileActivationTimer profileActivationTime={1} profileName="Test Profile" />);
  
  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();

  rerender(<ProfileActivationTimer profileActivationTime={10} profileName="Test Profile" />);

  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();
});


test('handles edge case with zero activation time', () => {
  render(<ProfileActivationTimer profileActivationTime={0} profileName="Test Profile" />);
  
  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();
  expect(screen.getByText(/Time Left/i)).toBeInTheDocument();
});


jest.mock('react-countdown-circle-timer', () => ({
  CountdownCircleTimer: jest.fn(({ children }) => <div>{children({ remainingTime: 120 })}</div>)
}));

test('updates timer on prop change', () => {
  const { rerender } = render(<ProfileActivationTimer profileActivationTime={1} profileName="Test Profile" />);
  
  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();

  rerender(<ProfileActivationTimer profileActivationTime={5} profileName="Test Profile" />);

  expect(screen.getByText(/Profile Test Profile!/i)).toBeInTheDocument();
});

