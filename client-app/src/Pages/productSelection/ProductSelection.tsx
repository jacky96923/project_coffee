import React from "react";
import CategoryButton from "../../components/CategoryButton";
import ProductFromShop from "../../components/ProductFromShop";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { GetMenuPage } from "../../hooks/dataAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductSelection() {
  const url = window.location.pathname;
  console.log(url.charAt(url.length - 1));

  // const menu = MenuId(parseInt(url.charAt(url.length - 1)));
  // console.log("menu", menu);
  const queryClient = useQueryClient();
  const result:
    | string
    | {
        categoryItemList: {
          categoryName: string;
          itemsInformation: {
            name: string;
            item_photo: string;
            price: number;
            description: string;
            shop_id: number;
          }[];
        }[];
        shopInformation: {
          data: Array<{
            id: number;
            shop_name: string;
            address: string;
          }>;
        };
      } = GetMenuPage(parseInt(url.charAt(url.length - 1)));

  let categoryNameList: { categoryName: string }[] = [];
  let itemsInformationList: {
    name: string;
    item_photo: string;
    price: number;
    description: string;
    shop_id: number;
  }[] = [];

  if (typeof result !== "string") {
    categoryNameList = result.categoryItemList.map(({ categoryName }) => ({
      categoryName,
    }));

    itemsInformationList = result.categoryItemList.flatMap(
      ({ itemsInformation }) => itemsInformation
    );
  }
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

      {categoryNameList.map((category) => (
        <div className="flex justify-between m-2">
          <button className="flex items-center justify-center w-auto p-2 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
            {category.categoryName}
          </button>
        </div>
      ))}
      {itemsInformationList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            border: "1px solid grey",
            margin: "20px",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            borderRadius: "10px",
          }}
        >
          <img src={item.item_photo} alt={item.name} />
          <div className="flex flex-col m-3">
            <span className="font-bold mb-2 text-sm	">{item.name}</span>
            <span className="font-bold mb-2 text-xs	">{item.description}</span>
            <span className="font-bold flex justify-end">${item.price}</span>
          </div>
        </div>
      ))}

      <ProductFromShop />
      <div className="flex justify-center	m-10 bg-black text-white rounded-xl	">
        <button className="m-3		">檢視購物車 | 1件</button>
      </div>
    </div>
  );
}
