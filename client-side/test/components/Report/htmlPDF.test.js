// DownloadPage.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadPage from '../../../src/components/Report/htmlPDF'; 
import { LABEL_OF_PDF_DOWNLOAD_HTML } from '../../../src/components/Report/report.constant';

// דמוי של הפונקציות החיצוניות
jest.mock('html2canvas');
jest.mock('jspdf');

describe('DownloadPage', () => {
  let addImageMock, saveMock;

  beforeEach(() => {
    addImageMock = jest.fn();
    saveMock = jest.fn();

    // דמוי של html2canvas שמחזיר Promise עם Canvas
    html2canvas.mockImplementation(() => Promise.resolve({
      toDataURL: () => 'data:image/png;base64,testImageData'
    }));

    // דמוי של jsPDF שמחזיר אובייקט עם הפונקציות הנדרשות
    jsPDF.mockImplementation(() => ({
      internal: {
        pageSize: {
          getWidth: () => 210,
          getHeight: () => 297,
        }
      },
      addImage: addImageMock,
      save: saveMock,
    }));
  });

  it('should call html2canvas and jsPDF when the button is clicked', async () => {
    const { getByText } = render(<DownloadPage divID="testDiv" />);

    // הכנס div עם id שווה ל-divID שקבענו
    const div = document.createElement('div');
    div.id = 'testDiv';
    document.body.appendChild(div);

    // לחץ על כפתור ההורדה
    fireEvent.click(getByText(LABEL_OF_PDF_DOWNLOAD_HTML));

    // בדוק אם html2canvas נקראה
    expect(html2canvas).toHaveBeenCalledWith(document.getElementById('testDiv'), { useCORS: true });

    // הדפס לקונסול את הקריאות ל-jsPDF
    console.log(jsPDF.mock.calls);

    // קבל את האובייקט jsPDF שנוצר מהמוק
    const mockPDF = jsPDF.mock.instances[0];

    // ודא ש-jsPDF נקראה עם הפרמטרים הנכונים
    expect(jsPDF).toHaveBeenCalledWith('p', 'mm', 'a4');

    // ודא ש-addImage נקראה עם הערכים הנכונים
    expect(mockPDF.addImage).toHaveBeenCalledWith('data:image/png;base64,testImageData', 'PNG', 0, 0, 210, 297);

    // ודא ש-save נקראה עם שם הקובץ הנכון
    expect(mockPDF.save).toHaveBeenCalledWith('timeOut-Report.pdf');
  });
});
