import React from "react";
import CategoryButton from "../../components/CategoryButton";
import ProductFromShop from "../../components/ProductFromShop";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { GetCategoryName } from "../../hooks/dataAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductSelection() {
  const url = window.location.pathname;
  console.log(url.charAt(url.length - 1));

  // const menu = MenuId(parseInt(url.charAt(url.length - 1)));
  // console.log("menu", menu);
  const queryClient = useQueryClient();
  const result:
    | string
    | {
        CategoryName: { data: any[] };
        shopInformation: {
          data: Array<{
            id: number;
            shop_name: string;
            address: string;
          }>;
        };
      } = GetCategoryName(parseInt(url.charAt(url.length - 1)));
  // console.log("categoryNameList", categoryNameList);

  // const OnShopItem = useMutation({
  //   mutationFn: async () => {},
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: ["shopDisplaying"],
  //       exact: true,
  //     }),
  // });

  return (
    <div className="m-4">
      <div className="flex justify-around">
        <div className="flex">
          <Link to="/shopSelection">
            <div className="m-2 w-10 ">
              <ChevronLeftIcon />
            </div>
          </Link>

          {typeof result === "string"
            ? ""
            : result.shopInformation.data.length > 0
            ? result.shopInformation.data.map((shop) => (
                <div>
                  <div className="m-2 text-sm	font-bold	">
                    <h1>{shop.shop_name}</h1>
                  </div>
                  <div className="m-2 text-sm	font-bold	">
                    <h1>{shop.address}</h1>
                  </div>
                </div>
              ))
            : "No shop information"}
        </div>
        <div className="flex m-2">
          <div className="m-2 ">
            <span className=" text-sm ">評論區</span>
          </div>
          <div>
            <div className="m-2 w-6">
              <PhoneIcon />
            </div>
          </div>
        </div>
      </div>
      {typeof result === "string"
        ? ""
        : result.CategoryName.data.length > 0
        ? result.CategoryName.data.map((name) => (
            <div className="flex justify-between m-2">
              <button className="flex items-center justify-center w-auto p-2 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
                {name}
              </button>
            </div>
          ))
        : "No category"}

      <ProductFromShop />
      <div className="flex justify-center	m-10 bg-black text-white rounded-xl	">
        <button className="m-3		">檢視購物車 | 1件</button>
      </div>
    </div>
  );
}
