import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type loginType = {
  user: string | undefined;
  user_id: number | undefined;
  isAuthenticated: boolean
};

let decoded: { user_id: number; username: string } | undefined;
if (localStorage.getItem("token")) {
  decoded = jwtDecode(localStorage.getItem("token")!);
}

const initialState: loginType = {
  user: decoded?.username || undefined,
  user_id: decoded?.user_id || undefined,
  isAuthenticated: localStorage.getItem('token') !== null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: string, user_id: number}>) => {
      const {user, user_id} = action.payload;
      state.user = user
      state.user_id = user_id
      state.isAuthenticated = true
      console.log("user in redux", state.user)
    },
    logout: (state) => {
      state.user = undefined
      localStorage.removeItem('token')
      state.isAuthenticated = false
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
