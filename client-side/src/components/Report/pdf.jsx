import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import GenericButton from '../../stories/Button/GenericButton';

const PdfGenerator = ({data}) => {
const userName="name"; //change to realy name
  const generatePdf = () => {
    const doc = new jsPDF();
    const date=new Date();
    doc.text(["Report:",`issue Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,`userName: ${userName}`], 10, 10);
    const columns = [
      { title: "Site name", dataKey: "SiteName" },
      { title: "Browsing time", dataKey: "BrowsingTime" },
      { title: "Avg. for a day", dataKey: "AvgForADay" },
    ];
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 35,
    });
    doc.text("developed by Extratech", 10, 250);
    doc.save("timeOut-Report.pdf");
  };
 
  return (
    <div>
      <GenericButton className="secondary" label="Download as PDF" size="medium" onClick={generatePdf}></GenericButton>
    </div>
  );
};

export default PdfGenerator;