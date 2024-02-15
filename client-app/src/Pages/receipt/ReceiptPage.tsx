import { BellIcon } from "@heroicons/react/24/outline";
import styles from "./ReceiptPage.module.css"
import { useState } from "react";
import BottomNavBar from "../../components/BottomNavBar";

export default function receipt() {
    const [collected, setCollected] = useState(false)
    const onCommentHandler = ()=>{

    }
    return (
        <div className={styles.container}>
            <div className="flex justify-between my-5">
                <h3>訂單收據</h3>
                <BellIcon className="h-6 w-6" />
            </div>
            <div className="flex justify-between">
                <h3 className="self-center">Blue Bottle Coffee</h3>
                <button className="btn">
                    單號
                    <div className="badge badge-secondary">4001</div>
                </button>
            </div>
            <div>
                <ul className="menu bg-base-200 w-5/6 mx-auto my-2 rounded-box">
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">店舖地址:</h6>
                            <p>中環擺花街38號地舖及1樓</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">下單時間:</h6>
                            <p>10:02</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">取餐時間:</h6>
                            <p>10:30</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">付款金額:</h6>
                            <p>$34</p>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <h6 className="font-bold">付款方式:</h6>
                            <p>Stripe</p>
                        </div>
                    </li>
                    <li>
                        <h6 className="font-bold mx-auto text-red-500 text-lg">未取餐</h6>
                    </li>
                    {collected === false ? <><li>
                        <div>
                            
                            <p><span className="font-bold">用餐愉快!</span><br/>給予評價/意見可獲額外積分獎賞</p>
                        </div>
                    </li><li>
                            <button className="font-bold self-center" onClick={onCommentHandler}>立即評價!</button>
                        </li></>
                        : ""}
                </ul>
                {/* item menu */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-xs">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="font-bold text-black">購買餐點</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>朱古力咖啡(小)</td>
                                <td>少甜, 少冰</td>
                                <td>x1</td>
                                <td>$34</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <BottomNavBar/>
        </div>
    )
}