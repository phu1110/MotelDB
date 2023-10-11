import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { getUserRole, getRoles, putUserRole } from '../../api/api';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
export default function DataGridRole() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [RoleOptions, setRoleOptions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRoleid, setSelectedRole] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    getUserRole(page, pageSize)
      .then(apiData => {
        setData(apiData.data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    getRoles().then(apiRole => {
      setRoleOptions(apiRole.data);
    })
  }, [page, pageSize]);
  const handleUpdateClick = () => {
    if(selectedRoleid !=null && selectedIds.length > 0){
      putUserRole(selectedIds, selectedRoleid).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'fullname',
      headerName: 'Họ Tên',
      width: 200,
    },
    {
      field: 'rolename',
      headerName: 'Quyền',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Số Điện Thoại',
      width: 150,
    },
  ];
  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        page={page - 1}
        onPageChange={(newPage) => {
          setPage(newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(1);
        }}
        pagination
        pageSizeOptions={[1, 10, 25, 100]}
        checkboxSelection
        rowSelectionModel={selectedIds}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedIds(newRowSelectionModel);
        }}
        slots={{ toolbar: () => <CustomToolbar data={data} columns={columns} /> }}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={RoleOptions}
        getOptionLabel={(option) => option.rolename}
        disableClearable={true}
        onChange={(event, newValue) => {
          setSelectedRole(newValue.id);
        }}
        renderInput={(params) => <TextField {...params} label="Chọn Quyền" inputProps={{
          ...params.inputProps,
          readOnly: true,
        }} />}
      />
      <Button variant="contained" onClick={handleUpdateClick}>Sửa Quyền</Button>
    </div>

  )
}
function CustomToolbar({columns, data}){
  const exportToCsv = () => {
      const header = columns.map((column) => column.headerName).join(',');
      const csv = [header];
    
      data.forEach((row) => {
        const rowData = columns
          .map((column) => {
            let cellValue = row[column.field];
    
            // If the value is an array, join its elements with a delimiter (e.g., a comma)
            if (Array.isArray(cellValue)) {
              cellValue = cellValue.join(', ');
            }
    
            // Check if the cell value is a string containing a comma or a line break
            if (typeof cellValue === 'string' && (cellValue.includes(',') || cellValue.includes('\n'))) {
              cellValue = `"${cellValue.replace(/"/g, '""')}"`; // Escape double quotes
            }
    
            return cellValue;
          })
          .join(',');
    
        csv.push(rowData);
      });
    
      const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'data.csv');
      link.click();
    };
  return (
      <GridToolbarContainer>
        <Button variant="outlined" color="primary" onClick={exportToCsv}>
          Export CSV
        </Button>
      </GridToolbarContainer>
  );
}