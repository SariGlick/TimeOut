import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerActivationButton from '../../../src/components/profileComponents/timerActivationButton.jsx';
import { INPUT_LABELS, BUTTON_LABELS } from '../../../src/constants/profileConstants.js';

test('handles time input and start button', async () => {
  render(<TimerActivationButton profileName="Profile 1" />);
  
  fireEvent.click(screen.getByText(BUTTON_LABELS.TIMER_ACTIVATION));
  
  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_START), { target: { value: '09:00' } });
  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_END), { target: { value: '10:00' } });
  
  fireEvent.click(screen.getByText(BUTTON_LABELS.START));
  
  await waitFor(() => {
    expect(screen.getByText('1:00:00')).toBeInTheDocument(); // Example text, adjust as needed
  });
});

test('does not start timer with empty input', () => {
  render(<TimerActivationButton profileName="Profile 1" />);

  fireEvent.click(screen.getByText(BUTTON_LABELS.TIMER_ACTIVATION));

  fireEvent.click(screen.getByText(BUTTON_LABELS.START));

  expect(screen.queryByText('1:00:00')).not.toBeInTheDocument();
});

test('input fields accept and update values correctly', () => {
  render(<TimerActivationButton profileName="Profile 1" />);

  fireEvent.click(screen.getByText(BUTTON_LABELS.TIMER_ACTIVATION));

  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_START), { target: { value: '09:30' } });
  expect(screen.getByLabelText(INPUT_LABELS.TIME_START).value).toBe('09:30');
  
  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_END), { target: { value: '10:30' } });
  expect(screen.getByLabelText(INPUT_LABELS.TIME_END).value).toBe('10:30');
});

test('timer starts and stops correctly', async () => {
  render(<TimerActivationButton profileName="Profile 1" />);
  
  fireEvent.click(screen.getByText(BUTTON_LABELS.TIMER_ACTIVATION));
  
  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_START), { target: { value: '09:00' } });
  fireEvent.change(screen.getByLabelText(INPUT_LABELS.TIME_END), { target: { value: '09:05' } });
  fireEvent.click(screen.getByText(BUTTON_LABELS.START));
  
  await waitFor(() => {
    expect(screen.getByText('0:05:00')).toBeInTheDocument();
  });
});