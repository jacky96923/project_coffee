import React from "react";
import CategoryButton from "../../components/CategoryButton";
import ProductFromShop from "../../components/ProductFromShop";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { GetMenuPage } from "../../hooks/dataAPI";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

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
            id: number;
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
  console.log("result", result);

  let categoryNameList: { categoryName: string }[] = [];
  let itemsInformationList: {
    category: string;
    id: number;
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
    itemsInformationList = result.categoryItemList.flatMap((item) => {
      return item.itemsInformation.map((i) => {
        return { ...i, category: item.categoryName };
      });
    });
  }
  console.log(
    "itemnameList",
    itemsInformationList.map((item) => item.name)
  );
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
    <div className=" container mx-auto w-360">
      <div className="m-4">
        <div className="flex justify-around">
          <div className="flex">
            <button
              onClick={() => navigate("/shopSelection")}
              className={`self-center btn btn-circle btn-sm`}
            >
              <ChevronLeftIcon className="h-5 w-5 text-green-800" />
            </button>

            {typeof result === "string"
              ? ""
              : result.shopInformation.data.length > 0
              ? result.shopInformation.data.map((shop) => (
                  <div>
                    <div className="m-2 text-sm	font-bold	">
                      <h1>{shop.shop_name}</h1>
                    </div>
                    <div className="m-2 w-44 text-sm	font-bold	">
                      <h1>{shop.address}</h1>
                    </div>
                  </div>
                ))
              : "No shop information"}
          </div>
          <div className="flex m-2">
            <div className="m-2 ">
              <span className=" text-sm w-auto p-2 bg-gradient-to-r from-light-green to-dark-green rounded-2xl font-bold text-white">
                評論區
              </span>
            </div>
            {/* <div>
              <div className="m-2 w-6">
                <PhoneIcon />
              </div>
            </div> */}
          </div>
        </div>
        <hr className="mt-3" />
        <div className="flex ">
          {categoryNameList.map((category) => (
            <div className="m-1">
              <button className="flex w-auto p-2 bg-green-800 mt-2 rounded-2xl font-bold text-white">
                {category.categoryName}
              </button>
            </div>
          ))}
        </div>

        {typeof result !== "string"
          ? result.categoryItemList.map((cat) => (
              <div id={cat.categoryName}>
                <div className="m-5 font-bold">{cat.categoryName}</div>
                <div>
                  {cat.itemsInformation.map((item) => {
                    const itemPageHandle = () => {
                      navigate(`/itemPage/${item.id}`);
                    };

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "grid",
                          // border: "1px solid grey",
                          margin: "20px",
                          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          borderRadius: "10px",
                          width: "auto",
                          height: "10rem",
                          // filter: "drop-shadow(0 0 0.75rem)"
                        }}
                        className="shadow-xl"
                        onClick={itemPageHandle}
                      >
                        <div className="flex items-center justify-center m-2">
                          <img
                            className="rounded-md w-40 h-32"
                            src={item.item_photo}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden m-2">
                          <span className="text-base m-2 font-bold">
                            {item.name}
                          </span>
                          <span className="text-xs m-2 truncate">
                            {item.description}
                          </span>
                          <span className="text-xs m-2 flex justify-end">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          : ""}

        {/* <div className="flex justify-center m-10 bg-black text-white rounded-xl fixed bottom-0 left-0 right-0 h-auto">
          <button className="m-3" onClick={() => navigate("/shoppingCart")}>
            檢視購物車
          </button>
        </div> */}
      </div>
    </div>
  );
}
