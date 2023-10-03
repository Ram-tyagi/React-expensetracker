import React from "react";
const CreateContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  name: "",
  photourl: "",
  setToken: (token) => {},
  setTokenout: () => {},
});
export default CreateContext;