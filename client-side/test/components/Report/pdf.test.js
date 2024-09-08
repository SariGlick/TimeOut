// PdfGenerator.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PdfGenerator from '../../../src/components/Report/pdf';
import GenericButton from '../../../src/stories/Button/GenericButton';
import { LABEL_OF_PDF_DOWNLOAD, TABLE } from '../../../src/components/Report/report.constant';

// דמוי של הפונקציות החיצוניות
jest.mock('jspdf');
jest.mock('jspdf-autotable');

describe('PdfGenerator', () => {
  beforeEach(() => {
    // דמוי של jsPDF
    jsPDF.mockImplementation(() => ({
      text: jest.fn(),
      autoTable: jest.fn(),
      save: jest.fn(),
    }));
  });

  it('should generate and save PDF when the button is clicked', () => {
    const mockData = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Doe', age: 25 }
    ];
    const mockColumns = [
      { header: 'Name', dataKey: 'name' },
      { header: 'Age', dataKey: 'age' }
    ];

    const { getByText } = render(<PdfGenerator data={mockData} columnsforthetable={mockColumns} />);

    // לחץ על כפתור ההורדה
    fireEvent.click(getByText(LABEL_OF_PDF_DOWNLOAD));

    // קבל את האובייקט jsPDF שנוצר
    const doc = jsPDF.mock.results[0].value;

    // ודא ש-jsPDF נקראה
    expect(jsPDF).toHaveBeenCalled();

    // ודא ש-fn text נקראה עם הטקסט הנכון
    expect(doc.text).toHaveBeenCalledWith([
      "Report:", 
      `issue Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      `userName: name`
    ], 10, 10);

    // ודא ש-autoTable נקראה עם העמודות והנתונים
    expect(doc.autoTable).toHaveBeenCalledWith({
      columns: mockColumns,
      body: mockData,
      startY: 35,
    });

    // ודא ש-save נקראה עם שם הקובץ הנכון
    expect(doc.save).toHaveBeenCalledWith('timeOut-Report.pdf');
  });
});
