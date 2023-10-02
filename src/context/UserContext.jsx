import React from 'react'

const UserContext = React.createContext({ phone: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ phone: '', auth: false });

  const loginContext = (phone,token) => {
    setUser((user) => ({
      phone: phone,
      auth: true,
    }));
    localStorage.setItem('phone', phone);
    localStorage.setItem('token',token)
  };

  const logout = () => {
    localStorage.removeItem('phone');
    localStorage.removeItem('token');
    setUser((user) => ({
      phone: '',
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