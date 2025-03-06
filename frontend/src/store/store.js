import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import todoReducer from "../feature/todoSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});
