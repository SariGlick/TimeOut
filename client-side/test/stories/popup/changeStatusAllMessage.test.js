import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageStatusUpdater from '../../../src/stories/popup/MessageStatusUpdater';

test('renders the MessageStatusUpdater component and updates the message status', () => {
    const mockUpdateMessageStatus = jest.fn();
    jest.mock('./updateMessageStatus', () => mockUpdateMessageStatus);

    render(<MessageStatusUpdater />);

    const markAsReadButton = screen.getByTitle('Mark all messages as read');
    expect(markAsReadButton).toBeInTheDocument();

    fireEvent.click(markAsReadButton);
    expect(mockUpdateMessageStatus).toHaveBeenCalledWith(true);

    const markAsUnreadButton = screen.getByTitle('Mark all messages as unread');
    expect(markAsUnreadButton).toBeInTheDocument();

    fireEvent.click(markAsUnreadButton);
    expect(mockUpdateMessageStatus).toHaveBeenCalledWith(false);
});
