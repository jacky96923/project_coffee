import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store"; // Adjust the import path to your store configuration
import { useNavigate } from "react-router-dom";
import { error } from "console";

const BusinessWelcome: React.FC = () => {
  const area = useSelector((state: RootState) => state.reg.area);
  const district = useSelector((state: RootState) => state.reg.district);
  const address = useSelector((state: RootState) => state.reg.address);
  const login_name = useSelector((state: RootState) => state.reg.login_name);
  const contact_no = useSelector((state: RootState) => state.reg.contact_no);
  const shop_name = useSelector((state: RootState) => state.reg.shop_name);
  const password = useSelector((state: RootState) => state.reg.login_password);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8100/businessRegister/info",
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Specify content type header
          },
          body: JSON.stringify({
            login_name: login_name,
            shop_name: shop_name,
            login_password: password,
            contact_no: contact_no,
            area: area,
            district: district,
            address: address,
          }),
        }
      );

      if (!response.ok) {
        navigate("/");
        // Alert the error message
      } else {
        // Handle successful response
        navigate("/main"); // Redirect to '/mainpage'
        alert("註冊成功，重新登入！");
      }

      const data = await response.json();

      console.log(data);

      if (data.error) {
        alert(data.error); // Alert the error message
      } else {
        // Handle successful response
      }
    } catch (error) {
      // console.error('Fetch error:', error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "24px", paddingBottom: "3rem" }}>
          確認輸入資料
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "24px", paddingBottom: "3rem" }}>
          您的註冊資料
        </h1>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: "24px", paddingBottom: "1rem" }}>
            <h3>登入名稱：{login_name}</h3>
            <h3>店舖名稱：{shop_name}</h3>
            <h3>登入密碼：{password}</h3>
            <h3>聯絡電話：{contact_no}</h3>
            <h3>地域：{area}</h3>
            <h3>分區：{district}</h3>
            <h3>地址：{address}</h3>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "24px", paddingBottom: "1rem" }}>
          按註冊進入商家版面設置餐單！
        </h1>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className="flex  w-64  justify-center rounded-md bg-indigo-600  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
            style={{
              backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
              borderColor: "transparent",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundImage =
                "linear-gradient(to right, #B07A4E, #4A2416)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundImage =
                "linear-gradient(to right, #CB8A58, #562B1A)")
            }
            onClick={handleClick}
          >
            註冊
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="flex w-64  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
            style={{
              backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
              borderColor: "transparent",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundImage =
                "linear-gradient(to right, #B07A4E, #4A2416)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundImage =
                "linear-gradient(to right, #CB8A58, #562B1A)")
            }
            onClick={() => navigate(-1)}
          >
            上一步
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessWelcome;
