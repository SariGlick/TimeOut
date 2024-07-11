import React from 'react';
import PdfGenerator from './components/download/pdf.jsx';

export default function Download() {
  return (
    <div>
        <PdfGenerator data={[{SiteName:'gmail',BrowsingTime:20,AvgForADay:1}]} />
    </div>
  );
}
