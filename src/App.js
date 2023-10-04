import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import './index.css'
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import AppRouter from './routes/AppRouter';
function App () {
  const {user} = useContext(UserContext);
  
  return(
    <AppRouter/>
  )
}

export default App;