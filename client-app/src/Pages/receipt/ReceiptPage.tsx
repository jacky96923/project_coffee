import { BellIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import styles from "./ReceiptPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ReceiptAPI } from "../../hooks/receiptAPI";
import { TiTick } from "react-icons/ti";

export default function Receipt() {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  //console.log(typeof transactionId, transactionId)
  const receiptData = ReceiptAPI(transactionId as string);
  console.log("receiptData", receiptData);
  localStorage.setItem("shopId", JSON.stringify(receiptData?.shopId));

  // const [waitForPickupStatusTimes, setWaitForPickupStatusTimes] = useState(0)
  // const [collected, setCollected] = useState(false)
  // useEffect(() => {
  //     if (receiptData.pickupStatus) {
  //         setCollected(receiptData?.pickupStatus)
  //     } else {
  //         setWaitForPickupStatusTimes(waitForPickupStatusTimes+1)
  //         console.log("Wait for pickupStatus update", waitForPickupStatusTimes)
  //     }
  // }, [waitForPickupStatusTimes])
  console.log("pickupStatus", receiptData?.pickupStatus);

  // console.log("wtf", receiptData?.orderDetails[0])
  const onCommentHandler = () => {
    localStorage.setItem("commentingShop", receiptData?.shopName);
    navigate(`/comment/${transactionId}`);
  };
  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between my-5">
        <div className="flex">
          <button
            onClick={() => navigate(`/receipt/all`)}
            className={`self-center btn btn-circle btn-sm`}
          >
            <ChevronLeftIcon className="h-5 w-5 text-green-800" />
          </button>
          <h3 className="self-center ml-3 text-xl	font-bold">訂單收據</h3>
        </div>
        <BellIcon className="h-6 w-6" />
      </div>
      <div className="flex justify-between">
        <div></div>
        <button className="btn">
          ID:{" "}
          <div className=" text-black ">{transactionId?.padStart(4, "0")}</div>
        </button>
      </div>
      <h3 className="self-center text-center m-3 text-2xl font-bold text-green-800">
        {receiptData?.shopName}
      </h3>

      <div>
        <ul className="menu bg-base-200 w-5/6 mx-auto my-2 rounded-box">
          <li>
            <div className="flex">
              <h6 className="font-bold text-base">店舖地址:</h6>
              <p className="text-base	">{receiptData?.shopAddress}</p>
            </div>
          </li>
          <li>
            <div className="flex">
              <h6 className="font-bold text-base">下單時間:</h6>
              <p className="text-base">{receiptData?.orderTime}</p>
            </div>
          </li>
          <li>
            <div className="flex">
              <h6 className="font-bold text-base">取餐時間:</h6>
              <p className="text-base">{receiptData?.pickupTime}</p>
            </div>
          </li>
          <li>
            <div className="flex">
              <h6 className="font-bold text-base">付款金額:</h6>
              <p className="text-base">${receiptData?.total}</p>
            </div>
          </li>
          <li>
            <div className="flex">
              <h6 className="font-bold text-base">付款方式:</h6>
              <p className="text-base">Stripe</p>
            </div>
          </li>
          <li>
            {receiptData?.pickupStatus ? (
              <h6 className="font-bold mx-auto text-green-500 text-base">
                <TiTick className="size-8" />
              </h6>
            ) : (
              <h6 className="font-bold mx-auto text-red-500 text-base">
                未取餐
              </h6>
            )}
          </li>
          {receiptData?.pickupStatus === true ? (
            receiptData?.commented === false ? (
              <>
                <li>
                  <div>
                    <p>
                      <span className="font-bold">用餐愉快!</span>
                      <br />
                      給予評價/意見可獲額外積分獎賞
                    </p>
                  </div>
                </li>
                <li>
                  <button
                    className="font-bold self-center"
                    onClick={onCommentHandler}
                  >
                    立即評價!
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="font-bold self-center"></button>
              </li>
            )
          ) : (
            <li>
              <div className="">
                <p className=" text-center">
                  取餐後可給予
                  <span className="font-bold">評價和意見</span>
                  以獲得額外積分獎賞
                  <br />
                  {/* <span className="font-bold ">以獲得額外積分獎賞</span> */}
                </p>
              </div>
            </li>
          )}
        </ul>
        {/* item menu */}
        <div className="overflow-x-auto mt-10 ">
          <table className="table table-zebra table-sm text-base">
            <thead>
              <tr>
                <th className="font-bold text-black text-xl text-center ">
                  購買餐點
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(receiptData?.orderDetails)
                ? receiptData.orderDetails.map((order: any) => (
                    <tr className="hover">
                      <td className="text-base">
                        {order.itemName}
                        {order.itemSize !== null
                          ? "(" + order.itemSize + ")"
                          : ""}
                      </td>
                      <td className="text-base">
                        {order.chosenoptionlist.join(", ")}
                      </td>
                      <td className="text-base">x{order.quantity}</td>
                      <td className="text-base">${order.subTotal}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
