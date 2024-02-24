import Sidebar from "../../component/Sidebar";
import AddItemTopBar from "../../component/AllItemTopBar";
import styles from "../AllItem/AllItem.module.css";
import ItemTable from "../../component/ItemTable";
import { useNavigate } from "react-router-dom";

export default function AllItem() {
  const navigate = useNavigate();
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
            <ItemTable />
          </div>
        </div>
      </div>
    </>
  );
}
