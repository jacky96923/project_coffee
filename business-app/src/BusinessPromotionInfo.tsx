import React from "react";

const BusinessPromotionInfo: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      <div
        style={{ marginTop: "60px", display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ fontSize: "24px", paddingBottom: "3rem" }}>推廣資料</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="商店Logo"
              className="input input-bordered min-h-28 input-lg w-52 max-w-xs mx-10"
            />
            <input
              type="text"
              placeholder="商店橫額圖片"
              className="input input-bordered min-h-28 input-lg w-52  mt-5 max-w-xs "
            />
            <input
              type="text"
              placeholder="其他圖片(如產品，餐牌)"
              className="input input-bordered min-h-28 input-lg w-52 mt-5 max-w-xs"
            />
          </div>
          <input
            type="text"
            placeholder="我的店在賣特色咖啡"
            className="input input-bordered min-h-20 input-lg w-48 max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessPromotionInfo;
