import React from "react";
import CategoryButton from "../../components/CategoryButton";
import ProductFromShop from "../../components/ProductFromShop";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { CategoryId, CategoryName } from "../../hooks/dataAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductSelection() {
  const url = window.location.pathname;
  console.log(url.charAt(url.length - 1));

  // const menu = MenuId(parseInt(url.charAt(url.length - 1)));
  // console.log("menu", menu);
  const queryClient = useQueryClient();
  const categoryId: string | Array<{ id: number }> = CategoryId(
    parseInt(url.charAt(url.length - 1))
  );
  console.log("categoryId", categoryId);

  // const OnShopItem = useMutation({
  //   mutationFn: async () => {},
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: ["shopDisplaying"],
  //       exact: true,
  //     }),
  // });
  const categoryNameList: string | Array<{ id: number }> = CategoryName(
    categoryId as Array<{ id: number }>
  );
  console.log("categoryNameList", categoryNameList);

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
            <div className="m-2 text-sm	font-bold	">
              <h1>Blue Bottle Coffee</h1>
            </div>
            <div className="m-2 text-sm	font-bold	">
              <h1>中環擺花街38號地舖及1樓</h1>
            </div>
          </div>
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
      <CategoryButton />
      <ProductFromShop />
      <div className="flex justify-center	m-10 bg-black text-white rounded-xl	">
        <button className="m-3		">檢視購物車 | 1件</button>
      </div>
    </div>
  );
}
