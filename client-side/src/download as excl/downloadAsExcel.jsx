import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import GenericButton from '../stories/Button/GenericButton';


const downloadExcel = (data, sheetName = 'Browsing Data', fileName = 'browsing_data.xlsx') => {  
  const workbook = XLSX.utils.book_new();  
  const worksheet = XLSX.utils.json_to_sheet(data);  
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);  
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });  
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });  
  saveAs(blob, fileName);
};

const DownloadAsExcel = ({ data, sheetName, fileName }) => {
  return (
    <div>
      <GenericButton onClick={() => downloadExcel(data, sheetName, fileName)}>Download as Excel</GenericButton>
    </div>
  );
};

export default DownloadAsExcel;
