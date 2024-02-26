import React from "react";
import Sidebar from "../../component/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../component/Header";

function MainPage() {
    const shop: string = useSelector((state: RootState) => state.auth.shop) as string
    return (

        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <Header title={shop} />
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-row lg:flex-col">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Card title!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 className="text-5xl font-bold">商店簡介</h1>
                                <p className="py-6">商店資料中的"介紹你的咖啡店"</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;
