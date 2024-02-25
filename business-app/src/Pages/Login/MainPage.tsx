import React from "react";
import Sidebar from "../../component/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../component/Header";

function MainPage (){
    const shop: string = useSelector((state:RootState)=>state.auth.shop) as string
    return (
    
    <div className="flex">
        <Sidebar/>
        <div>
            <Header title={shop}/>
        </div>
    </div>
)}

export default MainPage;
