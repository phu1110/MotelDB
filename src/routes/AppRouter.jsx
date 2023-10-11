import React from 'react'
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PrivateLogin from './PrivateLogin';
import Post from '../pages/Post';
import Role from '../pages/Role';
import DetailsUser from '../components/Users/Details_User';
import Tiers from '../pages/Tiers/Tier';
import DetailTier from '../components/Tier/DetailTier';
const AppRouter = () => {
  return (
    <Router>
  <ToastContainer />

      <Routes>
  
        <Route
          path="/"
          element={<PrivateRoute><div></div></PrivateRoute>}
        />
        <Route
          path="/users"
          element={<PrivateRoute><Users /></PrivateRoute>}
        />
        <Route
          path="/post"
          element={<PrivateRoute><Post /></PrivateRoute>}
        />
        <Route
          path="/users/:id"
          element={<DetailsUser />}
        />
        <Route
          path="/tier"
          element={<PrivateRoute><Tiers /></PrivateRoute>}
        />
        <Route
          path="/tier/:id"
          element={<PrivateRoute><DetailTier /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute><div></div></PrivateRoute>}
        />
            <Route  path="/role" element={
               <PrivateRoute>
                <Role/>
               </PrivateRoute>} />
        <Route
          path="/login"
          element={<PrivateLogin><Login /></PrivateLogin>}
        />
        <Route
          path="/register"
          element={<Register />}
        />  
      </Routes>
</Router>

  )
}

export default AppRouter