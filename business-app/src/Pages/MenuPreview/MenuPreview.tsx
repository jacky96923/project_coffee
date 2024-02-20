import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";

import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

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

const categorySample = [
  {
    id: 1,
    name: "推廣産品",
  },
  {
    id: 2,
    name: "經典之作",
  },
  {
    id: 3,
    name: "精選推介",
  },
  {
    id: 4,
    name: "其樂oo",
  },
  {
    id: 5,
    name: "茶味樂園",
  },
];

const itemSample = [
  {
    id: 1,
    name: "濃縮咖啡",
    description: "以濃縮咖啡為基礎的咖啡飲料，傳統上是用蒸奶泡製作的。",
    price: "34",
    item_photo: "https://rare-gallery.com/thumbs/510549-coffee.jpg",
  },
  {
    id: 2,
    name: "玫瑰牛奶咖啡",
    description:
      "玫瑰花做拉花，配合咖啡。可惜的是這店沒有脫脂奶選擇只有oat milk ,也沒有咖啡豆可以選擇，咖啡豆味道偏向fruity 。",
    price: "45",
    item_photo: "https://rare-gallery.com/thumbs/510549-coffee.jpg",
  },
  {
    id: 3,
    name: "玫瑰牛奶咖啡",
    description:
      "玫瑰花做拉花，配合咖啡。可惜的是這店沒有脫脂奶選擇只有oat milk ,也沒有咖啡豆可以選擇，咖啡豆味道偏向fruity 。",
    price: "45",
    item_photo: "https://rare-gallery.com/thumbs/510549-coffee.jpg",
  },
  {
    id: 4,
    name: "玫瑰牛奶咖啡",
    description:
      "玫瑰花做拉花，配合咖啡。可惜的是這店沒有脫脂奶選擇只有oat milk ,也沒有咖啡豆可以選擇，咖啡豆味道偏向fruity 。",
    price: "45",
    item_photo: "https://rare-gallery.com/thumbs/510549-coffee.jpg",
  },
];

// Main content component
const MainContent = () => {
  const [category, setCategory]: any = useState([]);
  const [item, setItem]: any = useState([]);
  useEffect(() => {
    setCategory(categorySample);
    setItem(itemSample);
  }, []);
  return (
    <div className="main-content m-2 ">
      {/* Main content */}
      <div>
        <h2 className="text-2xl m-8 font-bold underline">餐單預覽</h2>
      </div>

      <div className="flex">
        <div>
          <div className="p-3 w-40 m-5 text-2xl font-bold ">類別</div>
          <IoIosAddCircle className="size-12 m-7" />
        </div>
        {/* All Category Button*/}
        <div className="Cat flex flex-wrap">
          {category.map((cat: any, id: number) => {
            return (
              <div className="flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
                <button className="text-xl">{cat.name}</button>
                <FaEdit className="m-3 size-7" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex">
        <div>
          <div className="p-3 w-40 m-5 text-2xl font-bold ">產品</div>
          <IoIosAddCircle className="size-12 m-7" />
        </div>

        {/* All Item*/}
        <div className="item flex justify-start flex-wrap">
          {item.map((i: any, id: number) => {
            return (
              // items
              <div
                key={item.id}
                style={{
                  display: "grid",
                  border: "1px solid grey",
                  margin: "10px",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  borderRadius: "10px",
                  width: "100%",
                  height: "10rem",
                  position: "relative",
                }}
                // onClick={itemPageHandle}
              >
                <div className="flex items-center justify-start m-2">
                  <img
                    className="rounded-md w-auto h-32"
                    src={i.item_photo}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col overflow-hidden justify-start m-2">
                  <span className="text-base m-2 font-bold">{i.name}</span>
                  <span className="text-xs m-2 truncate">{i.description}</span>
                  <span className="text-xs m-2 flex justify-end">
                    ${i.price}
                  </span>
                </div>
                <FaEdit className="m-3 size-7 absolute top-0 right-1" />
              </div>
            );
          })}
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
