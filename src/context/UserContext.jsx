import React from 'react'

const UserContext = React.createContext({ firstname : '', lastname: '',role: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ firstname : '', lastname: '',role: '', auth: false });

  const loginContext = (token,firstname,lastname,role) => {
    setUser((user) => ({
      firstname:firstname,
      lastname:lastname,
      role:role,
      auth: true,
    }));
    localStorage.setItem('token',token);
    localStorage.setItem('firstname',firstname);
    localStorage.setItem('lastname',lastname);
    localStorage.setItem('role',role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    setUser((user) => ({
      firstname:'',
      lastname:'',
      role:'',
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