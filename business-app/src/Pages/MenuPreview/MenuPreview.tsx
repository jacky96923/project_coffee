import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";

import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetMenuPreview } from "../../hooks/MenuPreviewAPI";

// Header component
const Header = () => {
  return (
    <header className="bg-white shadow p-4">
      {/* Header content */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold m-4">餐單更新</h1>
      </div>
    </header>
  );
};

// Main content component
const MainContent = () => {
  //   const [category, setCategory]: any = useState([]);
  //   const [item, setItem]: any = useState([]);
  //   useEffect(() => {
  //     setCategory(categorySample);
  //     setItem(itemSample);
  //   }, []);

  // const url = window.location.pathname;
  // console.log(url.charAt(url.length - 1));

  const queryClient = useQueryClient();
  const menuCategoryItem: {
    category: {
      categoryName: string;
      categoryIcon: string;
    };
    itemsInformation: {
      id: number;
      name: string;
      item_photo: string;
      price: number;
      description: string;
      shop_id: number;
      size?: string;
    }[];
  } = GetMenuPreview(1);
  // parseInt(url.charAt(url.length - 1))
  console.log("menuCategoryItem", menuCategoryItem);

  const menuPreview = useMutation({
    mutationFn: async () => {},
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  return (
    <div className="main-content m-2 ">
      {/* Main content */}
      <div className="Topic">
        <h2 className="text-2xl m-8 font-bold underline">餐單預覽</h2>
      </div>
      <div className="content flex">
        <div className="Type m-6">
          <div className="flex">
            <div className="p-3 w-30 m-5 text-2xl font-bold ">類別</div>
            <IoIosAddCircle className="size-12  " />
          </div>

          <div className="flex">
            <div className="p-3 w-30 m-5 text-2xl font-bold ">產品</div>
            <IoIosAddCircle className="size-12" />
          </div>
        </div>

        <div className="cats + items">
          {Array.isArray(menuCategoryItem) ? (
            menuCategoryItem.length > 0 ? (
              menuCategoryItem.map((cat) => (
                <div className="">
                  <div className="flex">
                    {/* All Category Button*/}
                    <div className="Cat flex flex-wrap">
                      <div className="flex justify-around p-3 w-30 m-5 text-2xl font-bold bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl  text-white">
                        <button className="text-xl">
                          {cat.category.categoryName}
                        </button>
                        <FaEdit className="m-3 size-7" />
                      </div>
                    </div>
                  </div>
                  {typeof menuCategoryItem !== "string"
                    ? cat.itemsInformation.map((item: any) => (
                        <div className="flex">
                          <div className="item flex justify-start flex-wrap">
                            <div
                              key={item.id}
                              className="grid grid-cols-2 min-w-0 w-150p h-40 border border-gray-300 mt-6 rounded-lg relative"
                              // onClick={itemPageHandle}
                            >
                              <div className="flex items-center justify-start m-2">
                                <img
                                  className="rounded-md w-auto h-32"
                                  src="{menu.item_photo}"
                                  alt={"menu.name"}
                                />
                              </div>
                              <div className="flex flex-col overflow-hidden justify-start m-2">
                                <div className="text-base m-2 font-bold">
                                  {item.name}
                                </div>
                                <span className="text-xs m-2 truncate">
                                  {item.description}
                                </span>
                                <span className="text-xs m-2 flex justify-end">
                                  ${item.price}
                                </span>
                              </div>
                              <FaEdit className="m-3 size-7 absolute top-0 right-1" />
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              ))
            ) : (
              "No todo Items"
            )
          ) : typeof menuCategoryItem === "string" &&
            menuCategoryItem === "Data is coming" ? (
            <>
              <img alt="loading" />
              <h3>Loading</h3>
            </>
          ) : (
            <>{menuCategoryItem}</>
          )}
        </div>
      </div>
    </div>
  );
};

// App component
const MenuPreview = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default MenuPreview;
