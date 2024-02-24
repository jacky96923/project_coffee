import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type loginType = {
  user: string | undefined;
  user_id: number | undefined;
  isAuthenticated: string | undefined
};

let decoded: { id: number; username: string; type: string } | undefined;
if (localStorage.getItem("token")) {
  decoded = jwtDecode(localStorage.getItem("token")!);
}

const initialState: loginType = {
  user: decoded?.username || undefined,
  user_id: decoded?.id || undefined,
  isAuthenticated: decoded?.type || undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: string, user_id: number, type: string}>) => {
      const {user, user_id, type} = action.payload;
      state.user = user
      state.user_id = user_id
      state.isAuthenticated = type
      console.log("user in redux", state.user)
      console.log("userID in redux", state.user_id)
    },
    logout: (state) => {
      state.user = undefined
      state.user_id = undefined
      localStorage.clear()
      state.isAuthenticated = undefined
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
