import { createSlice } from "@reduxjs/toolkit";
function getItemsFromLocalstorage() {
  let items = localStorage.getItem("token");
  if (!items) return;
  else {
    items = JSON.parse(items);
    return items;
  }
}
function getToken() {
  let itemToken = getItemsFromLocalstorage();
  if (!itemToken) {
    return "";
  } else {
    return itemToken.token;
  }
}
function getEmail() {
  let itemToken = getItemsFromLocalstorage();
  if (!itemToken) {
    return "";
  } else {
    return itemToken.email;
  }
}
function checkToken() {
  if (getToken() === "") {
    return false;
  } else {
    return true;
  }
}
const initialAuthState = {
  token: getToken(),
  email: getEmail(),
  isLoggedIn: checkToken(),
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
      state.isLoggedIn = !!state.token;
      const obj = {
        token: token,
        email: email,
      };
      localStorage.setItem("token", JSON.stringify(obj));
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;