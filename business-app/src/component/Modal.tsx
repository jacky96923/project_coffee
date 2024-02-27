import { ChangeEvent, useEffect, useState } from "react";

type AddItemModalProps = {
  itemTypeId: number;
  typeName: string;
  itemoptionlist: Array<{
    optionList: string;
    options: Array<{
      optionName: string;
      optionPrice: number | null;
    }>;
  }>;
  isShow: boolean;
  onClose: () => void;
};

export function AddItemModal(props: AddItemModalProps) {
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
          ></button>
          <h2 className="font-bold text-lg">確定提交？</h2>
          <h3 className="font-bold text-lg">以下是你的產品自訂選項:</h3>
          <div>產品類別:{props.typeName}</div>
        </div>
      </dialog>
    </>
  );
}
