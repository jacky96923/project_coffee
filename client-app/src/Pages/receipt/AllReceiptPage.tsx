import { BellIcon, ChevronLeftIcon, StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as FilledStarIcon } from "@heroicons/react/24/solid"
import styles from "./AllReceiptPage.module.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { AllReceiptAPI } from "../../hooks/receiptAPI"
import { useNavigate } from "react-router-dom"
import { data } from "autoprefixer"

export default function AllReceipt() {
    const navigate = useNavigate()
    const userId = useSelector((state: RootState) => state.auth.user_id)
    const allReceiptData: any = AllReceiptAPI(String(userId))
    //console.log("allReceiptData", allReceiptData)
    const [groupDataTimes, setGroupDataTimes] = useState(0)
    const [ratedReceiptData, setRatedReceiptData] = useState([] as any[])
    const [unratedReceiptData, setUnratedReceiptData] = useState([] as any[])

    useEffect(() => {
        if (Array.isArray(allReceiptData)) {
            if (allReceiptData.length > 0){
                let ratedReceiptDataInEffect: any = []
                let unratedReceiptDataInEffect: any = []
                for (let dataEachDate of allReceiptData) {
                    let dateForReceipts = dataEachDate.date
                    // construct ratedReceiptData entry and push into ratedReceiptData
                    const ratedReceiptsEachDate = dataEachDate.receipts.filter((receipt: any) => receipt.commented === true)
                    if (ratedReceiptsEachDate.length > 0) {
                        const ratedReceiptDataEntry = { date: dateForReceipts, receipts: ratedReceiptsEachDate }
                        ratedReceiptDataInEffect = [...ratedReceiptData, ratedReceiptDataEntry]
                    }
                    // construct unratedReceiptData entry
                    const unratedReceiptsEachDate = dataEachDate.receipts.filter((receipt: any) => receipt.commented !== true)
                    if (unratedReceiptsEachDate.length > 0) {
                        const unratedReceiptDataEntry = { date: dateForReceipts, receipts: unratedReceiptsEachDate }
                        unratedReceiptDataInEffect = [...unratedReceiptData, unratedReceiptDataEntry]
                    }
                    setRatedReceiptData(ratedReceiptDataInEffect)
                    setUnratedReceiptData(unratedReceiptDataInEffect)
                    ratedReceiptDataInEffect = []
                    unratedReceiptDataInEffect = []
                }
            }
        } else {
            setGroupDataTimes(groupDataTimes + 1)
            //console.log("try to group data", groupDataTimes)
        }
        // console.log("ratedReceiptData in effect", ratedReceiptData)
        // console.log("unratedReceiptData in effect", unratedReceiptData)
    }, [groupDataTimes]) // confuse in dependency?
    console.log("ratedReceiptData", ratedReceiptData)
    console.log("unratedReceiptData", unratedReceiptData)
    const onNavToSingleReceiptHandler = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        const transactionId = e.currentTarget.id
        console.log(transactionId)
        navigate(`/receipt/${transactionId}`)
    }

    return (
        <div className={`relative ${styles.container}`}>
            <div className="flex items-center justify-between my-5">
                <div className="flex">
                    <button
                        onClick={() => navigate(`/`)}
                        className={`self-center btn btn-circle btn-sm`}
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-black" />
                    </button>
                    <h3 className="self-center ml-3">我的訂單</h3>
                </div>
                <BellIcon className="h-6 w-6" />
            </div>

            <div className="relative flex justify-center" style={{ width: "inherit" }}>
                <div role="tablist" className="tabs tabs-bordered">
                    <input
                        type="radio"
                        id="all_orders_tab"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="全部訂單"
                        aria-controls="all_orders_panel"
                        defaultChecked
                    />
                    <div
                        id="all_orders_panel"
                        role="tabpanel"
                        className="tab-content relative p-10"
                        style={{ width: "inherit" }}
                        aria-labelledby="all_orders_tab"
                    >

                        {/* <h6 className="font-bold mb-5 text-xs text-center">如無標記, 訂單紀錄將於6個月後自動刪除</h6> */}
                        <div className="fixed inset-x-0 mx-auto w-2/3">
                            <table className="table table-zebra table-xs">
                                {Array.isArray(allReceiptData) && allReceiptData.length > 0 ? allReceiptData.map((dateReceipts) => <>
                                    <thead>
                                        <tr>
                                            <td colSpan={6} className="text-center font-bold text-black">{dateReceipts.date}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dateReceipts.receipts.map((entry: any) => {
                                            return (
                                                <tr className="hover" key={entry.transactionId} id={entry.transactionId} onClick={(e) => onNavToSingleReceiptHandler(e)}>
                                                    <td>{entry.shopName}</td>
                                                    <td>{entry.orderTime}</td>
                                                    <td>${entry.total}</td>
                                                    <td>{entry.pickupStatus ? "已取餐" : "未取餐"}</td>
                                                    <td>{entry.commented ? "已評價" : "未評價"}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </>
                                ) : null}
                                {/* <thead>
                                    <tr>
                                        <td colSpan={6} className="text-center font-bold text-black">今天</td>
                                    </tr>
                                </thead> */}
                                {/* <tbody>
                                     <tr className="hover">
                                        <td>Blue Bottle Coffee</td>
                                        <td>$34</td>
                                        <td>未取餐</td>
                                        <td>未評價</td>
                                    </tr>
                                    <tr className="hover">
                                        <td>Blue Bottle Coffee</td>
                                        <td>$34</td>
                                        <td>未取餐</td>
                                        <td>未評價</td>
                                    </tr>
                                </tbody> */}
                            </table>
                        </div>
                    </div>

                    <input
                        type="radio"
                        id="pending_orders_tab"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="已評價"
                        aria-controls="rated_orders_panel"
                    />
                    <div
                        id="pending_orders_panel"
                        role="tabpanel"
                        className="tab-content p-10"
                        aria-labelledby="rated_orders_tab"
                    >
                        <div className="fixed inset-x-0 mx-auto w-2/3">
                            <table className="table table-zebra table-xs">
                            {Array.isArray(ratedReceiptData) && ratedReceiptData.length > 0 ? ratedReceiptData.map((dateReceipts) => <>
                                <thead>
                                    <tr>
                                        <td colSpan={6} className="text-center font-bold text-black">{dateReceipts.date}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dateReceipts.receipts.map((entry: any) => {
                                        return (
                                            <tr className="hover" key={entry.transactionId} id={entry.transactionId} onClick={(e) => onNavToSingleReceiptHandler(e)}>
                                                <td>{entry.shopName}</td>
                                                <td>{entry.orderTime}</td>
                                                <td>${entry.total}</td>
                                                <td>{entry.pickupStatus ? "已取餐" : "未取餐"}</td>
                                                <td>{entry.commented ? "已評價" : "未評價"}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </>
                            ) : null}
                        </table>
                    </div>
                </div>

                <input
                    type="radio"
                    id="unrated_orders_tab"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="未評價"
                    aria-controls="unrated_orders_panel"
                />

                <div
                    id="unrated_orders_panel"
                    role="tabpanel"
                    className="tab-content p-10"
                    aria-labelledby="unrated_orders_tab"
                >
                     <div className="fixed inset-x-0 mx-auto w-2/3">
                            <table className="table table-zebra table-xs">
                            {Array.isArray(unratedReceiptData) && unratedReceiptData.length > 0 ? unratedReceiptData.map((dateReceipts) => <>
                                <thead>
                                    <tr>
                                        <td colSpan={6} className="text-center font-bold text-black">{dateReceipts.date}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dateReceipts.receipts.map((entry: any) => {
                                        return (
                                            <tr className="hover" key={entry.transactionId} id={entry.transactionId} onClick={(e) => onNavToSingleReceiptHandler(e)}>
                                                <td>{entry.shopName}</td>
                                                <td>{entry.orderTime}</td>
                                                <td>${entry.total}</td>
                                                <td>{entry.pickupStatus ? "已取餐" : "未取餐"}</td>
                                                <td>{entry.commented ? "已評價" : "未評價"}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </>
                            ) : null}
                        </table>
                    </div>
                </div>
            </div>

        </div>
        </div >
    )
}