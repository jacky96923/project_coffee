import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";




type RegisterDataType = {
  area: string;
  district?: string;
  address: string;
  login_name: string;
  contact_no: number | undefined;
  login_password: string;
};

// Async thunk for sending data to the server
// export const sendDataToServer = createAsyncThunk(
//   "data/sendToServer",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/YOUR_API_ENDPOINT_HERE", data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const initialState: RegisterDataType = {
  area: "",
  district: "",
  address: "",
  login_name: "",
  contact_no: undefined,
  login_password: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    part_one_data: (
      state,
      action: PayloadAction<{
        login_name: string;
        contact_no: number;
        login_password: string;
      }>
    ) => {
      state.login_name = action.payload.login_name;
      state.contact_no = action.payload.contact_no;
      state.login_password = action.payload.login_password;
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
    // builder
    //   .addCase(sendDataToServer.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(sendDataToServer.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //   })
    //   .addCase(sendDataToServer.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload as null;
    //   });
  },
});

export const { part_one_data, part_two_data } = dataSlice.actions;
export default dataSlice.reducer;
