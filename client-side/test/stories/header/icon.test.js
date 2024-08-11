import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageIcon from './MessageIcon';

test('MessageIcon renders correctly with unread messages badge', () => {

  render(<MessageIcon messages={messages} />);

  const mailIcon = screen.getByRole('button', { name: /mail icon/i });
  expect(mailIcon).toBeInTheDocument();

  const badgeContent = screen.getByText('2');
  expect(badgeContent).toBeInTheDocument();
});

test('MessageIcon renders correctly without unread messages badge', () => {
  const messages = [
    { id: 1, read: true },
    { id: 2, read: true }
  ];

  render(<MessageIcon messages={messages} />);

  const mailOutlineIcon = screen.getByRole('button', { name: /mail outline icon/i });
  expect(mailOutlineIcon).toBeInTheDocument();
});