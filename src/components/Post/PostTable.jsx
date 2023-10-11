import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import EditDialog from '../../components/Post/EditPost_Dialog'
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import {deletePost, getPostData} from '../../api/api';

const PostTable = () => {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

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
    },[page, pageSize]);

    const handleSort = (property) => {
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortBy]?.toLowerCase();
        const bValue = b[sortBy]?.toLowerCase();

        return sortOrder === 'asc' ? aValue?.localeCompare(bValue) : bValue?.localeCompare(aValue);
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const handleEditDialog = (rowData) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
    };
    const handleDelete = (id) => {
        deletePost(id);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div><Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        ID
                    </TableCell>
                    <TableCell>
                        Tiêu Đề
                    </TableCell>
                    <TableCell>
                        Số Ảnh
                    </TableCell>
                    <TableCell>
                        Mô Tả
                    </TableCell>
                    <TableCell>
                        Địa Chỉ
                    </TableCell>
                    <TableCell>
                        Diện Tích
                    </TableCell>
                    <TableCell>
                        Danh Mục
                    </TableCell>
                    <TableCell>
                        Ngày Tạo
                    </TableCell>
                    <TableCell>
                        Ngày Duyệt
                    </TableCell>
                    <TableCell>
                        Giá
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={sortBy === 'status'}
                            direction={sortOrder}
                            onClick={() => handleSort('status')}
                        >
                            Trạng Thái Duyệt
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={sortBy === 'isHire'}
                            direction={sortOrder}
                            onClick={() => handleSort('isHire')}>
                            Trạng Thái Thuê
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        Chủ Trọ
                    </TableCell>
                    <TableCell>
                        Hành Động
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.actualFile}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.area}</TableCell>
                        <TableCell>{row.categorylist.join(', ')}</TableCell>
                        <TableCell>{row.formattedDatecreated}</TableCell>
                        <TableCell>{row.formattedDateapprove === null ?
                            'Chưa có ngày duyệt'
                            : row.formattedDateapprove}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.isHire}</TableCell>
                        <TableCell>{row.authorname}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" onClick={() => handleEditDialog(row)}>Sửa</Button>
                            <Button variant="outlined" color="error" onClick={() => handleDelete(row.id)}>Xoá</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {selectedRowData && (
                <EditDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    rowData={selectedRowData}
                />
            )}
        </Table>
            <TablePagination
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={totalCount}
                rowsPerPage={pageSize}
                page={page - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
            />
        </div>


    );
};

export default PostTable;
