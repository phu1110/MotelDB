import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { deletePost, getPostData } from '../../api/api';
import Button from '@mui/material/Button';
import EditDialog from '../../components/Post/EditPost_Dialog'
import ApprovePost from '../../components/Post/ApprovePost';
import ConfirmationModal from '../../components/Users/ConfirmationModal'
import { toast } from 'react-toastify';
export default function DataGridPost() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [totalPage, setTotalPage] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [openApproveDialog, setopenApproveDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedDataApprove, setselectedDataApprove] = useState(null);
    const [showMoreStates, setShowMoreStates] = useState({});
    const [sortby, setSortBy] = useState('dateCreated');
    const [isAscending, setisAscending] = useState(null);
    const [hireState, setHireState] = useState(null);
    const [statusState, setstatusState] = useState(null);
    const [minPrice, setminPrice] = useState(null);
    const [maxPrice, setmaxPrice] = useState(null);
    const [minArea, setminArea] = useState(null);
    const [maxArea, setmaxArea] = useState(null);
    const [category, setcategory] = useState(null);
    const [isVip, setisVip] = useState(null);
    const toggleShowMore = (rowId) => {
        setShowMoreStates((prevShowMoreStates) => ({
            ...prevShowMoreStates,
            [rowId]: !prevShowMoreStates[rowId],
        }));
    };
    const handleFirstPage = () => {
        setPage(1);
        loadData(page, pageSize);
    };
    const handleLastPage = () => {
        setPage(totalPage);
        loadData(page, pageSize);
    };
    const handlePageSizeChange = (newPageSize) => {
        if (newPageSize >= 1) {
            setPageSize(newPageSize);
            setPage(1);
            loadData(1, newPageSize);
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
            setPage(newPage);
            loadData(newPage, pageSize);
        }
    };

    const loadData = (hireState, statusState,minPrice, maxPrice,minArea,maxArea,category,isVip,sortby,isAscending,page, pageSize) => {
             getPostData(hireState, statusState,minPrice, maxPrice,minArea,maxArea,category,isVip,sortby,isAscending,page, pageSize)
            .then(apiData => {
                setData(apiData.data.post);
                setTotalCount(apiData.data.total);
                setTotalPage(apiData.data.totalPages);
                console.log(apiData);
            });
    }
    useEffect(() => {
        loadData(hireState, statusState,minPrice, maxPrice,minArea,maxArea,category,isVip,sortby,isAscending,page, pageSize);
    }, []);

    const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
    const handleEditDialog = (rowData) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
    };
    const handleApproveDialog = (rowData) => {
        setselectedDataApprove(rowData);
        setopenApproveDialog(true);
    };
    const handleDelete = (id) => {
        toast.info(
            <ConfirmationModal
                handleDeleteConfirmed={() => handleDeleteConfirmed(id)}
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
    };
    const hideToast = () => {
        toast.dismiss();
    };
    const handleDeleteConfirmed = async (id) => {
        try {
            await deletePost(id);
            toast.success('Xóa dữ liệu thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        } catch (error) {
            toast.error('Xóa dữ liệu không thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    const handleCloseDialog = () => {
        loadData(page, pageSize);
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
            renderCell: (params) => {
                const content = params.value;
                const characterLimit = 70;
                const rowId = params.id;

                if (content && content.length > characterLimit) {
                    return (
                        <div>
                            {showMoreStates[rowId]
                                ? content
                                : content.slice(0, characterLimit) + '...'}
                            <button onClick={() => toggleShowMore(rowId)} className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-700">
                                {showMoreStates[rowId] ? 'Hiển Thị Ít Lại' : 'Hiển Thị Đầy Đủ'}
                            </button>
                        </div>
                    );
                }

                return content;
            },
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
        <div style={{ width: '100%', margin: 'auto' }}>
            <DataGrid
                rows={data}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                columns={columns}
                hideFooterPagination={true}
                slots={{ toolbar: () => <CustomToolbar data={data} columns={columns} /> }}
            />
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
            <input
  type="text"
  placeholder="Search..."
  //value={searchQuery}
  //onChange={(e) => setSearchQuery(e.target.value)}
/>
        </div>

    )
}
function CustomToolbar({ columns, data }) {
    const exportToCsv = () => {
        const excludedColumns = ['actualFile', 'edit', 'delete', 'approve'];
        const exportColumns = columns.filter((column) => !excludedColumns.includes(column.field));
        const header = exportColumns.map((column) => column.headerName).join(',');
        const csv = [header];

        data.forEach((row) => {
            const rowData = exportColumns
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