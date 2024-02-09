import React from "react";
import Carousels from "../../components/MainCarousels";
import Search from "../../components/MainSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MainBottomNavBar from "../../components/MainBottomNavBar";
import MainThreeButton from "../../components/MainThreeButton";

export default function ClientMainPage() {
  const username = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="relative overflow-hidden bg-white">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        早晨, {username}
      </h1>
      <hr />
      <Search />
      <Carousels />
      <MainThreeButton />
      <MainBottomNavBar />
    </div>
  );
}
