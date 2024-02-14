import { log } from "console";
import React, { useEffect, useState } from "react";

// interface ProductSelectionPageProps {
//   shopId: number;
// }

const coffeeProductSample = [
  {
    id: 1,
    name: "濃縮咖啡",
    description: "以濃縮咖啡為基礎的咖啡飲料，傳統上是用蒸奶泡製作的。",
    price: "34",
    thumbnail: "na",
  },
  {
    id: 2,
    name: "玫瑰牛奶咖啡",
    description:
      "玫瑰花做拉花，配合咖啡。可惜的是這店沒有脫脂奶選擇只有oat milk ,也沒有咖啡豆可以選擇，咖啡豆味道偏向fruity 。",
    price: "46",
    thumbnail: "na",
  },
  {
    id: 3,
    name: "3",
    description: "description",
    price: "55",
    thumbnail: "na",
  },
  {
    id: 4,
    name: "4",
    description: "description",
    price: "66",
    thumbnail: "na",
  },
  {
    id: 5,
    name: "5",
    description: "description",
    price: "77",
    thumbnail: "na",
  },
];
const categorySample = [
  {
    id: 1,
    name: "推廣産品",
  },
  {
    id: 2,
    name: "經典之作",
  },
  {
    id: 3,
    name: "精選推介",
  },
  {
    id: 4,
    name: "其樂oo",
  },
  {
    id: 5,
    name: "茶味樂園",
  },
];

export default function ProductSelection() {
  // Fetch products for the selected shop using the shopId
  const url = window.location.pathname;
  const [coffeeProduct, setCoffeeProduct]: any = useState([]);
  const [category, setCategory]: any = useState([]);

  useEffect(() => {
    setCoffeeProduct(coffeeProductSample);
    setCategory(categorySample);
  }, []);

  console.log(url.charAt(url.length - 1));
  return (
    <div className="m-5">
      <div className="flex justify-around	">
        <div className="flex">
          icon
          <div>
            <div className="w-full h-10 border-black border-2">
              <h1>name</h1>
            </div>
            <div className="w-full h-10 border-black border-2">
              <h1>address</h1>
            </div>
          </div>
        </div>
        <div>
          <span>評論區</span>
          <span>phone icon </span>
        </div>
      </div>
      <div className="flex flex-wrap m-4">
        {category.map((item: any, id: number) => {
          return (
            <div className="ml-4 rounded-full border-solid border-2 border-sky-500">
              <button>{item.name}</button>
            </div>
          );
        })}{" "}
      </div>
      <div>
        {coffeeProduct.map((item: any, id: number) => {
          console.log(item);
          return (
            <div
              // className="rounded-full border-solid border-2 border-sky-500"
              style={{
                display: "grid",
                border: "1px solid red",
                margin: "20px",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                borderRadius: "10px",
              }}
            >
              <img src={item.thumbnail}></img>
              <div className="flex flex-col m-8">
                <span className="m-8">{item.name}</span>
                <span>{item.description}</span>
                <span>${item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
      \{/* <p>Shop ID: {shops}</p> */}
      {/* Render the products for the selected shop */}
    </div>
  );
}
