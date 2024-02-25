import Sidebar from "../../component/Sidebar";
import AddItemTopBar from "../../component/AllItemTopBar";
import styles from "../AllItem/AllItem.module.css";
import ItemTable from "../../component/ItemTable";
import { useNavigate } from "react-router-dom";
import { GetAllItem, passCheckedItem } from "../../hooks/AllItemAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AllItem() {
  const shopId: any = useSelector<RootState>((state) => state.auth.shop_id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [checkedItem, setCheckedItem] = useState<number[]>([]);

  const addToCheckedItem = (checkId: number) => {
    const updatedCheckedItem = [...checkedItem];
    updatedCheckedItem.push(checkId);
    setCheckedItem(updatedCheckedItem);
  };

  const removeFromCheckedItem = (checkId: number) => {
    const updatedCheckedItem = checkedItem.filter((item) => item !== checkId);
    setCheckedItem(updatedCheckedItem);
  };
  console.log("checked checked Array", checkedItem);
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
      }> = GetAllItem(shopId);

  const mutation = useMutation({
    mutationFn: async (checkedItem: number[]) => passCheckedItem(checkedItem),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getAllItem"],
        exact: true,
      }),
  });

  const changeStatusHandler = () => {
    if (checkedItem.length > 0) {
      mutation.mutate(checkedItem);
    } else {
      alert("請選擇產品");
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pageTitle}>
            所有商品{" "}
            <button
              className="btn bg-gradient-to-r from-light-brown to-dark-brown text-white"
              onClick={() => {
                navigate("/AddItem");
              }}
            >
              添加商品
            </button>
          </div>

          <div className={styles.searchBar}>
            <AddItemTopBar />
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>產品圖片</th>
                    <th>產品名稱</th>
                    <th>產品價格</th>
                    <th>產品類別</th>
                    <th>狀態</th>
                    <th>修改資料</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {/* td is each cell */}
                  {/* th is only each check box */}
                  {typeof items === "string"
                    ? ""
                    : items.length > 0
                    ? items.map((entry) =>
                        entry.item.map((subEntry, index) => (
                          <ItemTable
                            key={index}
                            itemId={subEntry.itemId}
                            itemName={subEntry.itemName}
                            itemPhoto={subEntry.itemPhoto}
                            size={subEntry.size}
                            price={subEntry.price}
                            status={subEntry.status}
                            type={subEntry.type}
                            addToCheckedItem={addToCheckedItem}
                            removeFromCheckedItem={removeFromCheckedItem}
                          />
                        ))
                      )
                    : ""}

                  {/* row 2 */}

                  {/* row 3 */}

                  {/* row 4 */}
                </tbody>
                {/* foot */}
              </table>
            </div>
            <div className="flex justify-around">
              <button
                className="btn bg-gradient-to-r bg-emerald-500"
                onClick={changeStatusHandler}
              >
                改變狀態
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
