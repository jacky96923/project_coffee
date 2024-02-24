import { BellIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import styles from "./ReceiptPage.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { ReceiptAPI } from "../../hooks/receiptAPI";

export default function Receipt() {
    const navigate = useNavigate()
    const { transactionId } = useParams()
    //console.log(typeof transactionId, transactionId)
    const receiptData = ReceiptAPI(transactionId as string)
    console.log("receiptData", receiptData)
    localStorage.setItem("shopId", JSON.stringify(receiptData?.shopId))

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
    console.log("pickupStatus", receiptData?.pickupStatus)

    // console.log("wtf", receiptData?.orderDetails[0])
    const onCommentHandler = () => {
        localStorage.setItem("commentingShop", receiptData?.shopName)
        navigate(`/comment/${transactionId}`)
    }
    return (
        <div className={styles.container}>
            <div className="flex items-center justify-between my-5">
                <div className="flex">
                    <button
                        onClick={() => navigate(`/receipt/all`)}
                        className={`self-center btn btn-circle btn-sm`}
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-black" />
                    </button>                    
                    <h3 className="self-center ml-3">訂單收據</h3>
                </div>
                <BellIcon className="h-6 w-6" />
            </div>
            <div className="flex justify-between">
                <h3 className="self-center">{receiptData?.shopName}</h3>
                <button className="btn">
                    單號
                    <div className="badge badge-secondary">{transactionId?.padStart(4, "0")}</div>
                </button>
            </div>
            <div>
                <ul className="menu bg-base-200 w-5/6 mx-auto my-2 rounded-box">
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">店舖地址:</h6>
                            <p>{receiptData?.shopAddress}</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">下單時間:</h6>
                            <p>{receiptData?.orderTime}</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">取餐時間:</h6>
                            <p>{receiptData?.pickupTime}</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">付款金額:</h6>
                            <p>${receiptData?.total}</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">付款方式:</h6>
                            <p>Stripe</p>
                        </div>
                    </li>
                    <li>
                        <h6 className="font-bold mx-auto text-red-500 text-lg">{receiptData?.pickupStatus ? "已取餐" : "未取餐"}</h6>
                    </li>
                    {receiptData?.pickupStatus === false ? 
                        receiptData?.commented === false? <>
                        <li>
                            <div>
                                <p><span className="font-bold">用餐愉快!</span><br />給予評價/意見可獲額外積分獎賞</p>
                            </div>
                        </li>
                        <li>
                            <button className="font-bold self-center" onClick={onCommentHandler}>立即評價!</button>
                        </li>
                        </>
                        : <li>
                            <button className="font-bold self-center">已評價</button>
                        </li>
                    :""
                    }
                </ul>
                {/* item menu */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-xs">
                        <thead>
                            <tr>
                                <th className="font-bold text-black">購買餐點</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(receiptData?.orderDetails) ? receiptData.orderDetails.map((order: any) =>
                                <tr className="hover">
                                    <td>{order.itemName}{order.itemSize !== null ? '(' + order.itemSize + ')' : ""}</td>
                                    <td>{order.chosenoptionlist.join(", ")}</td>
                                    <td>x{order.quantity}</td>
                                    <td>${order.subTotal}</td>
                                </tr>) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
