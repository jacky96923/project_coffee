import React from "react";
import Search from "../../components/Search";

import MainBottomNavBar from "../../components/BottomNavBar";
import ShopDisplaying from "../../components/shopDisplaying";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function ShopSelection() {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden bg-white m-9">
      <div className="flex">
        <button
          onClick={() => navigate(-1)}
          className={`self-center btn btn-circle btn-sm`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-black" />
        </button>
        <h1 className="ml-3 text-2xl font-bold tracking-tight sm:text-6xl">
        尋找咖啡店
        </h1>
      </div>
      <hr />
      <Search/>
      <br />
      <br />
      <br />
      <h1>Location map</h1>
      <br />
      <br />
      <br />
      <ShopDisplaying />
      <MainBottomNavBar />
    </div>
  );
}
