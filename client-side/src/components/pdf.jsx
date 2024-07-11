import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    doc.text("developed by kamatech", 10, 250);
    doc.save("timeOut-Report.pdf");
  };

  return (
    <div>
      <button onClick={generatePdf}>Download as PDF</button>{/* לקחת כפתור מה UI  */}
    </div>
  );
};

export default PdfGenerator;
// התקנתי את הספריות: 
// npm install jspdf
// npm i jspdf-autotable