import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import GenericButton from '../../stories/Button/GenericButton';
import { LABEL_OF_PDF_DOWNLOAD, TABLE } from './report.constant';

const PdfGenerator = ({ data, nameFile = "timeOut-Report", columnsforthetable = TABLE }) => {
  const userName = "name"; 

  const generatePdf = () => {
    const doc = new jsPDF();
    const date = new Date();
    
    doc.text([
      "Report:", 
      `issue Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      `userName: ${userName}`
    ], 10, 10);
    
    doc.autoTable({
      columns: columnsforthetable,
      body: data,
      startY: 35,
    });

    doc.text("developed by Extratech", 10, 250);

    doc.save(`${nameFile}.pdf`);
  };

  return (
    <div>
        <GenericButton className="secondary" label={LABEL_OF_PDF_DOWNLOAD} size="medium" onClick={generatePdf} />
    </div>
  );
};

export default PdfGenerator;
