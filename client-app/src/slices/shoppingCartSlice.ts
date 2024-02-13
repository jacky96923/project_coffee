import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type item = {}

type cartType = {
  shop: string | undefined;
  itemList: Array<item> | undefined;

};

const initialState: cartType = {
  shop: JSON.parse(localStorage.getItem("shoppingCart")as string) || undefined,
  itemList: JSON.parse(localStorage.getItem("shoppingCart")as string) || undefined,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.shop = action.payload;
    },
    clearCart: (state, action: PayloadAction<string>) => {

    }
  },
});

export const { login } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
