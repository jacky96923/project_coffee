import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetShopDisplaying } from "../hooks/dataAPI";

export default function ShopSelectionList() {
  // const shops = [
  //   { id: 1, name: "Blue bottle shop", address: "中環擺花街38號地舖及1樓" },
  //   { id: 2, name: "Shop B", address: "456 Elm St" },
  //   { id: 3, name: "Shop C", address: "789 Oak St" },
  // ];

  const queryClient = useQueryClient();
  const shopItem:
    | string
    | Array<{ id: number; shop_name: string; address: string }> =
    GetShopDisplaying();
  const OnShopItem = useMutation({
    mutationFn: async () => {},
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["shopDisplaying"],
        exact: true,
      }),
  });

  return (
    <div>
      <h2>Shop Selection List</h2>
      <ul className="space-y-4">
        {Array.isArray(shopItem) ? (
          shopItem.length > 0 ? (
            shopItem.map((shop) => (
              <li key={shop.id} className="">
                <Link to={`/ProductSelection/${shop.id}`}>
                  <div
                    style={{
                      display: "grid",
                      border: "1px solid grey",
                      margin: "7px",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      borderRadius: "10px",
                      width: "auto",
                      height: "10rem",
                    }}
                  >
                    <img
                      src="https://rare-gallery.com/thumbs/510549-coffee.jpg"
                      alt="image"
                      className="m-4 rounded-md	 "
                    />
                    <div className="flex flex-col ml-5 mt-5">
                      <div className="text-base	m-2 font-bold">
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
  );
}
