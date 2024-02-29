import Sidebar from "../../component/Sidebar";
import styles from "../AddItem/MainAddItem.module.css";
import AddItem from "./AddItem";
import AddType from "./AddType";
import AddOptions from "./AddOptions";

export default function MainAddItem() {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full h-screen ">
          <header className="bg-white shadow p-4">
            {/* Header content */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold m-4">添加商品</h1>
            </div>
          </header>

          {/* <div>
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
              ></div>

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
          </div> */}
          <div className="overflow-auto">
            <AddItem />
          </div>
        </div>
      </div>
    </>
  );
}
