import React from 'react'
import { Route ,Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);
   if(user && !user.auth)
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