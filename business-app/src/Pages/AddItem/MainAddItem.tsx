import Sidebar from "../../component/Sidebar";
import styles from "../AddItem/MainAddItem.module.css";
import AddItem from "./AddItem";
import AddType from "./AddType";
import AddOptions from "./AddOptions";

export default function MainAddItem() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pageTitle}>添加商品 </div>
          <div>
            <div role="tablist" className="tabs tabs-lifted tabs-lg">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="添加/更改產品"
                checked
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <AddItem />
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="添加/更改產品類別"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <AddType />
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="添加/更改自訂選項"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <AddOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
