import React from 'react'

const UserContext = React.createContext({ id : '', firstname : '', lastname: '',role: '', avatar: '',auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ id : '', firstname : '', lastname: '',role: '', avatar: '',auth: false });

  const loginContext = (token,id,firstname,lastname,role,avatar) => {
    setUser((user) => ({
      id: id,
      firstname:firstname,
      lastname:lastname,
      role:role,
      avatar:avatar,
      auth: true,
    }));
    localStorage.setItem('token',token);
    localStorage.setItem('id',id);
    localStorage.setItem('firstname',firstname);
    localStorage.setItem('lastname',lastname);
    localStorage.setItem('role',role);
    localStorage.setItem('avatar',avatar);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    setUser((user) => ({
      id : '',
      firstname:'',
      lastname:'',
      role:'',
      avatar:'',
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