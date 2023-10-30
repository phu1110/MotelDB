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
            <DashboardHeader />
            <DataGridPost/>
        </div>
        </Container>
        
    )
}

export default Post;