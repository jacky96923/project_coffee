import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import itemPageSlice from "./slices/itemPageSlice";
import navbarSlice from "./slices/navbarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
    itemPage: itemPageSlice,
    navbar: navbarSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
