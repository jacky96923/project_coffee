import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import MainBottomNavBar from "../../components/BottomNavBar";
import MySetting from "../../components/MySetting";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function MyPage() {
  const userName = useSelector((state:RootState)=>state.auth.user)
  return (
    <>
      <div className="m-8">
        <div className=" flex">
          <Link to="/">
            <div className="w-10 ">
              <ChevronLeftIcon />
            </div>
          </Link>
          <div className="m-2 font-bold text-2xl">{userName}</div>
        </div>
        <MySetting />
      </div>
    </>
  );
}
