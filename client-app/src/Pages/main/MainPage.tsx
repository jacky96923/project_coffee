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
    <div className="relative overflow-hidden bg-white m-9">
      <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl ">
        早晨, {username}
      </h1>
      <Search />
      <h2 className=" m-3 text-2xl font-bold tracking-tight  sm:text-6xl ">
        今日最抵 -
      </h2>
      <Carousels />
      <MainThreeButton />
      <MainBottomNavBar />
      <h1 className="flex justify-center mt-9 border p-3 ">最新消息</h1>
      <img
        src="https://flash-coffee.com/zh-hk/wp-content/uploads/sites/21/2022/06/HK-zh-set1-1080x1080jpg-600x600.jpg"
        alt="image"
      />
    </div>
  );
}
