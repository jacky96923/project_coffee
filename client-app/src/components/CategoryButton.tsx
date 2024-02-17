import { useEffect, useState } from "react";

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

export default function CategoryButton() {
  const [category, setCategory]: any = useState([]);
  useEffect(() => {
    setCategory(categorySample);
  }, []);
  return (
    <>
      <div className="flex flex-wrap m-4">
        {category.map((item: any, id: number) => {
          return (
            <div className="ml-2 block w-35 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white">
              <button className="m-2 ">{item.name}</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
