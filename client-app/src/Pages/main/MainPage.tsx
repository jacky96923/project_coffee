import React from "react";
import Carousels from "../../components/Carousels";
import Search from "../../components/Search";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MainBottomNavBar from "../../components/BottomNavBar";
import MainThreeButton from "../../components/ThreeButton";

export default function MainPage() {
  const username = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="relative overflow-hidden bg-white m-9">
      <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl ">
        早晨, {username}
      </h1>
      <hr />
      <Search />
      <Carousels />
      <MainThreeButton />
      <MainBottomNavBar />
      <h1 className="flex justify-center mt-9 border p-3 ">最新消息</h1>
      <img src="" alt="" />
    </div>
  );
}
