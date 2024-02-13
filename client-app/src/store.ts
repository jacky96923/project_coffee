import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;