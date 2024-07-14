
import React from 'react';
import { downloadExcel } from './downloadAsExcel';

const UseComponent = () => {
  const data = [
  { SiteName: 'Gmail', BrowsungTime: '150 h',Avg: '1 h' },
  { SiteName: 'Netfree', BrowsungTime: '45 m',Avg: '0.04' },
  { SiteName: 'Outlook', BrowsungTime: '15 m',Avg: '0.001' },
];
  return (
    <div>
      <button onClick={() => downloadExcel(data)}>Download  as Excel</button>
    </div>
  );
};

export default UseComponent;
