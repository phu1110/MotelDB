import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import fetchDataFromApi from '../../api/postget';
import all_orders from '../../constants/orders';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import EditDialog from '../../components/Dialog'

import '../styles.css';
import { Navigate } from 'react-router';

function Orders() {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };
    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchDataFromApi()
            .then(apiData => {
                setData(apiData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const buttons = [
        {
          text: 'New Post',
          onClick: () => {
          },
        },
        {
          text: 'Edit Post',
          onClick: () => {
          },
        },
        {
            text: 'Delete Post',
            onClick: () => {
            },
        },
      ];
      const [openDialog, setOpenDialog] = useState(false);
      const [selectedRowData, setSelectedRowData] = useState(null);
    
      const handleButton1Click = (rowData) => {
        setSelectedRowData(rowData);
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    return (
        <div className='dashboard-content'>
            <DashboardHeader
                buttons={buttons} />
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Post List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>IMAGE COUNT</th>
                        <th>DESCRIPTION</th>
                        <th>ADDRESS</th>
                        <th>AREA</th>
                        <th>CATEGORY</th>
                        <th>DATE CREATED</th>
                        <th>DATE APPROVED</th>
                        <th>PRICE</th>
                        <th>STATUS</th>
                        <th>HIRE STATUS</th>
                        <th>AUTHOR</th>
                        <th>ACTION</th>
                    </thead>
                    {data.length !== 0 ?
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td><span>{item.id}</span></td>
                                    <td><span>{item.title}</span></td>
                                    <td>
                                        <span>{item.actualFile}</span>
                                    </td>
                                    <td><span>{item.description}</span></td>
                                    <td><span>{item.address}</span></td>
                                    <td><span>{item.area}</span></td>
                                    <td><span>{item.categorylist}</span></td>
                                    <td><span>{item.formattedDatecreated}</span></td>
                                    <td>
                                            <span>{item.formattedDateapprove === null ?
                                                'Chưa có ngày duyệt'
                                                : item.formattedDateapprove}</span>
                                    </td>
                                    <td><span>{item.price}</span></td>
                                    <td><span>{item.status}</span></td>
                                    <td><span>{item.isHire}</span></td>
                                    <td><span>{item.authorname}</span></td>
                                    <td><button onClick={() => handleButton1Click(item)}>Sửa</button><button>Xoá</button></td>
                                </tr>
                            ))}
                        </tbody>
                        : null
                    }
                </table>
                {selectedRowData && (
                    <EditDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        rowData={selectedRowData}
                    />
                )}
            </div>
        </div>
    )
}

export default Orders;