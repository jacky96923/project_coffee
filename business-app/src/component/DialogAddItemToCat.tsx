import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { GetAllItem } from "../hooks/AllItemAPI";
import { AddItemToCat } from "../hooks/MenuPreviewAPI";

interface EditDialogProps {
  onClose: () => void;
  categoryName: string;
  categoryId: number;

  isShow: boolean;
}

const DialogAddItemToCat: React.FC<EditDialogProps> = ({
  onClose,
  categoryName,
  categoryId,
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

  let itemListNoDuplicate: {
    itemName: string;
    itemId: number;
  }[] = [];

  let itemListWithDuplicate: {
    itemName: string;
    itemId: number;
    size: string | null;
    price: number;
  }[] = [];

  if (Array.isArray(items)) {
    for (let item of items) {
      itemListWithDuplicate.push({
        itemName: item.item[0].itemName,
        itemId: item.item[0].itemId,
        size: item.item[0].size,
        price: item.item[0].price,
      });
      if (
        itemListNoDuplicate.find(
          (entry) => entry.itemName === item.item[0].itemName
        )
      ) {
        continue;
      } else {
        itemListNoDuplicate.push({
          itemId: item.item[0].itemId,
          itemName: item.item[0].itemName,
        });
      }
    }
  }
  // console.log("itemListNoDuplicate", itemListNoDuplicate);
  // console.log("itemListWithDuplicate", itemListWithDuplicate)
  // console.log("categoryId", categoryId)

  // item name chosen
  const [itemPick, setItemPick] = useState("");
  // item id list chosen
  const [itemIdList, setItemIdList] = useState([] as number[]);

  const itemPickedHandler = (e: any) => {
    let itemIdListChosenWithUndefined = itemListWithDuplicate.map((entry) => {
      if (entry.itemName === e.target.value) {
        return entry.itemId;
      }
    }) as number[];

    let itemIdListChosen = itemIdListChosenWithUndefined.filter(
      (entry) => entry !== undefined
    );

    setItemPick(e.target.value);
    setItemIdList(itemIdListChosen);
    console.log("itemIdListChosen", itemIdListChosen);
    // console.log("e.target.value", e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClose();
  };

  // Mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { catId: number; iId: number[] }) => {
      AddItemToCat(data.catId, data.iId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  if (isShow)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <div className="bg-white rounded-lg p-6 max-w-md absolute">
          <h2 className="text-2xl font-bold mb-4 text-black">增加產品到種類</h2>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex justify-center m-3">
                {/* Item dropdown*/}
                <select
                  onChange={itemPickedHandler}
                  className="select select-bordered w-30 max-w-xs"
                >
                  <option disabled selected>
                    現有產品
                  </option>
                  {itemListNoDuplicate.map((item) => (
                    <option value={item.itemName}>{item.itemName} </option>
                  ))}
                </select>
                <FaArrowRight className="m-3 mt-5" />
                {/* Category select */}
                <details className="dropdown">
                  <summary className=" btn">
                    {" "}
                    <p className="text-red-500">{categoryName}</p>{" "}
                  </summary>
                </details>
              </div>

              {/* Question */}
              <label htmlFor="name" className="block text-base mt-5 text-black">
                <p>
                  您確定要增加 <span className="text-red-500">{itemPick}</span>{" "}
                  到 <span className="text-red-500">{categoryName}</span>{" "}
                  的類別嗎？
                </p>
              </label>
            </div>

            <div className="flex justify-center m-5 ">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded m-2 text-xl	"
                onClick={() => {
                  mutation.mutate({ catId: categoryId, iId: itemIdList });
                }}
              >
                儲存
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded text-xl	m-2"
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

export default DialogAddItemToCat;
