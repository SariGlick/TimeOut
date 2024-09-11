import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notifications from '../../../src/components/settings/Notifications.jsx';
import CONSTANTS from '../../../src/components/settings/constantSetting.js';
import { useSelector } from 'react-redux';

// Mocking the useSelector hook from redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

beforeAll(() => {
  // Mocking URL.createObjectURL
  global.URL.createObjectURL = jest.fn(() => 'mockObjectUrl');
  // Mocking URL.revokeObjectURL
  global.URL.revokeObjectURL = jest.fn();
});

afterAll(() => {
  // Clean up the mocks
  delete global.URL.createObjectURL;
  delete global.URL.revokeObjectURL;
});

describe('Notifications Component', () => {
  const { LABELS } = CONSTANTS;
  const mockOnUpdate = jest.fn();
  const mockData = {
    emailFrequency: 'yearly',
    sendNotificationTime: 15,
    soundVoice: 'song.mp3',
    displayIncomeMessages: false,
    displayBrowsingTimeLimit: true,
  };

  beforeEach(() => {
    useSelector.mockImplementation(() => ({
      auth: {
        user: {
          preference: {
            emailFrequency: 'never',
            sendNotificationTime: 10,
            soundVoice: 'alertSound.mp3',
            displayIncomeMessages: true,
            displayBrowsingTimeLimit: false,
          },
        },
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Notifications component correctly', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);

    expect(screen.getByLabelText(LABELS.DISPLAY_INCOME_MESSAGES)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.DISPLAY_BROWSING_TIME_LIMIT)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.CHANGE_NOTIFICATION_TIME)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.CHANGE_RINGTONE)).toBeInTheDocument();
  });

  test('calls onUpdate when email frequency changes', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);
    fireEvent.change(screen.getByTestId('select-email-frequency'), { target: { value: 'daily' } });
    console.log(mockOnUpdate.mock.calls);
    expect(mockOnUpdate).toHaveBeenCalledWith({ emailFrequency: 'daily' });
  });  

  test('calls onUpdate when notification time changes', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);
    fireEvent.change(screen.getByLabelText(LABELS.CHANGE_NOTIFICATION_TIME), { target: { value: 20 } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ sendNotificationTime: 20 });
  });

  test('calls onUpdate when soundVoice changes', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);
    const file = new File(['(⌐□_□)'], 'alertSoundNew.mp3', { type: 'audio/mp3' });

    const input = screen.getByLabelText(LABELS.CHANGE_RINGTONE);
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnUpdate).toHaveBeenCalledWith({ soundVoice: file });
  });

  test('calls onUpdate when display income messages changes', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);
    const checkbox = screen.getByLabelText(LABELS.DISPLAY_INCOME_MESSAGES);
    fireEvent.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledWith({ displayIncomeMessages: false });
  });

  test('calls onUpdate when browsing time limit changes', () => {
    render(<Notifications onUpdate={mockOnUpdate} data={mockData} />);
    const checkbox = screen.getByLabelText(LABELS.DISPLAY_BROWSING_TIME_LIMIT);
    fireEvent.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledWith({ displayBrowsingTimeLimit: true });
  });


});
