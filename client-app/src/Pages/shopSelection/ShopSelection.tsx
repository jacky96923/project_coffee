import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetShopDisplaying } from "../../hooks/dataAPI";
import { Loader } from "@googlemaps/js-api-loader";
// import dotenv from "dotenv";
import { MapPinIcon } from "@heroicons/react/24/solid";
// dotenv.config();

export default function ShopSelection() {
  type SelectedShop = {
    id: number;
    shop_name: string;
    address: string;
    latitude: number;
    longitude: number;
    images: Array<{
      shopPhoto: string;
      isCover: boolean;
    }>;
  };

  const [selectedShopMap, setSelectedShopMap] = useState({} as SelectedShop);
  const loader = new Loader({
    // apiKey: process.env.GOOGLE_MAP_API_KEY!,
    apiKey: "AIzaSyDUqlnlOl0M1egVOjsY84Dhzp9Cm4Ax6Gw",
    version: "weekly",
    // ...additionalOptions,
  });
  let map;
  let marker;
  useEffect(() => {
    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: {
          lat: selectedShopMap.latitude,
          lng: selectedShopMap.longitude,
        },
        zoom: 15,
      });
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // marker = new AdvancedMarkerElement({
      //   map: map,
      //   position: {
      //     lat: selectedShopMap.latitude,
      //     lng: selectedShopMap.longitude,
      //   },
      //   title: selectedShopMap.shop_name,
      // });
    });
  }, [selectedShopMap]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const shopItem:
    | string
    | Array<{
        id: number;
        shop_name: string;
        address: string;
        latitude: number;
        longitude: number;
        images: Array<{
          shopPhoto: string;
          isCover: boolean;
        }>;
      }> = GetShopDisplaying();

  const OnShopItem = useMutation({
    mutationFn: async () => {},
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["shopDisplaying"],
        exact: true,
      }),
  });

  //for searching function
  const [searchQuery, setSearchQuery] = useState("");
  const [sortState, setSortState] = useState(shopItem);

  // let searchResults: typeof shopItem = [];
  // if (Array.isArray(shopItem)) {
  //   searchResults = shopItem.map((entry) => ({
  //     shop_name: entry.shop_name.filter((subEntry) =>
  //       subEntry.shop_name.toLowerCase().includes(searchQuery.toLowerCase())
  //     ),
  //   }));
  // }
  console.log(
    "check image",
    typeof shopItem === "string" ? "" : shopItem[0].images
  );

  return (
    <div className="relative bg-white m-5 mt-2">
      <div className="flex">
        <button
          onClick={() => navigate("/")}
          className={`self-center btn btn-circle btn-sm`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-green-800" />
        </button>
        <h1 className="m-3 text-2xl font-bold tracking-tight sm:text-6xl">
          尋找咖啡店
        </h1>
      </div>
      <hr />
      <div className="flex justify-center w-5/6 mx-auto m-4">
        <input
          type="text"
          placeholder="咖啡店名稱"
          className="input input-bordered w-full max-w-xs m-3 rounded-2xl	drop-shadow-lg"
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button
          className="rounded-2xl	 w-10"
          // onClick={() => setSortState(searchResults)}
        >
          <MagnifyingGlassIcon className="text-green-800" />
        </button>
      </div>

      <div id="map" style={{ height: "15rem" }}></div>

      <div>
        <ul className="space-y-4">
          {Array.isArray(shopItem) ? (
            shopItem.length > 0 ? (
              shopItem.map((shop) => (
                <li key={shop.id} className="">
                  <button
                    className="btn btn-circle text-red-500 relative top-8 right-3"
                    onClick={() => setSelectedShopMap(shop)}
                  >
                    <MapPinIcon />
                  </button>
                  <Link to={`/menu/${shop.id}`}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        border: "1px solid green",
                        margin: "2px",
                        borderRadius: "10px",
                        width: "auto",
                        height: "11rem",
                        // justifyContent: "space-between",
                        // backgroundColor: "green",
                      }}
                    >
                      {Array.isArray(shop.images)
                        ? shop.images.length > 0
                          ? shop.images.map((entry) =>
                              entry.isCover ? (
                                <img
                                  src={entry.shopPhoto}
                                  className="w-25 h-40 rounded"
                                  style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              ) : (
                                ""
                              )
                            )
                          : ""
                        : ""}
                      <div className="flex flex-col ml-5 mt-5">
                        <div className="text-base	m-2 font-bold">
                          {Array.isArray(shop.images)
                            ? shop.images.length > 0
                              ? shop.images.map((entry) =>
                                  entry.isCover ? (
                                    " "
                                  ) : (
                                    <div className="w-8 rounded-xl">
                                      <img src={entry.shopPhoto} />
                                    </div>
                                  )
                                )
                              : ""
                            : ""}

                          {shop.shop_name}
                        </div>
                        <div className=" text-xs	m-2">{shop.address}</div>
                        <div className="text-xs	m-2 flex justify-end">900m</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              "No todo Items"
            )
          ) : shopItem === "Data is coming" ? (
            <>
              <img alt="loading" />
              <h3>Loading</h3>
            </>
          ) : (
            <h3>{shopItem}</h3>
          )}
        </ul>
      </div>
    </div>
  );
}
