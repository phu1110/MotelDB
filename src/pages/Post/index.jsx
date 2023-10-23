import React, { useState, useEffect } from 'react';
import PostTable from '../../components/Post/PostTable';
import DataGridPost from '../../components/Post/DataGridPost';
import DashboardHeader from '../../components/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles.css';
function Post() {
    return (
    <Container maxWidth="xl">
    <div className='dashboard-content'>
            {/* <div className='dashboard-content-container'>
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
                )}
                <PostTable />
            </div> */}
            <DashboardHeader btnText="Thêm người dùng"/>
            <DataGridPost/>
        </div>
        </Container>
        
    )
}

export default Post;