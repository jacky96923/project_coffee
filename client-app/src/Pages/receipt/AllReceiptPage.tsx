import { BellIcon } from "@heroicons/react/24/outline"
import styles from "./AllReceiptPage.module.css"

export default function allReceipt() {
    return (
        <div className={styles.container}>
            <div className="flex justify-between my-5">
                <h3>我的訂單</h3>
                <BellIcon className="h-6 w-6" />
            </div>
            <div role="tablist" className="tabs tabs-bordered">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="全部訂單" />
                <div role="tabpanel" className="tab-content p-10">
                    <ul className="menu bg-base-200 w-5/6 mx-auto my-2 rounded-box">
                        <li>
                            
                        </li>
                    </ul>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="未取餐" checked />
                <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="未評價" />
                <div role="tabpanel" className="tab-content p-10">Tab content 3</div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="已標記" />
                <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
            </div>
        </div>
    )
}