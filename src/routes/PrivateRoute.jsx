import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import SideBar from '../components/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import { UserContext } from '../context/UserContext';
const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);
   if(user.auth === false) 
   return <>
 <Navigate to="/login" />;
   </>

  return (
    <>
      <div className='dashboard-container'>
    <SideBar menu={sidebar_menu} />
    <div className='dashboard-body'>
     {props.children}
     </div>
     </div>
    </>
  )
}

export default PrivateRoute