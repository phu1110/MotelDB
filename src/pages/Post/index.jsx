import React, { useState, useEffect } from 'react';
import fetchDataFromApi from '../../api/postget';
import PostTable from '../../components/Post/PostTable';

import '../styles.css';

function Post() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
  
    const handlePageChange = (event, newPage) => {
        setPage(newPage + 1);
      };
    
      const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing page size
      };
    useEffect(() => {
        fetchDataFromApi(page, pageSize)
            .then(apiData => {
                setData(apiData.post);
                setTotalCount(apiData.total);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page, pageSize]);
    return (
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                {/* <table>
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
                                    <td><span>{item.categorylist.join(', ')}</span></td>
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
                )} */}
                <PostTable 
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange} 
                    totalCount={totalCount}
                />
            </div>
        </div>
    )
}

export default Post;