import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Post from './pages/Post';
import './index.css'
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import AppRouter from './routes/AppRouter';
function App () {
  const {user, loginContext} = useContext(UserContext);
  useEffect (() => {
    if(localStorage.getItem("token"))
    {
      loginContext(localStorage.getItem("token"),localStorage.getItem("firstname"),localStorage.getItem("lastname"),localStorage.getItem("role"));
    }
  },[])
console.log(user)
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/posts" element={<Post/>} />
                  <Route exact path="/locations" element={<div></div>} />
                  <Route exact path="/profile" element={<div></div>} />
              </Routes>
          </div>
      </div>
    </Router>
    <AppRouter/>
  )
}

export default App;