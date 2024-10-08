import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import GenericButton from '../../stories/Button/GenericButton';
import { BUTTON_LABELS } from '../../constants';

const downloadExcel = (data, sheetName, fileName) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};

const DownloadAsExcel = ({ data, sheetName = 'Browsing Data', fileName = 'browsing_data.xlsx' }) => {
  return (
    <div>
          <GenericButton label={BUTTON_LABELS.DOWNLOAD_EXCEL} className="profile-list-button" onClick={() => downloadExcel(data, sheetName, fileName)}></GenericButton>
    </div>
  );
};

DownloadAsExcel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sheetName: PropTypes.string,
  fileName: PropTypes.string,
};

export default DownloadAsExcel;
