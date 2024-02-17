import React from "react";
import { TagIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function ThreeButton() {
  return (
    <>
      <div className="flex justify-around m-8">
        <div className="location ">
          <div className="w-">
            <Link to="/shopSelection" className="nav-link">
              <MapPinIcon className="w-14" />
              <div className="w-14 text-sm	">附近咖啡</div>
            </Link>
          </div>
        </div>
        <div className="award">
          <h3>
            <Link to="/myReward" className="nav-link">
              <TagIcon className="w-14" />
              <div className="w-14 text-sm	"> 我的獎賞</div>
            </Link>
          </h3>
        </div>
        <div className="mybooking">
          <h3>
            <Link to="/shopSelection" className="nav-link">
              <BriefcaseIcon className="w-14" />
              <div className="w-14 text-sm	">我的訂單</div>
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
