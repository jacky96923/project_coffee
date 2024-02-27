import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type ItemTableProps = {
  key: number;
  itemId: number;
  itemName: string;
  itemPhoto: string;
  size: string | null;
  price: number;
  status: boolean;
  type: string;
  addToCheckedItem: (checkId: number) => void;
  removeFromCheckedItem: (checkId: number) => void;
};

export default function ItemTable(props: ItemTableProps) {
  const [checked, setChecked] = useState(false);
  const checkId = props.itemId;
  const addToCheckedItem = props.addToCheckedItem;
  const removeFromCheckedItem = props.removeFromCheckedItem;

  // useEffect(() => {
  //   // Check if any other items have the same name as the current item
  //   const itemsWithSameName = document.querySelectorAll(
  //     `tr[data-item-name="${props.itemName}"]`
  //   );
  //   if (checked) {
  //     // If the current item is checked, check all items with the same name
  //     itemsWithSameName.forEach((item) => {
  //       item.classList.add("checked");
  //       const itemId = parseInt(item.getAttribute("data-item-id") || "");
  //       addToCheckedItem(itemId);
  //     });
  //   } else {
  //     // If the current item is unchecked, uncheck all items with the same name
  //     itemsWithSameName.forEach((item) => {
  //       item.classList.remove("checked");
  //       const itemId = parseInt(item.getAttribute("data-item-id") || "");
  //       removeFromCheckedItem(itemId);
  //     });
  //   }
  // }, [checked, props.itemName, addToCheckedItem, removeFromCheckedItem]);

  // const handleChange = (checkId: number) => {
  //   setChecked(!checked);
  // };

  const handleChange = (checkId: number) => {
    if (checked) {
      removeFromCheckedItem(checkId);
    } else {
      addToCheckedItem(checkId);
    }
    setChecked(!checked);
  };

  return (
    <tr>
      <th>
        <label>
          <input
            id={String(checkId)}
            type="checkbox"
            className="checkbox"
            onChange={() => handleChange(checkId)}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={props.itemPhoto} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div></div>
        </div>
      </td>
      <td>{props.itemName}</td>
      <td>{props.size === null ? "不適用" : props.size}</td>
      <td>{props.price}</td>
      <td>{props.type}</td>
      <td style={{ color: props.status === true ? "green" : "red" }}>
        {props.status === true ? "供應中" : "暫停中"}
      </td>
      <th>
        <button className="btn btn-ghost btn-s">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-400" />
        </button>
      </th>
    </tr>
  );
}
