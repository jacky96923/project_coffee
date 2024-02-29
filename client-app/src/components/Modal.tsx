import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import moment from "moment";
import { changePickupTime } from "../slices/shoppingCartSlice";

type pickupModalProps = {
  show: boolean;
  onClose: () => void;
};

type NoShoppingCartModalProps = {
  show: boolean;
  onMain: () => void;
  onBackward: () => void;
};

type NoUserLoginModalProps = {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
};

type ConfirmClearCartModalProps = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export function PickupModal(props: pickupModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [pickupTime, setPickupTime] = useState("");
  const [pickupTimeList, setPickupTimeList] = useState([] as string[]);

  useEffect(() => {
    const defaultPickupTime = moment().add(10, "m").format("HH:mm");
    let timeList = [];
    for (let i = 0; i < 10; i++) {
      const newTime = moment(defaultPickupTime, "HH:mm")
        .add(i * 15, "m")
        .format("HH:mm");
      timeList.push(newTime);
    }
    //console.log("in effect", timeList)
    setPickupTime(defaultPickupTime);
    //console.log("Pickup Time", pickupTime)
    dispatch(changePickupTime(defaultPickupTime));
    setPickupTimeList(timeList);
  }, []);

  //console.log("out of effect", pickupTimeList)

  const onSelectTimeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPickupTime(e.target.value);
    // console.log(pickupTime) // no change before render?
    dispatch(changePickupTime(e.target.value));
    props.onClose();
  };

  return (
    <>
      <dialog
        id="my_modal_1"
        className={props.show === true ? "modal modal-open" : "modal"}
      >
        <div className="modal-box w-11/12 max-w-xs">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={props.onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">自取時間</h3>
          <select
            className="modal-action select w-full max-w-sm"
            defaultValue={pickupTime}
            onChange={(e) => onSelectTimeHandler(e)}
          >
            {pickupTimeList.map((pickupTime, index) => (
              <option key={index} value={pickupTime}>
                {pickupTime}
              </option>
            ))}
          </select>
        </div>
      </dialog>
    </>
  );
}

export function ConfirmClearCartModal(props: ConfirmClearCartModalProps) {
  return (
    <>
      <dialog
        id="my_modal_1"
        className={props.show === true ? "modal modal-open" : "modal"}
      >
        <div className="modal-box w-11/12 max-w-xs">
          <h6>清空購物車後需重新選擇商店及商品</h6>
          <h6>確認清空購物車嗎?</h6>
          <button
            className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost"
            onClick={props.onClose}
          >
            取消
          </button>
          <button
            className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost"
            onClick={props.onDelete}
          >
            確認
          </button>
        </div>
      </dialog>
    </>
  );
}

export function NoShoppingCartModal(props: NoShoppingCartModalProps) {
  return (
    <>
      <dialog
        id="my_modal_1"
        className={props.show === true ? "modal modal-open" : "modal"}
      >
        <div className="modal-box w-11/12 max-w-xs">
          <h6>你的購物車還沒有商品</h6>
          <p>請先選擇店舖及將商品加入購物車</p>
          <div className="flex justify-around">
            <button
              className="btn btn-sm border rounded-2xl w-20 btn-circle btn-ghost"
              onClick={props.onBackward}
            >
              返回上一頁
            </button>
            <button
              className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost"
              onClick={props.onMain}
            >
              返回主頁
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function NoUserLoginModal(props: NoUserLoginModalProps) {
  return (
    <>
      <dialog
        id="my_modal_1"
        className={props.show === true ? "modal modal-open" : "modal"}
      >
        <div className="modal-box w-11/12 max-w-xs">
          <h6>你還未登入</h6>
          <button
            className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost"
            onClick={props.onClose}
          >
            返回
          </button>
          <button
            className="btn btn-sm border rounded-2xl w-16 btn-circle btn-ghost"
            onClick={props.onLogin}
          >
            登入
          </button>
        </div>
      </dialog>
    </>
  );
}
