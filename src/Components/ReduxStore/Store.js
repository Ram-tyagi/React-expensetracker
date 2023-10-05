import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import ExpensedataReducer from "./Expensedata";
import ThemeReducer from "./Theme";
const store = configureStore({
  reducer: {
    auth: authReducer,
    expensedata: ExpensedataReducer,
    theme: ThemeReducer,
  },
});
export default store;