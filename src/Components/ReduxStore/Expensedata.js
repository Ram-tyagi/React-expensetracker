import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialAuthState = {
  data: [],
};

const expensedataSlice = createSlice({
  name: "expensedata",
  initialState: initialAuthState,
  reducers: {
    manipulateData(state, action) {
     
      state.data = action.payload;
    },
  },
});
export const expensedataActions = expensedataSlice.actions;
export default expensedataSlice.reducer;

export function addExpense({ spend, description, catogary }) {
  return async function addExpenseThunk(dispatch, getState) {
    const state = getState();
    let data = state.expensedata.data;
    let response = await axios.post(
      "https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense.json",
      {
        spend,
        description,
        catogary,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let dataArr = { catogary, description, spend, id: response.data.name };
      dispatch(expensedataActions.manipulateData([...data, dataArr]));
    } else {
      console.log("Error:" + response.data);
    }
  };
}
export function getallExpense() {
  return async function getallExpenseThunk(dispatch, getState) {
    let response = await axios.get(
      "https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense.json"
    );
    if (response.status === 200) {
      response = response.data;
      let expensearr = [];
      for (const key in response) {
        expensearr.push({
          id: key,
          catogary: response[key].catogary,
          description: response[key].description,
          spend: response[key].spend,
        });
      }
      dispatch(expensedataActions.manipulateData(expensearr));
    } else {
      console.log("err", response);
    }
  };
}
export function editExpense({ spend, description, catogary, id }) {
  return async function editExpenseThunk(dispatch, getState) {
    try {
      const state = getState();
      const copyexpensedata = [...state.expensedata.data];

      const expenseIndex = copyexpensedata.findIndex((val) => val.id === id);

      // Make a copy of the expense object
      const updatedExpense = { ...copyexpensedata[expenseIndex] };

      // Update the properties of the copied expense
      updatedExpense.spend = spend;
      updatedExpense.description = description;
      updatedExpense.catogary = catogary;

      // Update the copy of the data array
      copyexpensedata[expenseIndex] = updatedExpense;

      dispatch(expensedataActions.manipulateData(copyexpensedata));

      const response = await axios.put(
        `https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          spend,
          description,
          catogary,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log("Error", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

export function deleteExpense(id) {
  return async function deleteExpenseThunk(dispatch, getState) {
    const state = getState();
    let copyexpensedata = [...state.expensedata.data];
    copyexpensedata = copyexpensedata.filter((val) => {
      return val.id !== id;
    });
    dispatch(expensedataActions.manipulateData(copyexpensedata));

    let response = await axios.delete(
      `https://expensetrackerdatabase-581fe-default-rtdb.firebaseio.com/expense/${id}.json`
    );
    if (response.status === 200) {
      alert("successfully deleted");
    } else {
      console.log("Error", response.data);
    }
  };
}