import React from "react";
const CreateContext = React.createContext({
  expensedata: [],
  addExpnse: (item) => {},
  deleteExpense: (id) => {},
  editExpense: (items) => {},
});
export default CreateContext;