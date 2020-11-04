import { createSlice } from "@reduxjs/toolkit";

export const Auth = createSlice({
  name: "user",
  initialState: {
    value: 0,
  },
  reducers: {
    login: (state) => {
      state.value = 1;
    },
    logout: (state) => {
      state.value = 0;
    },
  },
});

export const { login, logout } = Auth.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user.value;

export default Auth.reducer;
