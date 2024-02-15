import { useEffect, useState } from "react";

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
];

export default function ProductFromShop() {
  const [coffeeProduct, setCoffeeProduct]: any = useState([]);

  useEffect(() => {
    setCoffeeProduct(coffeeProductSample);
  }, []);
  return (
    <>
      <div>
        {coffeeProduct.map((item: any, id: number) => {
          // console.log(item);
          return (
            <div
              style={{
                display: "grid",
                border: "1px solid grey",
                margin: "20px",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                borderRadius: "10px",
              }}
            >
              <img src={item.thumbnail}></img>
              <div className="flex flex-col m-3">
                <span className="font-bold mb-2 text-sm	">{item.name}</span>
                <span className="font-bold mb-2 text-xs	">
                  {item.description}
                </span>
                <span className="font-bold flex justify-end">
                  ${item.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
