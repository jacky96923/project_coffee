export default function MyCoupon() {
  return (
    <>
      <div className="mt-6 m-2 text-xl ">我的優惠卷</div>
      <div
        // className="rounded-full border-solid border-2 border-sky-500"
        style={{
          display: "grid",
          border: "1px solid green",
          margin: "3px",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderRadius: "10px",
          padding: "13px",
          alignItems: "center",
        }}
      >
        <img
          className="w-76 h-auto rounded-2xl "
          src="https://rare-gallery.com/thumbs/5425871-mountain-cup-drink-hand-holding-mug-coffee-tea-arms-tree-woodland-forest-travel-hiking-valley-explore-rei-bar-nine-coffee-bean-coffee-addict-public-domain-images.jpg"
        ></img>
        <div className="flex flex-col m-2">
          <span className=" font-bold mb-2 flex justify-end text-sm text-red-600	">
            生日優惠{" "}
          </span>
          <span className="text-xs p-1">
            生日快樂，凡於生日月份在任何指定商店可免費獲得價 $50 以下的咖啡乙杯{" "}
          </span>
          <span className="mt-2 font-bold flex justify-end text-xs align-text-bottom	">
            有效期至 31 / 2 /2024{" "}
          </span>
        </div>
      </div>
      <div
        // className="rounded-full border-solid border-2 border-sky-500"
        style={{
          display: "grid",
          border: "1px solid grey",
          margin: "20px 1px 0px 1px ",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderRadius: "10px",
          padding: "13px",
          alignItems: "center",
        }}
      >
        <img
          className=" w-76 h-auto rounded-2xl "
          src="https://rare-gallery.com/thumbs/5410468-person-hand-coffee-coffee-bean-holding-hold-caffeine-tattoo-coffee-pro-coffee-addict-coffee-shop-free-stock-photos.jpg"
        ></img>
        <div className="flex flex-col m-2">
          <span className=" font-bold mb-2 flex justify-end text-sm text-red-600	">
            八折優惠
          </span>
          <span className="text-xs p-1">
            凡購買任何商品並超過100元，可享有八折優惠
          </span>
          <span className="mt-2 font-bold flex justify-end text-xs ">
            有效期至 31 / 12 /2024{" "}
          </span>
        </div>
      </div>
    </>
  );
}
