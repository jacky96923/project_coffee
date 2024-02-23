import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";

import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetMenuPreview } from "../../hooks/MenuPreviewAPI";
import DialogEditCategory from "../../component/DialogEditCategory";
import DialogAddCategory from "../../component/DialogAddCategory";

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

  const menuPreview = useMutation({
    mutationFn: async () => {},
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  // CatAdd State
  const [catAdd, setCatAdd] = useState(false);
  const CatAddClick = () => {
    setCatAdd(true);
  };
  const CatAddDialogClose = () => {
    setCatAdd(false);
  };

  // catEdit State
  const [catEdit, setCatEdit] = useState(false);
  const CatEditClick = () => {
    setCatEdit(true);
  };
  const CatEditDialogClose = () => {
    setCatEdit(false);
  };

  // itemAdd State
  const [itemAdd, setItemAdd] = useState(false);
  const itemAddClick = () => {
    setItemAdd(true);
  };
  const ItemAddDialogClose = () => {
    setItemAdd(false);
  };

  return (
    <div className="main-content m-2 ">
      {/* Main content */}
      <div className="Topic">
        <h2 className="text-2xl m-8 font-bold underline">餐單預覽</h2>
      </div>
      <div className="content flex">
        <div className="Type m-6">
          {/* 類別 */}
          <div className="flex">
            <div className="p-3 w-30 m-5 text-2xl font-bold ">類別</div>
            <button onClick={CatAddClick}>
              <IoIosAddCircle className="size-12  " />
              {catAdd && <DialogAddCategory onClose={CatAddDialogClose} />}
            </button>
          </div>

          {/* 產品 */}
          <div className="flex">
            <div className="p-3 w-30 m-5 text-2xl font-bold ">產品</div>
            <div>
              <button onClick={itemAddClick}>
                <IoIosAddCircle className="size-12  " />
              </button>
            </div>
          </div>
        </div>

        {/* Cat Button */}
        <div className="cats + items">
          {Array.isArray(menuCategoryItem) ? (
            menuCategoryItem.length > 0 ? (
              menuCategoryItem.map((cat) => (
                <div className="">
                  <div className="flex">
                    <div className="Cat flex flex-wrap">
                      <div className="flex justify-around p-3 w-30 m-5 text-2xl font-bold bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl  text-white">
                        <button className="text-xl">
                          {cat.category.categoryName}
                        </button>
                        <button onClick={CatEditClick}>
                          <FaEdit className="m-3 size-7" />
                          {catEdit && (
                            <DialogEditCategory onClose={CatEditDialogClose} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* All items */}
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
                              <IoClose className="m-3 size-7 absolute top-0 right-1" />
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
