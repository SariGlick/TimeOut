import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PdfGenerator from '../../../src/components/Report/pdf';
import GenericButton from '../../../src/stories/Button/GenericButton';
import { LABEL_OF_PDF_DOWNLOAD, TABLE } from '../../../src/components/Report/report.constant';

jest.mock('jspdf');
jest.mock('jspdf-autotable');

describe('PdfGenerator', () => {
  beforeEach(() => {
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

    fireEvent.click(getByText(LABEL_OF_PDF_DOWNLOAD));

    const doc = jsPDF.mock.results[0].value;

    expect(jsPDF).toHaveBeenCalled();

    expect(doc.text).toHaveBeenCalledWith([
      "Report:", 
      `issue Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      `userName: name`
    ], 10, 10);

    expect(doc.autoTable).toHaveBeenCalledWith({
      columns: mockColumns,
      body: mockData,
      startY: 35,
    });

    expect(doc.save).toHaveBeenCalledWith('timeOut-Report.pdf');
  });
});
