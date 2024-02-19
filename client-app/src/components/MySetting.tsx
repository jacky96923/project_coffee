import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../slices/authSlice";

const MySetting = () => {
  const dispatch = useDispatch<AppDispatch>()
  const onLogoutHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // dispatch(logout)
  }
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="py-4 px-4 bg-white text-gray-800 font-bold">帳戶資料</h2>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300 "
        >
          個人資料
        </a>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          我的訂單{" "}
        </a>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          我的獎賞{" "}
        </a>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          我的優惠卷{" "}
        </a>
        {/* 2 */}
        <h2 className="py-4 px-4 bg-white text-gray-800 font-bold">其他</h2>

        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          設定{" "}
        </a>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          常見問題{" "}
        </a>
        <a
          href="#"
          className="py-2 px-4 ml-3 bg-white text-gray-800 border-b border-gray-300"
        >
          回饋{" "}
        </a>
        <button onClick={onLogoutHandler} className=" p-4 mt-8 block mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
          登出
        </button>
      </div>
    </div>
  );
};

export default MySetting;
