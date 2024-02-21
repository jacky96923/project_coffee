import Sidebar from "../../component/Sidebar";
import AddItemTopBar from "../../component/AddItemTopBar";
import style from "../AddItem/addItem.module.css";
import ItemTable from "../../component/ItemTable";

export default function AddItem() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={style.content}>
          <div className={style.pageTitle}>
            所有商品{" "}
            <button className="btn bg-gradient-to-r from-light-brown to-dark-brown text-white">
              添加商品
            </button>
          </div>

          <div className={style.searchBar}>
            <AddItemTopBar />
          </div>
          <div>
            <ItemTable />
          </div>
        </div>
      </div>
    </>
  );
}
