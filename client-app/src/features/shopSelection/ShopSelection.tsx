import React from "react";
import Carousels from "../../components/Carousels";
import Search from "../../components/Search";

import MainBottomNavBar from "../../components/BottomNavBar";
import ShopDisplaying from "../../components/shopDisplaying";

export default function ShopSelection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl ">
        尋求咖啡店{" "}
      </h1>
      <hr />
      <Search />
      <h1>Location map</h1>
      <ShopDisplaying />
      <MainBottomNavBar />
    </div>
  );
}
