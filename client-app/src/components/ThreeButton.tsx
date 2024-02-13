import React from "react";
import { TagIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function ThreeButton() {
  return (
    <>
      <div className="flex justify-around m-2">
        <div className="location ">
          <h3>
            <Link to="/shopSelection" className="nav-link">
              <MapPinIcon />
              附近咖啡
            </Link>
          </h3>
        </div>
        <div className="award">
          <h3>
            <Link to="/shopSelection" className="nav-link">
              <TagIcon />
              我的獎賞
            </Link>
          </h3>
        </div>
        <div className="mybooking">
          <h3>
            <Link to="/shopSelection" className="nav-link">
              <BriefcaseIcon />
              我的訂單
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}
