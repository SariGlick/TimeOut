

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const downloadExcel = (data) => {  
  const workbook = XLSX.utils.book_new();  
  const worksheet = XLSX.utils.json_to_sheet(data);  
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');  
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });  
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });  
  saveAs(blob, 'data.xlsx');
};
