import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { getUserRole, getRoles, putUserRole } from '../../api/api';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ConfirmationModal from '../../components/Users/ConfirmationModal'
import { toast } from 'react-toastify';
export default function DataGridRole() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [totalPage, setTotalPage] = useState();
  const [RoleOptions, setRoleOptions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRoleid, setSelectedRole] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    getUser(page, pageSize);
    getRoles().then(apiRole => {
      setRoleOptions(apiRole.data);
    })
  }, []);
  const getUser = (page, pageSize) =>{
    getUserRole(page, pageSize)
    .then(apiData => {
      setData(apiData.data.users);
      setTotalCount(apiData.data.total);
      setTotalPage(apiData.data.totalPages);
      console.log(apiData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  const handleFirstPage = () => {
    setPage(1);
    getUser(page, pageSize);
};
const handleLastPage = () => {
    setPage(totalPage);
    getUser(page, pageSize);
};
const handlePageSizeChange = (newPageSize) => {
    if (newPageSize >= 1) {
        setPageSize(newPageSize);
        setPage(1);
        getUser(1, newPageSize);
    }
};
const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
        setPage(newPage);
        getUser(page, pageSize);
    }
};
  const handleUpdateClick = () => {
      toast.info(
        <ConfirmationModal
            handleDeleteConfirmed={() => handleConfirmed()}
            hideToast={hideToast}
        />,
        {
            position: 'top-right',
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );
    
  }
  const handleConfirmed = async () => {
    try {
      if(selectedRoleid !=null && selectedIds.length > 0){
        await putUserRole(selectedIds, selectedRoleid);}
        toast.success('Cập nhật thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
        });
        getUser(page, pageSize);
    } catch (error) {
        toast.error('Cập nhật không thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
        });
    }
  };
  const hideToast = () => {
    toast.dismiss();
  };
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
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        rowSelectionModel={selectedIds}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedIds(newRowSelectionModel);
        }}
        hideFooterPagination={true}
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
      <div className="w-full flex justify-end mt-4 space-x-4">
                <Button variant="contained" color="primary" onClick={() => handleFirstPage()} disabled={page === 1}>
                    Trang Đầu
                </Button>
                {pageNumbers.map((pageNumber) => (
                    <Button
                        variant="outlined"
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={pageNumber === page ? 'active' : ''}
                        disabled={pageNumber === page }
                    >
                        {pageNumber}
                    </Button>
                ))}
                <Button variant="outlined" color="secondary" onClick={() => handleLastPage()} disabled={page === totalPage }>
                    Trang Cuối
                </Button>
                <select onChange={(e) => handlePageSizeChange(parseInt(e.target.value))} value={pageSize}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
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
          Tải Xuống
        </Button>
      </GridToolbarContainer>
  );
}