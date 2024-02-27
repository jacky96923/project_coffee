import { createSlice } from "@reduxjs/toolkit";

type navbarShowType = {
  show: boolean
};

const initialState: navbarShowType = {
  show: true
};

export const authSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    showNavbar: (state) => {
      state.show = true
    },
    hideNavbar: (state) => {
      state.show = false
    }
  },
});

export const { showNavbar, hideNavbar } = authSlice.actions;

export default authSlice.reducer;
