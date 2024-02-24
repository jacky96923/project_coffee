import { useNavigate } from "react-router-dom"


export function NavButtons (){
    const navigate = useNavigate()
    return (
            <div className="flex justify-center fixed bottom-0 w-2/3">
                <button onClick={()=>navigate("/")} className="block mx-auto w-40 h-14 my-1.5 bg-black rounded-2xl font-bold text-white">返回主頁</button>
                <button onClick={()=>navigate("AllItem")} className="block mx-auto w-40 h-14 my-1.5 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl font-bold text-white">更新商品狀態</button>
            </div>
    )
}

export default function ReceivedOrders () {

    return (
    <>  
        <div className="flex w-full">
            <div className="relative h-screen w-2/3 mb-20">
                    <div className="h-1/2 overflow-auto border-b-2 border-black">
                        {Array("0001", "0002", "0003", "0004", "0005", "0006").map((order)=>
                            <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-yellow-500 font-bold text-black">
                                {order}<br/>OT: 11:25
                            </button>
                        )}

                    </div>
                    
                    <div className="h-1/2 overflow-auto">
                        <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-blue-500 font-bold text-black">
                            0001<br/>PT: 11:35
                        </button>
                    </div>

                <NavButtons/>
            </div>
            <div className="w-1/3 border-l-2">

            </div>
        </div>
    </>
    )
}