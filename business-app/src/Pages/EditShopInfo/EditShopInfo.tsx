import { useNavigate } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import styles from "../EditShopInfo/EditShopInfo.module.css";
import React, { Fragment, useState, useEffect, FormEvent } from "react";

const source = process.env.REACT_APP_API_SERVER;

export default function EditShopInfo() {
  const HKIDistrict = ["中西區", "灣仔區", "東區", "南區"];
  const KWDistrict = ["深水埗區", "油尖旺區", "九龍城區", "黃大仙區", "觀塘區"];
  const NTDistrict = [
    "葵青區",
    "荃灣區",
    "元朗區",
    "屯門區",
    "離島區",
    "沙田區",
    "大埔區",
    "北區",
    "西貢區",
    "落馬洲河套地區",
  ];
  const [selectedArea, setSelectArea] = useState("");
  const [district, setDistrict] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [enteredAddress, setenteredAddress] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedArea === "香港") {
      setDistrict(HKIDistrict);
    } else if (selectedArea === "九龍") {
      setDistrict(KWDistrict);
    } else if (selectedArea === "新界") {
      setDistrict(NTDistrict);
    }
  }, [selectedArea]);

  function areaChangeHandler(value: any) {
    setSelectArea(value);
    console.log("check value", value);
  }
  console.log("check selected options", district);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      selectedArea !== null &&
      selectedDistrict !== null &&
      enteredAddress !== null
    ) {
      await fetch(`${source}/EditShopInfo/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          area: selectedArea,
          district: selectedDistrict,
          address: enteredAddress,
        }),
      });
      navigate("/main");
    } else {
      alert("請填寫所有資料");
    }
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pageTitle}>修改店舖資料</div>
          <form onSubmit={submit}>
            <div className="flex-col justify-center pt-5">
              <div>選擇地域</div>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={({ target: { value } }) => {
                  areaChangeHandler(value);
                }}
              >
                <option disabled selected value=" ">
                  default
                </option>
                <option value="香港">香港</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
              </select>

              <div className="pt-5">選擇地區</div>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={({ target: { value } }) => {
                  setSelectedDistrict(value);
                }}
              >
                {district.map((entry) => (
                  <option key={entry}>{entry}</option>
                ))}
              </select>

              <div className="pt-5">詳細地址</div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={({ target: { value } }) => {
                  setenteredAddress(value);
                }}
              />
            </div>
            <div className="pt-10">
              <button className="btn btn-success">更新</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
