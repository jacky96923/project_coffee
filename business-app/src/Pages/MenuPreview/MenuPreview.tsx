import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";

import { FaEdit } from "react-icons/fa";

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

// Main content component
const MainContent = () => {
  const [category, setCategory]: any = useState([]);
  useEffect(() => {
    setCategory(categorySample);
  }, []);
  return (
    <div className="main-content m-2 ">
      {/* Main content */}
      <div>
        <h2 className="text-2xl m-8 font-bold">餐單預覽</h2>
      </div>

      <div className="flex">
        <div className="p-3 w-40 m-5 text-2xl font-bold ">類別</div>
        {/* All Category Button*/}
        <div className="Cat flex flex-wrap">
          {category.map((cat: any, id: number) => {
            return (
              // m-5 flex justify-center w-40 h-16 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white
              <div className="flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
                <button className="text-xl">{cat.name}</button>
                <FaEdit className="m-3 size-7" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex">
        <div className="p-3 w-40 m-5 text-2xl font-bold ">類別</div>
        {/* All Item*/}
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
