import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css'
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
function App () {
  const {user} = useContext(UserContext);
  console.log("check User",user);
  
  return(
    <Router>
      <div className='dashboard-container'>
        <ToastContainer />
        <SideBar menu={sidebar_menu} />
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/users" element={< Users/>} />
                  <Route exact path="/locations" element={<div></div>} />
                  <Route exact path="/profile" element={<div></div>} />
                  <Route exact path="/login" element={< Login/>} /> 
                  <Route exact path="/register" element={< Register/>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;