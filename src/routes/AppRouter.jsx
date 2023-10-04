import React from 'react'
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SideBar from '../components/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const AppRouter = () => {
  return (
    <Router>
      <Routes><Route exact path="/login" element={< Login />} />
        <Route exact path="/register" element={< Register />} />
      </Routes>
      <div className='dashboard-container'>

        <ToastContainer />
        <SideBar menu={sidebar_menu} />

        <div className='dashboard-body'>
          <Routes>
            <Route path="*" element={<div></div>} />
            <Route exact path="/" element={<PrivateRoute>
                <div></div>
               </PrivateRoute>} />
            <Route  path="/users" element={
               <PrivateRoute>
                <Users/>
               </PrivateRoute>} />
            <Route exact path="/locations" element={<div></div>} />
            <Route exact path="/profile" element={<div></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter