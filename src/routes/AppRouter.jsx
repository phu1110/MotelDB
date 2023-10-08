import React from 'react'
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SideBar from '../components/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PrivateLogin from './PrivateLogin';
import Post from '../pages/Post';
import DetailsUser from '../components/Users/Details_User';
import Tiers from '../pages/Tiers/Tier';
import DetailTier from '../components/Tier/DetailTier';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<PrivateLogin>
          <Login />
        </PrivateLogin>} />
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
            <Route path="/users" exact element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>} />
            <Route path="/post" exact element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>} />
            <Route path="/users/:id" exact element={
              <DetailsUser />}
              />
            <Route path="/tier" exact element={
              <PrivateRoute>
                <Tiers />
              </PrivateRoute>} />
              <Route path="/tier/:id" exact element={
              <PrivateRoute>
                <DetailTier />
              </PrivateRoute>} />
            <Route exact path="/profile" element={<div></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter