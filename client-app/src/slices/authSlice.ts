import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type loginType = {
  user: string | undefined;
};

let decoded: { user_id: number; username: string } | undefined;
if (localStorage.getItem("token")) {
  decoded = jwtDecode(localStorage.getItem("token")!);
}

const initialState: loginType = {
  user: decoded?.username || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
