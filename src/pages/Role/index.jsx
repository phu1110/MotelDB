import React from 'react';
import DataGridRole from "../../components/Role/DataGridRole";
import DashboardHeader from '../../components/DashboardHeader';

function Role(){
    return(
        <div className='dashboard-content'>
            <DashboardHeader btnText="Thêm người dùng"/>
            <DataGridRole/>
        </div>
    )
}
export default Role