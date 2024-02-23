import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type RegisterDataType = {

  login_name: string;
  shop_name: string;
  login_password: string;
  contact_no: number | undefined;
  area: string;
  district?: string;
  address: string;
};


const initialState: RegisterDataType = {
  login_name: "",
  shop_name: "",
  login_password: "",
  contact_no: undefined,
  area: "",
  district: "",
  address: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    part_one_data: (
      state,
      action: PayloadAction<{
        login_name: string;
        shop_name: string;  
        contact_no: number;
        login_password: string;
      }>
    ) => {
      state.login_name = action.payload.login_name;
      state.shop_name = action.payload.shop_name;
      state.login_password = action.payload.login_password;
      state.contact_no = action.payload.contact_no;
   
    },
    part_two_data: (
      state,
      action: PayloadAction<{
        area: string;
        district?: string;
        address: string;
      }>
    ) => {
      state.area = action.payload.area;
      state.district = action.payload.district;
      state.address = action.payload.address;
    },
  },
  extraReducers: (builder) => {

  },
});

export const { part_one_data, part_two_data } = dataSlice.actions;
export default dataSlice.reducer;
