import { useEffect, useState } from "react";

export type ItemProps = {
  key: number;
  itemId: number;
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

export type ShoppingCartProps = {
  item: ItemProps;
  onDelete: (key: number) => void;
};

export default function ShoppingCartItem(props: ShoppingCartProps) {
  return (
    <div
      key={props.item.key}
      style={{
        display: "flex",
        justifyContent: "space-around",
        border: "1px solid grey",
        margin: "20px",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        borderRadius: "10px",
        position: "relative",
        alignItems: "center",
      }}
    >
      <div className="flex justify-center m-2 h-auto text-center">
        <img
          className=" w-auto h-36 rounded-lg flex justify-center align-middle"
          src={props.item.item_photo}
        ></img>
      </div>
      <div className="flex flex-col m-3">
        <div className="flex justify-between">
          <h6 className="font-bold mb-2 text-md">
            {props.item.name}
            <br />
            <span className="font-bold text-xs">
              {props.item.size !== null ? "(" + props.item.size + ")" : ""}
            </span>
          </h6>
          <span className="font-bold mb-2 text-md">${props.item.price}</span>
        </div>
        <div className="font-bold text-xs">
          {props.item.optionList.map((entry, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{entry.option.option_name}</span>
              <span>
                {entry.option.price !== null ? "+$" + entry.option.price : ""}
              </span>
            </div>
          ))}
        </div>
        <div className="font-bold text-xs mt-2 flex justify-between border-t border-black">
          <span className="">數量</span>
          <span>x{props.item.quantity}</span>
        </div>
        <div className="font-bold text-md flex justify-between h-sm mt-3">
          <button
            className="border rounded-2xl w-16 btn btn-xs btn-error text-white bg-red-600 border-red-600 mr-2"
            onClick={() => {
              props.onDelete(props.item.itemId);
            }}
          >
            刪除
          </button>
          <span>${props.item.subTotal}</span>
        </div>
      </div>
    </div>
  );
}
