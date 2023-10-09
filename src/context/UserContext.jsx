import React from 'react'

const UserContext = React.createContext({ firstname : '', lastname: '',role: '', avatar: '',path:'',auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ firstname : '', lastname: '',role: '', avatar: '',path:'',auth: false });

  const loginContext = (token,firstname,lastname,role,avatar,path) => {
    setUser((user) => ({
      firstname:firstname,
      lastname:lastname,
      role:role,
      avatar:avatar,
      path:path,
      auth: true,
    }));
    localStorage.setItem('token',token);
    localStorage.setItem('firstname',firstname);
    localStorage.setItem('lastname',lastname);
    localStorage.setItem('role',role);
    localStorage.setItem('avatar',avatar);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    localStorage.removeItem('path')
    setUser((user) => ({
      firstname:'',
      lastname:'',
      role:'',
      avatar:'',
      path:'',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export  {UserContext, UserProvider};