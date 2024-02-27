import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DelItem } from "../hooks/MenuPreviewAPI";
import { GetAllItem } from "../hooks/AllItemAPI";

interface EditDialogProps {
  onClose: () => void;
  categoryName: string;
  categoryId: number;
  ItemId: number;
  ItemName: string;
  isShow: boolean;
}

const DialogDelItem: React.FC<EditDialogProps> = ({
  onClose,
  categoryName,
  categoryId,
  ItemId,
  ItemName,
  isShow,
}) => {
  const items:
    | string
    | Array<{
      item: Array<{
        itemId: number;
        itemName: string;
        itemPhoto: string;
        size: string | null;
        price: number;
        status: boolean;
        type: string;
      }>;
    }> = GetAllItem();

  let itemWithDuplicateId: number[] = []

  if (Array.isArray(items)) {
    for (let item of items) {
      if (item.item[0].itemName === ItemName) {
        itemWithDuplicateId.push(item.item[0].itemId)
      }
    }
  }

  console.log("itemWithDuplicateId", itemWithDuplicateId)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const handleClose = () => {
    console.log("handling close");
    onClose();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (iId: number[]) => DelItem(categoryId, iId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  if (isShow)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <div className="bg-white rounded-lg p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-black">注意⚠️</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-base	 mb-1  text-black"
              >
                <p>
                  您確定要刪除 <span className="text-red-500">{ItemName}</span>{" "}
                  嗎？請注意，一旦刪除，將無法撤銷此操作。{" "}
                </p>
              </label>
            </div>

            <div className="flex justify-end ">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded m-2 text-xl	"
                onClick={() => {
                  mutation.mutate(itemWithDuplicateId);
                }}
              >
                刪除
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded text-xl m-2 "
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else {
    return <></>;
  }
};

export default DialogDelItem;
