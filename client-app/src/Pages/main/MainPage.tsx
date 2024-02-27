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
    <div className="relative overflow-hidden bg-white mx-5 my-4">
      <div className="drop-shadow-lg">
        <h1
          className="text-3xl font-bold tracking-tight sm:text-6xl mt-4 rounded-lg 

"
        >
          歡迎
          {username ? (
            <>
              , <span className="">{username}</span>
            </>
          ) : (
            ""
          )}
        </h1>
        <Search />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-3 text-center">
        今日最抵
      </h2>
      <div className="flex justify-center mx-auto ">
        <Carousels />
      </div>
      <MainThreeButton />
      <div className="text-2xl font-bold   rounded-2xl	text-center	 ">
        最新消息
      </div>
      <img
        src="https://hillsandvalleys.ph/wp-content/uploads/2023/09/buy-1-get-1-promo-coffee-shop-1024x1024.webp"
        alt="image"
        className=" mt-3 w-76 h-auto rounded-2xl			"
      />
    </div>
  );
}
