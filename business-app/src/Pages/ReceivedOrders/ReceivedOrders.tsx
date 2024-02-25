import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getReceivedOrders from "../../hooks/receivedOrdersAPI"


function NavButtons (){
    const navigate = useNavigate()
    return (
            <div className="flex justify-center fixed bottom-2 w-2/3">
                <button onClick={()=>navigate("/")} className="block mx-auto w-40 h-14 my-1.5 bg-black rounded-2xl font-bold text-white">返回主頁</button>
                <button onClick={()=>navigate("/AllItem")} className="block mx-auto w-40 h-14 my-1.5 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl font-bold text-white">更新商品狀態</button>
            </div>
    )
}

export default function ReceivedOrders () {
    // query for orders data
    const transactions: any = getReceivedOrders()

    // for completing order & pickup order
    const [done, setDone] = useState(false)
    const [collected, setCollected] = useState(false)
    // for showing order details on right side of the screen (false=pending, true=completed)
    const [showCompletedOrder, setShowCompletedOrder] = useState(false)
    // for choosing order
    const [orderIdChosen, setOrderIdChosen] = useState(0)

    return (
    <>  
        <div className="flex w-full">
            <div className="relative h-screen w-2/3 mb-20">
                    <div className="h-1/2 overflow-auto border-b-2 border-black">
                        {Array("0001", "0002", "0003", "0004", "0005", "0006").map((order)=>
                            order!=="0001"? <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-yellow-500 font-bold text-black">
                                <div className="badge badge-primary">
                                    {/* {transactionId?.padStart(4, "0")} */}
                                    {order}
                                </div>
                                <br/>
                                OT: <span>11:25</span>
                            </button> :
                            <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-yellow-500 font-bold text-black">
                                <div className="badge badge-secondary">
                                    {/* {transactionId?.padStart(4, "0")} */}
                                    {order}
                                </div>
                                <br/>
                                OT: <span>11:25</span>
                            </button>
                        )}

                    </div>
                    
                    <div className="h-1/2 overflow-auto">
                        <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-green-500 font-bold text-black">
                            <div className="badge badge-primary">
                                {/* {transactionId?.padStart(4, "0")} */}
                                0001
                            </div>
                            <br/>
                            PT: 11:35
                        </button>
                    </div>

                <NavButtons/>
            </div>
            <div className="w-1/3 border-l-2">
                <div className="flex flex-col overflow-auto">
                    <h1 className="text-center my-5 font-bold">現在時間 <span>11:28:07</span></h1>
                    <button className="btn text-2xl mx-auto w-1/2">
                        單號
                        <div className="badge badge-lg badge-secondary">
                            {/* {transactionId?.padStart(4, "0")} */}
                            0001
                        </div>
                    </button>
                    <div>
                        <h1 className="text-red-500 text-center text-xl mt-5 font-bold">未完成</h1>
                        <h1 className="text-center mt-5 font-bold">
                            下單時間: <span>11:25</span>
                        </h1>
                    </div>
                    <div className="flex justify-center my-5">
                        <h4 className="text-lg fond-bold mr-16">#1</h4>
                        <div className="w-2/5">
                            <h4 className="text-lg fond-bold">XX咖啡</h4>
                            <p>凍</p>
                            <p>多奶</p>
                            <p>預設咖啡豆</p>
                        </div>
                        <h4 className="text-lg fond-bold ml-4">x2</h4>
                    </div>
                    <div className="flex justify-center my-5">
                        <h4 className="text-lg fond-bold mr-16">#2</h4>
                        <div className="w-2/5">
                            <h4 className="text-lg fond-bold">XX咖啡</h4>
                            <p>凍</p>
                            <p>多奶</p>
                            <p>預設咖啡豆</p>
                        </div>
                        <h4 className="text-lg fond-bold ml-4">x2</h4>
                    </div>
                    <div className="flex justify-center my-5">
                        <h4 className="text-lg fond-bold mr-16">#3</h4>
                        <div className="w-2/5">
                            <h4 className="text-lg fond-bold">XX咖啡</h4>
                            <p>凍</p>
                            <p>多奶</p>
                            <p>預設咖啡豆</p>
                        </div>
                        <h4 className="text-lg fond-bold ml-4">x2</h4>
                    </div>
                </div>
                <div className="flex justify-center fixed bottom-2 w-1/3">
                    {/* show 1 of the 2 buttons according to state */}
                    <button onClick={()=>{}} className="block mx-auto w-40 h-14 my-1.5 bg-green-500 rounded-2xl font-bold text-black">
                        完成訂單
                    </button>
                    <button onClick={()=>{}} className="block mx-auto w-40 h-14 my-1.5 bg-indigo-200 rounded-2xl font-bold text-black">
                        訂單已取
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}