import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateLogin = (props) => {
  const { user } = useContext(UserContext);

  if (user.auth === true) {
    const storedPath = localStorage.getItem('path');
    // Kiểm tra xem đường dẫn đã lưu trong localStorage có tồn tại hay không
    const pathToNavigate = storedPath ? storedPath : '/users'; // Thay thế '/defaultFallbackPath' bằng đường dẫn mặc định của bạn

    return <Navigate to={pathToNavigate} />;
  }

  return <>{props.children}</>;
};

export default PrivateLogin;
