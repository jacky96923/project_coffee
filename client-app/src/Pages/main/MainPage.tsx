import React from "react";
import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MainBottomNavBar from "../../components/BottomNavBar";
import MainThreeButton from "../../components/ThreeButton";
import Carousels from "../../components/Carousels";

export default function MainPage() {
  const username = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="relative overflow-hidden bg-white mx-9 my-4">
      <div className="drop-shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl m-2 p-4 bg-slate-200 rounded-lg">
          歡迎{username? <>, <span className="">{username}</span></>:""}
        </h1>
        <Search />
      </div>
      <h2 className=" m-3 text-2xl font-bold tracking-tight ">今日最抵</h2>
      <div className="flex justify-center mx-auto ">
        <Carousels />
      </div>
      <MainThreeButton />
      <h1 className="text-2xl font-bold m-2 border rounded-2xl		 ">
        最新消息
      </h1>
      <img
        src="https://flash-coffee.com/zh-hk/wp-content/uploads/sites/21/2022/06/HK-zh-set1-1080x1080jpg-600x600.jpg"
        alt="image"
        className=" mt-3 w-76 h-auto rounded-2xl			"
      />
    </div>
  );
}
