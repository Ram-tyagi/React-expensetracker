import { createSlice } from "@reduxjs/toolkit";
const initialThemeState = {
  toggle: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.toggle = !state.toggle;
    },
  },
});
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;