import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";

import {
  IoIosAddCircle,
  IoIosCloseCircleOutline,
  IoIosOptions,
} from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

import { IoClose } from "react-icons/io5";

import { GetMenuPreview } from "../../hooks/MenuPreviewAPI";
import DialogEditCategory from "../../component/DialogEditCategory";
import DialogAddCategory from "../../component/DialogAddCategory";
import DialogDelCategory from "../../component/DialogDelCategory";
import DialogDelItem from "../../component/DialogDelItem";
import DialogAddItemToCat from "../../component/DialogAddItemToCat";
import item from "../../slices/itemSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  let shopId = useSelector((state: RootState) => state.auth.shop_id);
  const menuCategoryItem: {
    category: {
      categoryId: number;
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
  } = GetMenuPreview(shopId!);
  // parseInt(url.charAt(url.length - 1))

  // const menuPreview = useMutation({
  //   mutationFn: async () => {},
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: ["menuPreview"],
  //       exact: true,
  //     }),
  // });

  const [originalCatName, setOriginalCatName] = useState("");
  const [originalCatId, setOriginalCatId] = useState(NaN);

  const [originalItemName, setOriginalItemName] = useState("");
  const [originalItemId, setOriginalItemId] = useState(NaN);

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
  const CatEditClick = (targetCatId: number, targetCatName: string) => {
    setOriginalCatId(targetCatId);
    setOriginalCatName(targetCatName);
    setCatEdit(true);
  };
  const CatEditDialogClose = () => {
    setCatEdit(false);
  };

  // catDel State
  const [catDel, setCatDel] = useState(false);
  const CatDelClick = (targetCatId: number, targetCatName: string) => {
    setOriginalCatId(targetCatId);
    setOriginalCatName(targetCatName);
    setCatDel(true);
  };
  const CatDelDialogClose = () => {
    setCatDel(false);
  };

  // itemDel State
  const [itemDel, setItemDel] = useState(false);
  const ItemDelClick = (
    targetItemId: number,
    targetItemName: string,
    targetCatId: number
  ) => {
    setOriginalCatId(targetCatId);
    setOriginalItemId(targetItemId);
    setOriginalItemName(targetItemName);
    setItemDel(true);
  };
  const ItemDelDialogClose = () => {
    setItemDel(false);
  };

  // itemAdd State
  const [itemAdd, setItemAdd] = useState(false);
  const itemAddClick = (
    targetCatId: number,
    targetCatName: string,
    targetItemId: number
  ) => {
    setOriginalCatId(targetCatId);
    setOriginalCatName(targetCatName);
    setOriginalItemId(targetItemId);
    setItemAdd(true);
  };
  const ItemAddDialogClose = () => {
    setItemAdd(false);
  };

  return (
    <div className="main-content m-2 ">
      {/* Main content */}
      <div className="flex justify-between m-5">
        <div className="Topic">
          <h2 className="text-2xl font-bold underline">餐單預覽</h2>
        </div>
        <div className="flex">
          {/* 類別 */}
          <div className="flex">
            <div className="text-2xl font-bold mr-3">新增類別</div>
            <button onClick={() => CatAddClick()}>
              <IoIosAddCircle className="size-10  mr-3" />
            </button>
          </div>

          {/* 產品 */}
          {/* <div className="flex">
            <div className="text-2xl font-bold mr-3 ">產品</div>
            <button onClick={() => itemAddClick()}>
              <IoIosAddCircle className="size-10 mr-3 " />
            </button>
          </div> */}
        </div>
      </div>

      <div className="content flex">
        {/* Cat Button */}
        <div className="cats + items m-3">
          {Array.isArray(menuCategoryItem) ? (
            menuCategoryItem.length > 0 ? (
              menuCategoryItem.map((cat, idx, menuCatItem) => (
                <div className="">
                  <div className="flex justify-around  m-3 p-3 w-52 text-2xl font-bold bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl  text-white item-center">
                    <button
                      className="mr-2"
                      onClick={() =>
                        CatEditClick(
                          cat.category.categoryId,
                          cat.category.categoryName
                        )
                      }
                    >
                      <IoIosOptions className="w-6 h-7" />
                    </button>
                    <button className="text-xl mr-2">
                      {cat.category.categoryName}
                      {/* {cat.category.categoryId} */}
                    </button>
                    <button
                      onClick={() =>
                        CatDelClick(
                          cat.category.categoryId,
                          cat.category.categoryName
                        )
                      }
                    >
                      <div className="">
                        <IoIosCloseCircleOutline className=" w-8 h-8" />
                      </div>
                    </button>
                  </div>

                  {/* All items */}
                  {typeof menuCategoryItem !== "string"
                    ? cat.itemsInformation.map((item: any) => (
                        <div className="flex shadow-xl rounded-2xl	m-10">
                          <div className="item flex justify-start flex-wrap  ">
                            <div
                              key={item.id}
                              className="grid grid-cols-2 min-w-0 w-150p h-40 border-gray-300 m-8 rounded-lg relative"
                              // onClick={itemPageHandle}
                            >
                              <div className="flex items-center justify-start m-2">
                                <img
                                  className="rounded-md w-auto h-32"
                                  src={item.item_photo}
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

                              <button
                                onClick={() =>
                                  ItemDelClick(
                                    item.id,
                                    item.name,
                                    cat.category.categoryId
                                  )
                                }
                              >
                                <div className="ml-2">
                                  <IoClose className="m-3 size-7 absolute top-0 right-1" />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                  {/* add item to cat button */}
                  <div className="flex justify-center m-10">
                    <div className="border-2	flex rounded-xl	  ">
                      <span className="text-lg font-bold m-3 ">新增產品</span>
                      <button
                        onClick={() =>
                          itemAddClick(
                            cat.category.categoryId,
                            cat.category.categoryName,
                            cat.itemsInformation.id
                          )
                        }
                      >
                        <IoIosAddCircleOutline className="size-10  mr-3" />
                      </button>
                    </div>
                  </div>

                  {
                    <DialogEditCategory
                      onClose={CatEditDialogClose}
                      categoryId={originalCatId}
                      categoryName={originalCatName}
                      isShow={catEdit}
                    />
                  }
                  {
                    <DialogAddCategory
                      onClose={CatAddDialogClose}
                      categoryName={originalCatName}
                      isShow={catAdd}
                    />
                  }
                  {
                    <DialogDelCategory
                      onClose={CatDelDialogClose}
                      categoryId={originalCatId}
                      categoryName={originalCatName}
                      isShow={catDel}
                    />
                  }
                  {
                    <DialogDelItem
                      onClose={ItemDelDialogClose}
                      categoryId={originalCatId}
                      categoryName={originalCatName}
                      ItemId={originalItemId}
                      ItemName={originalItemName}
                      isShow={itemDel}
                    />
                  }
                  {
                    <DialogAddItemToCat
                      onClose={ItemAddDialogClose}
                      categoryId={originalCatId}
                      categoryName={originalCatName}
                      isShow={itemAdd}
                    />
                  }
                </div>
              ))
            ) : (
              "請新增產品然後新增餐單"
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
