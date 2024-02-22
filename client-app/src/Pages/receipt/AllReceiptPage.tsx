import { BellIcon, ChevronLeftIcon, StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as FilledStarIcon } from "@heroicons/react/24/solid"
import styles from "./AllReceiptPage.module.css"
import { useState } from "react"

export default function AllReceipt() {
    const [tag, setTag] = useState(false)
    return (
        <div className={styles.container}>
            <div className="flex justify-between my-5">
                <div className="flex">
                    <ChevronLeftIcon className="h-6 w-6 mr-2 self-center" />
                    <h3>我的訂單</h3>
                </div>
                <BellIcon className="h-6 w-6" />
            </div>
            
            <div className="flex justify-center">
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
                        className="tab-content p-10"
                        aria-labelledby="all_orders_tab"
                    >

                        <h6 className="font-bold mb-5 text-xs text-center">如無標記, 訂單紀錄將於6個月後自動刪除</h6>
                        <div className="fixed inset-x-0 mx-auto px-12">
                            <table className="table table-zebra table-xs">
                                <thead>
                                    <tr>
                                        <td colSpan={6} className="text-center font-bold text-black">今天</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <td>Blue Bottle Coffee</td>
                                        <td>朱古力咖啡(小)x1</td>
                                        <td>$34</td>
                                        <td>未取餐</td>
                                        <td>未評價</td>
                                        <td>{tag ? <FilledStarIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>

                    <input
                        type="radio"
                        id="pending_orders_tab"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="未取餐"
                        aria-controls="pending_orders_panel"
                    />
                    <div
                        id="pending_orders_panel"
                        role="tabpanel"
                        className="tab-content p-10"
                        aria-labelledby="pending_orders_tab"
                    >

                        <div className="">
                            <table className="table table-zebra table-xs">
                                <thead>
                                    <tr className="mx-auto text-center">
                                        <h1 className="mx-auto text-center font-bold text-black">今天</h1>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <td>Blue Bottle Coffee</td>
                                        <td>朱古力咖啡(小)x1</td>
                                        <td>$34</td>
                                        <td>未取餐</td>
                                        <td>未評價</td>
                                        <td>{tag ? <FilledStarIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}</td>
                                    </tr>
                                </tbody>
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
                        <div className="fixed">
                            <table className="table table-zebra table-xs">
                                <thead>
                                    <tr className="mx-auto text-center">
                                        <h1 className="mx-auto text-center font-bold text-black">今天</h1>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <td>Blue Bottle Coffee</td>
                                        <td>朱古力咖啡(小)x1</td>
                                        <td>$34</td>
                                        <td>未取餐</td>
                                        <td>未評價</td>
                                        <td>{tag ? <FilledStarIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <input
                        type="radio"
                        id="marked_orders_tab"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="已標記"
                        aria-controls="marked_orders_panel"
                    />
                    <div
                        id="marked_orders_panel"
                        role="tabpanel"
                        className="tab-content p-10"
                        aria-labelledby="marked_orders_tab"
                    >
                        <div>
                            <h1>GG</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}