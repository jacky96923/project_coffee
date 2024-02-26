import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ItemCheckOutState {
  shopId: number;
  shopName: string;
  address: string;
  item: {
    id: number;
    name: string;
    item_photo: string;
    size: string;
    price: number;
    optionList: Array<{
      optionListName: string;
      option: { option_name: string; price: number | null };
    }>;
    quantity: number;
    subTotal: number;
  };
}

export const initialState = {
  shopId: 0,
  shopName: "",
  address: "",
  item: {
    id: 0,
    name: "",
    item_photo: "",
    size: "",
    price: 0,
    optionList: [],
    quantity: 1,
    subTotal: 0,
  },
} as ItemCheckOutState;
export const itemPageSlice = createSlice({
  name: "itemPage",
  initialState,
  reducers: {
    setInitialItems: (
      state: ItemCheckOutState,
      action: PayloadAction<{
        shopId: number;
        shopName: string;
        address: string;
        id: number;
        name: string;
        item_photo: string;
        size: string;
        price: number;
        optionList: Array<{
          optionListName: string;
          option: { option_name: string; price: number | null };
        }>;
      }>
    ) => {
      const {
        shopId,
        shopName,
        address,
        id,
        name,
        item_photo,
        size,
        price,
        optionList
      } = action.payload;
      state.shopId = shopId;
      state.shopName = shopName;
      state.address = address;
      state.item.id = id;
      state.item.name = name;
      state.item.item_photo = item_photo;
      state.item.size = size;
      state.item.price = price;
      state.item.optionList = optionList;
      state.item.quantity = 1
    },

    cupPrice: (
      state: ItemCheckOutState,
      action: PayloadAction<{ price: number }>
    ) => {
      state.item.price = action.payload.price;
    },

    optionAndCost: (
      state: ItemCheckOutState,
      action: PayloadAction<{
        optionListName: string;
        option_name: string;
        price: number | null;
      }>
    ) => {
      let { optionListName, option_name, price } = action.payload;
      // Find the index of the optionList item with matching optionListName
      const index = state.item.optionList.findIndex(
        (item) => item.optionListName === optionListName
      );

      if (index !== -1) {
        // Update the price for the matching optionList item
        state.item.optionList[index] = {
          optionListName,
          option: {
            option_name,
            price,
          },
        };
      }
    },

    updateQuantity: (
      state: ItemCheckOutState,
      action: PayloadAction<number>
    ) => {
      state.item.quantity = action.payload;
    },

    updateSubTotal: (
      state: ItemCheckOutState,
      action: PayloadAction<number>
    ) => {
      state.item.subTotal = action.payload;
    },

    itemCheckOut: (state: ItemCheckOutState) => {
      let shoppingCart: {
        shopId: number;
        shopName: string;
        address: string;
        itemList: {
          item_id: number;
          name: string;
          item_photo: string;
          size: string;
          price: number;
          optionList: Array<{
            optionListName: string;
            option: { option_name: string; price: number | null };
          }>;
          quantity: number;
          subTotal: number;
        }[];
      } | null = JSON.parse(localStorage.getItem("shoppingCart") || "null");

      if (shoppingCart != null) {
        shoppingCart.shopId = state.shopId;
        shoppingCart.shopName = state.shopName;
        shoppingCart.address = state.address;
        shoppingCart.itemList.push({
          item_id: state.item.id,
          name: state.item.name,
          item_photo: state.item.item_photo,
          size: state.item.size,
          price: state.item.price,
          optionList: state.item.optionList,
          quantity: state.item.quantity,
          subTotal: state.item.subTotal,
        });
      } else {
        shoppingCart = {
          shopId: state.shopId,
          shopName: state.shopName,
          address: state.address,
          itemList: [
            {
              item_id: state.item.id,
              name: state.item.name,
              item_photo: state.item.item_photo,
              size: state.item.size,
              price: state.item.price,
              optionList: state.item.optionList,
              quantity: state.item.quantity,
              subTotal: state.item.subTotal,
            },
          ],
        };
      }
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      let checkout = JSON.parse(localStorage.getItem("shoppingCart") || "null");
      console.log("redux check checkout", checkout);
    },
  },
});

export const {
  itemCheckOut,
  cupPrice,
  optionAndCost,
  setInitialItems,
  updateQuantity,
  updateSubTotal,
} = itemPageSlice.actions;
export default itemPageSlice.reducer;
