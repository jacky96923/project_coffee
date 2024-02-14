import React from "react";
import { Link } from "react-router-dom";

export default function ShopSelectionList() {
  const shops = [
    { id: 1, name: "Blue bottle shop", address: "中環擺花街38號地舖及1樓" },
    { id: 2, name: "Shop B", address: "456 Elm St" },
    { id: 3, name: "Shop C", address: "789 Oak St" },
    { id: 4, name: "Shop D", address: "789 Oak St" },
    { id: 5, name: "Shop E", address: "789 Oak St" },
  ];

  return (
    <div>
      <h2>Shop Selection List</h2>
      <ul className="space-y-4">
        {shops.map((shop) => (
          <li key={shop.id} className="m-4">
            <Link to={`/ProductSelection/${shop.id}`}>
              <div className="border p-4 rounded-lg">
                <div className="flex flex-wrap">
                  <div className="m-1">
                    <h1>images</h1>
                    <img src="" alt="" />
                  </div>
                  <div className="m-1">
                    <div className="text-lg		">{shop.name}</div>
                    <div className="text-xs	">{shop.address}</div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
