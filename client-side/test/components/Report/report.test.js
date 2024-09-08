import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Report from '../../../src/components/Report/report.jsx'; 
import Select from '../../../src/stories/Select/Select.jsx';
import { OPTION_ARRAY, TIME } from '../../../src/components/Report/report.constant.jsx';

jest.mock('../../../src/stories/Select/Select.jsx', () => ({
  __esModule: true,
  default: jest.fn(({ onChange, className, options, title, size, widthOfSelect }) => (
    <select
      data-testid="select"
      className={className}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: widthOfSelect }}
      aria-label={title}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )),
}));

describe('Report Component', () => {
  it('should render Select with correct props and display table after change', () => {
    const { getByTestId, queryByTestId } = render(<Report />);

    const select = getByTestId('select');
     
    expect(select).toHaveClass('primary');
    expect(select).toHaveAttribute('aria-label', 'time arrange');
    expect(select).toHaveStyle('width: 150px');

    expect(queryByTestId('data-table')).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: 2 } });

    expect(queryByTestId('data-table')).toBeInTheDocument();
  });
});
