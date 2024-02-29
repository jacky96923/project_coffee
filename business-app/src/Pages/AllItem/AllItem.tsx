import Sidebar from "../../component/Sidebar";
import styles from "../AllItem/AllItem.module.css";
import ItemTable from "../../component/ItemTable";
import { useNavigate } from "react-router-dom";
import { GetAllItem, passCheckedItem } from "../../hooks/AllItemAPI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AllItem() {
  const shopId: any = useSelector<RootState>((state) => state.auth.shop_id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [checkedItem, setCheckedItem] = useState<number[]>([]);

  let updatedCheckedItem = [];

  const addToCheckedItem = (checkId: number) => {
    updatedCheckedItem = [...checkedItem];
    updatedCheckedItem.push(checkId);
    setCheckedItem(updatedCheckedItem);
    console.log("addToCheckedItem", updatedCheckedItem);
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
      }> = GetAllItem();

  useEffect(() => {
    setSortState(items);
  }, [items]);
  //     let itemListForRedux: {
  //   itemName: string;
  //   itemId: number;
  // }[] = [];

  // if (Array.isArray(items)) {
  //   itemListForRedux = items.map((entry) => {
  //     for (let item of entry.item) {
  //       return { itemId: item.itemId, itemName: item.itemName };
  //     }
  //   }) as {
  //     itemName: string;
  //     itemId: number;
  //   }[];
  // }
  // dispatch(setInitialItemList(itemListForRedux));

  //for sorting onClick button
  const [searchQuery, setSearchQuery] = useState("");
  const [sortState, setSortState] = useState(items);

  let searchResults: typeof items = [];
  if (Array.isArray(items)) {
    searchResults = items.map((entry) => ({
      item: entry.item.filter((subEntry) =>
        subEntry.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }

  let sortItemTrue: typeof items = [];
  console.log("check items", items);
  if (Array.isArray(items)) {
    sortItemTrue = items
      .map((entry) => ({
        item: entry.item.filter((subEntry) => subEntry.status === true),
      }))
      .filter((entry) => entry.item.length > 0);
    console.log("check sortItemTrue", sortItemTrue);
  }

  let sortItemFalse: typeof items = [];
  if (Array.isArray(items)) {
    sortItemFalse = items
      .map((entry) => ({
        item: entry.item.filter((subEntry) => subEntry.status === false),
      }))
      .filter((entry) => entry.item.length > 0);
    console.log("check sortItemTrue", sortItemFalse);
  }
  //for sorting onClick button

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

  useEffect(() => {
    setCheckedItem([]);
    updatedCheckedItem = [];
  }, [items]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full h-full">
          <div>
            <div className="search">
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
                <div className="navbar bg-base-100 border-2 rounded-lg ">
                  <div className="flex-1">
                    <span>分類:</span>
                    <a
                      className="btn btn-ghost"
                      onClick={() => setSortState(items)}
                    >
                      所有
                    </a>
                    <a
                      className="btn btn-ghost"
                      onClick={() => setSortState(sortItemTrue)}
                    >
                      供應中
                    </a>
                    <a
                      className="btn btn-ghost"
                      onClick={() => setSortState(sortItemFalse)}
                    >
                      暫停中
                    </a>
                  </div>
                  <div className="flex-none gap-2">
                    <div className="form-control">
                      <input
                        type="text"
                        placeholder="搜尋產品"
                        className="input input-bordered w-24 md:w-auto"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                      />
                    </div>
                    <a
                      className="btn btn-ghost"
                      onClick={() => setSortState(searchResults)}
                    >
                      搜尋
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className=" w-full ">
                  {/* head */}
                  <thead>
                    <tr className="">
                      <th></th>
                      <th>產品圖片</th>
                      <th>產品名稱</th>
                      <th>產品大小</th>
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
                    {typeof sortState === "string"
                      ? ""
                      : sortState.length > 0
                      ? sortState.map((entry) =>
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
      </div>
    </>
  );
}
