import { ChangeEvent, useEffect, useState } from "react";
export type itemToAdd = {
  itemName: string;
  itemType: { itemTypeName: string; itemTypeId: number } | undefined
  itemSizePrice: Array<{size: string | null; price: number}>
  itemOptionList: Array<{
    optionList: string;
    options: Array<{
      name: string;
      price: number | null;
    }>;
  }>  | undefined
}

type AddItemModalProps = {
  item?: itemToAdd;
  isShow: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export function AddItemModal(props: AddItemModalProps) {
  console.log(props.item?.itemSizePrice)
  return (
    <>
      <dialog
        id="my_modal_1"
        className={props.isShow === true ? "modal modal-open" : "modal"}
      >
        <div className="modal-box w-11/12 max-w-xs">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={props.onClose}
          >X</button>
          <h2 className="font-bold text-lg">確定提交？</h2>
          <h3 className="font-bold text-lg">以下是你的產品資料:</h3>
          <h4>產品名稱:{props.item?.itemName}</h4>
          <h4>產品類別:{props.item?.itemType?.itemTypeName}</h4>
          <div>
            <h4>產品價格:</h4>
            {props.item?.itemSizePrice?.map((entry)=><p>{entry.size==="無"?"":entry.size+": "}${entry.price}</p>)}
          </div>
          <div>
            <h4>產品自選選擇:</h4>
            {props.item?.itemOptionList?.map((entry)=><p>{entry.optionList}: {entry.options.map((option)=><span>{option.name} {option.price===null?"":"(+"+option.price+")"}</span>)}</p>)}
          </div>
          <button className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost" onClick={props.onSubmit}>確定</button>
          <button className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost" onClick={props.onClose}>取消</button>
        </div>
      </dialog>
    </>
  );
}
