import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateLogin = (props) => {
  const { user } = useContext(UserContext);

  if (user && user.auth === true) {
    
    const inforpath = user.path;
    return <Navigate to={inforpath}/>;
  }

  return <>{props.children}</>;
};

export default PrivateLogin;
