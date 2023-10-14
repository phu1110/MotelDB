import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { deletePost, getPostData } from '../../api/api';
import Button from '@mui/material/Button';
import EditDialog from '../../components/Post/EditPost_Dialog'
import ApprovePost from '../../components/Post/ApprovePost';
export default function DataGridPost() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [openApproveDialog, setopenApproveDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedDataApprove, setselectedDataApprove] = useState(null);

    const handlePageChange = (newPage) => {
        setPage(newPage + 1);
        loadData();
    };

    const handlePageSizeChange = async (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
        loadData();
    };
    const loadData = async () => {
        await getPostData(page, pageSize)
        .then(apiData => {
            setData(apiData.data.post);
            setTotalCount(apiData.data.total);
            console.log(apiData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    useEffect(() => {
        loadData();
    }, [page, pageSize]);


    const handleEditDialog = (rowData) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
    };
    const handleApproveDialog = (rowData) => {
        setselectedDataApprove(rowData);
        setopenApproveDialog(true);
    };
    const handleDelete = (id) => {
        deletePost(id);
    };

    const handleCloseDialog = () => {
        setselectedDataApprove(null);
        setOpenDialog(false);
        setopenApproveDialog(false)
    };
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'title',
            headerName: 'Tiêu Đề',
            width: 200,
        },
        {
            field: 'actualFile',
            headerName: 'Số Ảnh',
            width: 100,
        },
        {
            field: 'description',
            headerName: 'Mô Tả',
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Địa Chỉ',
            width: 150,
        },
        {
            field: 'area',
            headerName: 'Diện Tích',
            width: 150,
            renderCell: (params) => (
                params.value + " m2"
            ),
        },
        {
            field: 'categorylist',
            headerName: 'Danh Mục',
            width: 150,
            renderCell: (params) => (
                params.value.join(', ')
            ),
        },
        {
            field: 'formattedDatecreated',
            headerName: 'Ngày Tạo',
            width: 150,
        },
        {
            field: 'formattedDateapprove',
            headerName: 'Ngày Duyệt',
            width: 150,
            renderCell: (params) => (
                params.value !== null ? params.value : 'Chưa có ngày duyệt'
            ),
        },
        {
            field: 'price',
            headerName: 'Giá',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Trạng Thái Duyệt',
            width: 150,
        },
        {
            field: 'isHire',
            headerName: 'Trạng Thái Thuê',
            width: 150,
        },
        {
            field: 'authorname',
            headerName: 'Chủ Trọ',
            width: 150,
        },
        {
            field: 'edit',
            headerName: 'Sửa',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <Button variant="contained" color="success" onClick={() => handleEditDialog(params.row)}>Sửa</Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Xoá',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>Xoá</Button>
            ),
        },
        {
            field: 'approve',
            headerName: 'Duyệt',
            width: 70,
            renderCell: (params) => (
                <Button variant="outlined" color="primary" onClick={() => handleApproveDialog(params.row)}>
                    Duyệt
                </Button>
            ),
        },
    ];
    return (
        <div style={{width: '100%', margin: 'auto'}}>
            <DataGrid
                rows={data}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                pagination
                columns={columns}
                pageSize={pageSize}
                page={page}
                onPageChange={(page)=>handlePageChange}
                onPageSizeChange={(pageSize)=>handlePageSizeChange}
                pageSizeOptions={[1, 10, 25, 100]}
                rowCount={totalCount}
                slots={{ toolbar: () => <CustomToolbar data={data} columns={columns} /> }}
            />
            {selectedRowData && (
                <EditDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    rowData={selectedRowData}
                />
            )}
            {selectedDataApprove && (
                <ApprovePost
                    open={openApproveDialog}
                    handleClose={handleCloseDialog}
                    rowData={selectedDataApprove}
                />
            )}
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