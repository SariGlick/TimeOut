import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Statistics from '../../src/components/statistics.jsx';

jest.mock('../../src/components/report.jsx', () => {

  return jest.fn(() => <div data-testid="mocked-datetimepicker"></div>);
});

describe('Statistics Component', () => {
  it('renders Statistics component with mocked components', () => {

    render(<Statistics />);
    expect(screen.queryByTestId("mocked-datetimepicker")).toBeInTheDocument();
  });

});
