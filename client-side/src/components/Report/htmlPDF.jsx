import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import GenericButton from '../../stories/Button/GenericButton';

const DownloadPage = () => {
  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
};
  return (
    <div>
      <GenericButton className="secondary" label="Download as html PDF" size="medium" onClick={downloadPDF}></GenericButton>
      </div>
  );
};

export default DownloadPage;
