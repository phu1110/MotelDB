import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
    
    const handlePageChange = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };
    useEffect(() => {
        getPostData(page, pageSize)
            .then(apiData => {
                setData(apiData.data.post);
                setTotalCount(apiData.data.total);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
            headerName: 'Quản lý duyệt',
            width: 70,
            renderCell: (params) => (
                <Button variant="outlined" color="primary" onClick={() => handleApproveDialog(params.row)}>
                    Duyệt
                </Button>
            ),
        },
    ];
    return (
        <div>
            <DataGrid
                rows={data}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
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