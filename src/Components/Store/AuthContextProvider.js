import React, { useState } from "react";
import AuthContext from "./auth-context";


const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  if (token == null && localStorage.length !== 0) {
    setToken(localStorage["user"]);
    // setUserEmail(localStorage['userEmail'])
  }

  const userLoggedIn = !!token;

  const loginHandler = (tokenId, email) => {
    setToken(tokenId);
    setUserEmail(email);
    localStorage.setItem('user', tokenId);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('user');
  };


  const authContext = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail, 
    login: loginHandler,
    logout: logoutHandler,
  };


  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;