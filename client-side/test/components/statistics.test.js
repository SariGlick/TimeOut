import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import Statistics from '../../src/components/statistics.jsx';
import DateTimePicker from '../../src/stories/datePicker/DatePicker.jsx';

jest.mock('../../src/stories/datePicker/DatePicker.jsx', () => ({
  __esModule: true,
  default: ({ onSubmit }) => (
    <div>
      <button onClick={() => onSubmit(['2024-06-01', '2024-06-29'])}>
        Submit
      </button>
    </div>
  ),
}));

jest.mock('../../src/components/statistics/graphs.jsx', () => ({
  __esModule: true,
  default: ({ startDate, endDate }) => (
    <div>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
    </div>
  ),
}));

describe('Statistics component', () => {
  const testClient = { uri: 'https://example.com/graphql' };

  it('renders DateTimePicker component', async () => {
    const { getByText } = render(
      <ApolloProvider client={testClient}>
        <Statistics />
      </ApolloProvider>
    );
    await waitFor(() => expect(getByText('Submit')).toBeTruthy());
  });

  it('calls onSubmit function when button is clicked', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <ApolloProvider client={testClient}>
        <DateTimePicker onSubmit={onSubmit} />
      </ApolloProvider>
    );

    const button = getByText('Submit');
    fireEvent.click(button, { bubbles: true });
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('renders VisitedWebsitesComponent when showVisitedWebsites is true', async () => {
    const { getByText, getByRole } = render(
      <ApolloProvider client={testClient}>
        <Statistics />
      </ApolloProvider>
    );

    const button = getByRole('button', { name: 'Submit' });
    fireEvent.click(button);

    await waitFor(() => expect(getByText('Start Date: 2024-06-01')).toBeTruthy());
    expect(getByText('End Date: 2024-06-29')).toBeTruthy();
  });
});