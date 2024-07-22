import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import GenericButton from '../../stories/Button/GenericButton';
import { table } from './report.constant';

const PdfGenerator = ({data,nameFile="timeOut-Report",columnsforthetable=table,textLable="download pdf"}) => {
const userName="name"; //change to realy name
  const generatePdf = () => {
    const doc = new jsPDF();
    const date=new Date();
    doc.text(["Report:",`issue Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,`userName: ${userName}`], 10, 10);
    const columns = columnsforthetable;
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 35,
    });
    doc.text("developed by Extratech", 10, 250);
    doc.save(`${nameFile}.pdf`);
  };
 
  return (
    <div>
      <GenericButton className="secondary" label={textLable} size="medium" onClick={generatePdf}></GenericButton>
    </div>
  );
};

export default PdfGenerator;