import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type loginType = {
  user: string | undefined;
  id: number | undefined;
  type: string | undefined;
};

let decoded: { id: number; username: string; type: string } | undefined;
if (localStorage.getItem("token")) {
  decoded = jwtDecode(localStorage.getItem("token")!);
}

const initialState: loginType = {
  user: decoded?.username || undefined,
  id: decoded?.id || undefined,
  type: decoded?.type || undefined,
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
