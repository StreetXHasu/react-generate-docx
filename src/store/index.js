import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/Auth";

export default configureStore({
  reducer: {
    counter: 1,
    theme: "light",
    user: counterReducer,
  },
});
