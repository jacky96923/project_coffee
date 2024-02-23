import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import MainBottomNavBar from "../../components/BottomNavBar";
import MyCoupon from "../../components/MyCoupon";

export default function MyReward() {
  return (
    <>
      <div className="m-8">
        <div className=" flex">
          <Link to="/">
            <div className="w-10 ">
              <ChevronLeftIcon />
            </div>
          </Link>
          <div className="m-2 font-bold text-2xl">我的獎賞</div>
        </div>
        <div className="member card mt-5">
          <div className="relative">
            <img
              src="https://www.coffeesomething.de/wp-content/uploads/espressohouse-0008-768x512.jpg"
              alt="carousel"
              className="w-90 h-auto rounded-2xl		 "
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-2xl	"></div>
            <div className="absolute top-0 left-0 p-4 text-white text-base font-bold 	">
              Project Coffee 金會員
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white text-sm font-bold ">
              Mic WONG <br />
              113320
            </div>

            <div className="absolute bottom-0 right-0 p-4 text-white text-base font-bold 	">
              積分 ： 964{" "}
            </div>
          </div>
        </div>
        <MyCoupon />
      </div>
    </>
  );
}
