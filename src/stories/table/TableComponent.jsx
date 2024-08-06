import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types'
import './TableComponent.scss';

const TableComponent = ({ dataObject, widthOfTable = "80%" ,widthOfColums}) => {
  let columns = dataObject.headers.map((header,i) => ({
    field: header,
    headerName: header,
    width: widthOfColums[i],
    align:'center',
    headerAlign: 'center'
  }));

  return (
    <div className="table" style={{ width: widthOfTable ,marginTop:"8%"}}>
      <DataGrid
        rows={dataObject.rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[4, 8]}
      />
    </div>
  );
}

TableComponent.propTypes = {
  dataObject: PropTypes.shape({}).isRequired,
  widthOfTable: PropTypes.string,
  widthOfColums:PropTypes.arrayOf(PropTypes.number).isRequired
};

export default TableComponent;

