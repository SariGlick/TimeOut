// Report.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Report from '../../../src/components/Report/report.jsx'; 
import Select from '../../../src/stories/Select/Select.jsx';
import { OPTION_ARRAY, TIME } from '../../../src/components/Report/report.constant.jsx';

// דמוי של Select
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
  it('should render Select with correct props and handle change', () => {
    const { getByTestId } = render(<Report />);

    const select = getByTestId('select');
    
    // בדוק אם Select הוצג עם התכונות הנכונות
    expect(select).toHaveClass('primary');
    expect(select).toHaveAttribute('aria-label', 'time arrange');
    expect(select).toHaveStyle('width: 150px');

    // סימול של בחירת ערך מהתפריט
    fireEvent.change(select, { target: { value: '2' } });

    // אם אתה רוצה לבדוק שינוי מסוים ב-state או UI, אתה יכול להוסיף בדיקות נוספות
    // בדוק אם selectType השתנה לערך המתאים
    // הוסף mock לפונקציה כדי לבדוק אם היא נקראה עם הערך הנכון
  });
});
