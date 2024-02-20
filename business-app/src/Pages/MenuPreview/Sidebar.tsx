import {
  FaBars,
  FaHome,
  FaCog,
  FaUser,
  FaCoffee,
  FaCommentDots,
} from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar bg-white text-black w-60 h-screen shadow">
        {/* Sidebar content */}
        <div className="flex flex-col items-center justify-between p-4">
          <img
            className="w-28 h-28"
            src="https://i.pinimg.com/564x/e4/df/c4/e4dfc41fd3ec20e83c2da8da613e213b.jpg"
            alt=""
          />
          <span className="text-2xl font-bold">Project Coffee</span>
        </div>
        <ul className="flex flex-col items-center justify-center py-4 ">
          <li className="p-4 hover:bg-gray-700 text-center">
            <div className="flex">
              <FaHome className="size-6" />
              <h3 className="ml-3">主頁</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div className="flex">
              <FaCoffee className="size-6" />
              <h3 className="ml-3">所有商品</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div className="flex">
              <BiSolidFoodMenu className="size-6" />
              <h3 className="ml-3">餐單更新</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div className="flex">
              <FaUser className="size-6" />
              <h3 className="ml-3">商店資料</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div className="flex">
              <FaCog className="size-6" />
              <h3 className="ml-3">推廣資料</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div className="flex">
              <FaCommentDots className="size-6" />
              <h3 className="ml-3">顧客評價</h3>
            </div>
          </li>
          <br />
          <br />
          <br />
          <button className="block mx-auto w-40 h-14 my-1.5 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl font-bold text-white">
            查看訂單
          </button>
        </ul>
      </div>
    </>
  );
}
