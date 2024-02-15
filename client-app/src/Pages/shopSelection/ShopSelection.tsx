import React from "react";
import Search from "../../components/Search";

import MainBottomNavBar from "../../components/BottomNavBar";
import ShopDisplaying from "../../components/shopDisplaying";

export default function ShopSelection() {
  return (
    <div className="relative overflow-hidden bg-white m-9">
      <h1 className="text-2xl	font-bold tracking-tight sm:text-6xl">
        尋找咖啡店
      </h1>
      <hr />
      <Search />
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
