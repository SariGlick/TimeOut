import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadPage from '../../../src/components/Report/htmlPDF'; 
import { LABEL_OF_PDF_DOWNLOAD_HTML } from '../../../src/components/Report/report.constant';

jest.mock('html2canvas');
jest.mock('jspdf');

describe('DownloadPage', () => {
  let addImageMock, saveMock;

  beforeEach(() => {
    addImageMock = jest.fn();
    saveMock = jest.fn();

    html2canvas.mockImplementation(() => Promise.resolve({
      toDataURL: () => 'data:image/png;base64,testImageData'
    }));

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

    const div = document.createElement('div');
    div.id = 'testDiv';
    document.body.appendChild(div);

    fireEvent.click(getByText(LABEL_OF_PDF_DOWNLOAD_HTML));

    expect(html2canvas).toHaveBeenCalledWith(document.getElementById('testDiv'), { useCORS: true });

    console.log(jsPDF.mock.calls);

    const mockPDF = jsPDF.mock.instances[0];

    expect(jsPDF).toHaveBeenCalledWith('p', 'mm', 'a4');

    expect(mockPDF.addImage).toHaveBeenCalledWith('data:image/png;base64,testImageData', 'PNG', 0, 0, 210, 297);

    expect(mockPDF.save).toHaveBeenCalledWith('timeOut-Report.pdf');
  });
});
