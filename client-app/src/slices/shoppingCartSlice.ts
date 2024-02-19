import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../store";

type item = {}

type cartType = {
  pickupTime: string  
  
};

const initialState: cartType = {
  pickupTime: ""
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    changePickupTime: (state, action: PayloadAction<string>) => {
      state.pickupTime = action.payload
      console.log("redux pickup time", state.pickupTime)
    }
  },
});

export const { changePickupTime } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
