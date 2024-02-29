import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../component/Header";
import { GetShopInformation } from "../../hooks/MainAPI";

function MainPage() {
  const shopId: undefined | number = useSelector(
    (state: RootState) => state.auth.shop_id
  );
  console.log("shop_id = ", shopId);

  const shopInfo: {
    shop_name: string;
    contact_no: number;
    area: string;
    district: string;
    address: string;
    description: string | null;
    filename?: string;
  }[] = GetShopInformation(shopId as number);
  console.log("shopInfo", shopInfo);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full h-full">
        {Array.isArray(shopInfo) ? (
          shopInfo.length > 0 ? (
            shopInfo.map((info) => (
              <div className="">
                <div>
                  <Header title={info.shop_name} />
                </div>
                <div className="mt-20 bg-base-150 shadow-2xl m-10 rounded-2xl	">
                  <div className="hero-content flex-row lg:flex-col">
                    <div>
                      <div className="flex">
                        <img
                          src={info.filename}
                          className="rounded-lg  mr-5 w-auto h-32 mt-20"
                        />{" "}
                        <div>
                          <h1 className="text-3xl font-bold m-3">
                            {info.shop_name}
                          </h1>

                          <hr />
                          <p className="m-3 text-sm	">{info.description}</p>
                          <p className="m-3 text-sm">
                            {info.area}
                            {info.district}
                            {info.address}
                          </p>
                          <p className="m-3 text-sm">
                            Tel: +852 {info.contact_no}
                          </p>

                          <button className="btn btn-primary m-3 text-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            "No todo Items"
          )
        ) : typeof shopInfo === "string" && shopInfo === "Data is coming" ? (
          <>
            <img alt="loading" />
            <h3>Loading</h3>
          </>
        ) : (
          <>{shopInfo}</>
        )}
      </div>
    </div>
  );
}
export default MainPage;
