import React from 'react';
import DataGridRole from "../../components/Role/DataGridRole";
import DashboardHeader from '../../components/DashboardHeader';
import Container from '@mui/material/Container';
function Role() {
    return (
        <Container maxWidth="xl">
            <div className='dashboard-content'>
                <DashboardHeader btnText="Thêm người dùng" />
                <DataGridRole />
            </div>
        </Container>

    )
}
export default Role