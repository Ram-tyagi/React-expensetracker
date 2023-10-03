import React from "react";
const CreateContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  name: "",
  photourl: "",
  expensedata: [],
  addExpnse: (item) => {},
  setToken: (token) => {},
  setTokenout: () => {},
});
export default CreateContext;