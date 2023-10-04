import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import ExpensedataReducer from "./Expensedata";
const store = configureStore({
  reducer: { auth: authReducer, expensedata: ExpensedataReducer },
});
export default store;