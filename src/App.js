import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
console.log(user)
  return(
    <AppRouter/>
  )
}

export default App;