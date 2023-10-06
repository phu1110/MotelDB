import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);
   if(user.auth === false) 
   return <>
 <Navigate to="/login" />;
   </>

  return (
    <>
     {props.children}
    </>
  )
}

export default PrivateRoute