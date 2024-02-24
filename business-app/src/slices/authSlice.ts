import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type loginType = {
  shop: string | undefined;
  shop_id: number | undefined;
  isAuthenticated: string | undefined;
};

let decoded: { id: number; username: string; type: string } | undefined;
if (localStorage.getItem("token")) {
  decoded = jwtDecode(localStorage.getItem("token")!);
}

const initialState: loginType = {
  shop: decoded?.username || undefined,
  shop_id: decoded?.id || undefined,
  isAuthenticated: decoded?.type || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{shop: string, shop_id: number, type: string}>) => {
      const {shop, shop_id, type} = action.payload;
      state.shop = shop
      state.shop_id = shop_id
      state.isAuthenticated = type
      console.log("shop in redux", state.shop)
      console.log("shopID in redux", state.shop_id)
    },
    logout: (state) => {
    state.shop = undefined
    state.shop_id = undefined
    localStorage.clear()
    state.isAuthenticated = undefined
    }
  }
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
