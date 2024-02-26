// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { GetAllItem } from "../hooks/AllItemAPI";

// type itemListType = {
//   itemList: { itemName: string; itemId: number }[];
// };
// function getItemListForRedux() {
//   const items:
//     | string
//     | Array<{
//         item: Array<{
//           itemId: number;
//           itemName: string;
//           itemPhoto: string;
//           size: string | null;
//           price: number;w
//           status: boolean;
//           type: string;
//         }>;
//       }> = GetAllItem();

//   let itemListForRedux: {
//     itemName: string;
//     itemId: number;
//   }[] = [];

//   if (Array.isArray(items)) {
//     itemListForRedux = items.map((entry) => {
//       for (let item of entry.item) {
//         return { itemId: item.itemId, itemName: item.itemName };
//       }
//     }) as {
//       itemName: string;
//       itemId: number;
//     }[];
//   }
//   return itemListForRedux;
// }

// const initialState: itemListType = {
//   itemList: getItemListForRedux(),
// };

// export const itemSlice = createSlice({
//   name: "item",
//   initialState,
//   reducers: {
//     addItem: (
//       state,
//       action: PayloadAction<{ itemName: string; itemId: number }>
//     ) => {
//       //   const { itemId, itemName } = action.payload;
//       state.itemList.push(action.payload);
//     },
//   },
// });

// export const { addItem } = itemSlice.actions;

// export default itemSlice.reducer;

export default function item() {
  return;
}
