import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import GenericButton from '../../stories/Button/GenericButton';
import { LABEL_OF_PDF_DOWNLOAD, LABEL_OF_PDF_DOWNLOAD_HTML } from './report.constant';

const DownloadPage = ({divID,nameFile="timeOut-Report",sizePage="a4",directly="p",size="mm"}) => {

  const downloadPDF = () => {
    const input = document.getElementById(divID);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(directly, size, sizePage);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight);
      pdf.save(`${nameFile}.pdf`);
    });
};
  return (
    <div>
      <GenericButton className="secondary" label={LABEL_OF_PDF_DOWNLOAD_HTML} size="medium" onClick={downloadPDF}></GenericButton>
      </div>
  );
};

export default DownloadPage;
