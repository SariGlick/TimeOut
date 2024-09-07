// Messages.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Messages from './messages';

// Mocking the necessary modules and hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('Messages Component', () => {
  const mockOnUpdate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const mockState = {
      currentUser: {
        messageDisplay: 'title_only',
        inboxMessages: 'group_by_date',
        messagesCount: 10
      }
    };
    
    require('react-redux').useSelector.mockImplementation(() => mockState);

    render(<Messages onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('MESSAGE_BOX')).toBeInTheDocument();
    expect(screen.getByText('MESSAGES_COUNT')).toBeInTheDocument();
    expect(screen.getByText('MESSAGES_INBOX')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    const mockState = {
      currentUser: {
        messageDisplay: 'title_only',
        inboxMessages: 'group_by_date',
        messagesCount: 10
      }
    };
    
    require('react-redux').useSelector.mockImplementation(() => mockState);

    render(<Messages onUpdate={mockOnUpdate} />);
    
    // Change Select input
    fireEvent.change(screen.getByRole('combobox', { name: /MESSAGE_BOX/i }), {
      target: { value: 'new_value' }
    });
    
    // Change GenericInput input
    fireEvent.change(screen.getByLabelText(/MESSAGES_COUNT/i), {
      target: { value: '20' }
    });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      messageDisplay: 'new_value',
      inboxMessages: 'group_by_date',
      messagesCount: 20
    });
  });
});
