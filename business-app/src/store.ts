import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import regReducer from "./slices/RegSlice";
//import itemReducer from "./slices/itemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
    //item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
