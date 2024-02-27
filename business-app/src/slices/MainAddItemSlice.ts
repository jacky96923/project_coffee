import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import MainAddItem from "../Pages/AddItem/MainAddItem";

export interface FormState {
  itemName: string;
  itemPhoto: string;
  itemSizePrice: {
    size: string | null;
    price: number;
  }[];
  itemTypeId: string;
  description: string;
}

export const initialState = {
  itemName: "",
  itemPhoto: "",
  itemSizePrice: [
    {
      size: "",
      price: 0,
    },
  ],
  itemTypeId: "",
  description: "",
} as FormState;

export const mainAddItemSlice = createSlice({
  name: "addItem",
  initialState,
  reducers: {
    //setInitialFirstPageForm
    //setInitialSecondPageForm
    //setInitialThridPageForm
    //saveFristPageFrom
    saveFirstPageForm: (
      state: FormState,
      action: PayloadAction<{
        itemName: string;
        itemPhoto: string;
        itemSize: string;
        itemSizePrice: {
          size: string | null;
          price: number;
        }[];
        itemTypeId: string;
        description: string;
      }>
    ) => {
      state.itemName = action.payload.itemName;
      state.itemPhoto = action.payload.itemPhoto;
      state.description = action.payload.description;
      state.itemTypeId = action.payload.itemTypeId;
      if (action.payload.itemSize === "0") {
        state.itemSizePrice = action.payload.itemSizePrice.splice(3, 1);
      } else {
        state.itemSizePrice = action.payload.itemSizePrice.splice(1, 3);
      }
    },

    //saveSecondPageFrom
    //saveThridPageFrom
  },
});

export const { saveFirstPageForm } = mainAddItemSlice.actions;
export default mainAddItemSlice.reducer;
