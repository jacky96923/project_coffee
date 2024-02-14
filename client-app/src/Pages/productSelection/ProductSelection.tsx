import { log } from "console";
import React, { useEffect, useState } from "react";
import CategoryButton from "../../components/CategoryButton";
import ProductFromShop from "../../components/ProductFromShop";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";

// interface ProductSelectionPageProps {
//   shopId: number;
// }

export default function ProductSelection() {
  // Fetch products for the selected shop using the shopId
  const url = window.location.pathname;

  console.log(url.charAt(url.length - 1));
  return (
    <div className="m-4">
      <div className="flex justify-around">
        <div className="flex">
          <Link to="/shopSelection">
            <div className="m-2 w-10 ">
              <ChevronLeftIcon />
            </div>
          </Link>
          <div>
            <div className="m-2 text-sm	">
              <h1>Blue Bottle Coffee</h1>
            </div>
            <div className="m-2 text-sm	">
              <h1>中環擺花街38號地舖及1樓</h1>
            </div>
          </div>
        </div>
        <div className="flex m-2">
          <div className="ml-2 ">
            <span className="m-3 text-sm ">評論區</span>
          </div>
          <div>
            <div className="m-2 w-6">
              <PhoneIcon />
            </div>
          </div>
        </div>
      </div>
      <CategoryButton />
      <ProductFromShop />
      <div className="flex justify-center	m-10 bg-black text-white rounded-xl	">
        <button className="m-3		">檢視購物車 | 1件</button>
      </div>
    </div>
  );
}
