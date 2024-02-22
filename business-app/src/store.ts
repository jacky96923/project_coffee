import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import regReducer from "./slices/RegSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //  reg: regReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
