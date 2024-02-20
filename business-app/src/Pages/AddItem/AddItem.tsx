import Sidebar from "../../component/Sidebar";
import style from "../AddItem/addItem.module.css";

export default function AddItem() {
  return (
    <>
      <div className={style.allContent}>
        <div className={style.navBarContainer}>
          <Sidebar />
        </div>
        <div className={style.content}>HIHI</div>
      </div>
    </>
  );
}
