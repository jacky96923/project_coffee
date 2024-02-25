import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { NoUserLoginModal } from "./Modal";

export default function ThreeButton() {
  const navigate = useNavigate();
  const [noUserLoginModal, setNoUserLoginModal] = useState(false);
  const onNavHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (localStorage.getItem("token") === null) {
      e.preventDefault();
      setNoUserLoginModal(true);
    }
  };
  const onLoginHandler = () => {
    navigate("/client-login");
  };

  return (
    <>
      <div className="flex justify-around m-8">
        <div className="location ">
          <div className="w-">
            <Link to="/shopSelection" className="nav-link">
              <MapPinIcon className="w-14 text-green-800" />
              <div className="w-14 text-sm	mt-1">附近咖啡</div>
            </Link>
          </div>
        </div>
        <div className="reward">
          <h3>
            <Link
              onClick={(e) => onNavHandler(e)}
              to="/myReward"
              className="nav-link"
            >
              <TagIcon className="w-14 text-green-800" />
              <div className="w-14 text-sm mt-1"> 我的獎賞</div>
            </Link>
          </h3>
        </div>
        <div className="mybooking">
          <h3>
            <Link
              onClick={(e) => onNavHandler(e)}
              to="/receipt/all"
              className="nav-link"
            >
              <BriefcaseIcon className="w-14 text-green-800" />
              <div className="w-14 text-sm	mt-1">我的訂單</div>
            </Link>
          </h3>
        </div>
        <NoUserLoginModal
          show={noUserLoginModal}
          onClose={() => setNoUserLoginModal(false)}
          onLogin={onLoginHandler}
        />
      </div>
    </>
  );
}
