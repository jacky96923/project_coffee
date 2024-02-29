import {
  FaBars,
  FaHome,
  FaCog,
  FaUser,
  FaCoffee,
  FaCommentDots,
  FaDumpsterFire,
} from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function logOutHandler() {
    localStorage.clear();
    navigate("/businessLogin", { replace: true });
  }

  return (
    <>
      <div className="sidebar bg-white text-black w-60 h-screen shadow">
        {/* Sidebar content */}
        <div className="flex flex-col items-center justify-between p-4">
          <span className="text-2xl font-bold text-center mt-3">
            Project Coffee
          </span>
        </div>
        <ul className="flex flex-col items-center justify-center py-4 ">
          <li className="p-4 hover:bg-gray-700 text-center">
            <div className="flex cursor-pointer" onClick={() => navigate("/")}>
              <FaHome className="size-6" />
              <h3 className="ml-3">主頁</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/AllItem")}
            >
              <FaCoffee className="size-6" />
              <h3 className="ml-3">所有商品</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/MainAddItem/0")}
            >
              <FaDumpsterFire className="size-6" />
              <h3 className="ml-3">添加/更改產品</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/MenuPreview")}
            >
              <BiSolidFoodMenu className="size-6" />
              <h3 className="ml-3">餐單更新</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/EditShopInfo")}
            >
              <FaUser className="size-6" />
              <h3 className="ml-3">修改商店資料</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/PromotionInfo")}
            >
              <FaCog className="size-6" />
              <h3 className="ml-3">推廣資料</h3>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <div
              className="flex cursor-pointer"
              onClick={() => navigate("/businessComment")}
            >
              <FaCommentDots className="size-6" />
              <h3 className="ml-3">顧客評價</h3>
            </div>
          </li>
          <br />

          <button
            onClick={() => navigate("/receivedOrders")}
            className="block mx-auto w-40 h-14  bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl font-bold text-white"
          >
            查看訂單
          </button>
          <button
            onClick={logOutHandler}
            className="block mx-auto w-40 h-14 bg-red-500 rounded-2xl font-bold text-white mt-5"
          >
            登出
          </button>
        </ul>
      </div>
    </>
  );
}
