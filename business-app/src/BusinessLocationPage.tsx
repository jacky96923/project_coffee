import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import ProjectCoffeeImage from "./Project Coffee.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { part_two_data } from "./slices/RegSlice";

export default function BusinessLocation() {
  const area = useSelector((state: RootState) => state.reg.area);
  const district = useSelector((state: RootState) => state.reg.district);
  const address = useSelector((state: RootState) => state.reg.address);



  const [selectedAreaOption, setSelectedAreaOption] = useState(
    area || "請選擇地域"
  );
  const [selectedDistrictOption, setSelectedDistrictOption] =
    useState("請選擇分區");
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0); // Initializing with 0 as an example

  const [addressText, setAddressText] = useState(address);
  const [districtText, setdistrictText] = useState(address);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  // Define the weekdays arrays outside of the function
  const HKArea = ["中西區", "灣仔區", "東區", "南區"];

  const KWArea = ["深水埗區", "油尖旺區", "九龍城區", "黃大仙區", "觀塘區"];

  const NTArea = [
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

  const handleAreaClick = (
    option: React.SetStateAction<string>,
    id: number
  ) => {
    setSelectedAreaOption(option);
    setSelectedOptionId(id); // Assuming you have a state variable to store the selected option ID
    setFormValid(addressText.trim() !== "");

    // Conditionally set the selectedDistrictOption based on the selected area
    if (id === 1) {
      setSelectedDistrictOption("中西區");
    } else if (id === 2) {
      setSelectedDistrictOption("深水埗區");
    } else if (id === 3) {
      setSelectedDistrictOption("葵青區");
    } else {
      setSelectedDistrictOption("請選擇分區");
    }
  };

  const handleDistrictClick = (option: React.SetStateAction<string>) => {
    setSelectedDistrictOption(option);
    setFormValid(addressText.trim() !== "");
  };

  const handleAddressChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddressText(e.target.value);
    setFormValid(e.target.value !== "");
  };

  const handleNextButtonClick = () => {
    if ( selectedAreaOption === "請選擇地域") {
      alert("請選擇地域");
    } else if (selectedDistrictOption === "請選擇分區") {
      alert("請選擇分區.");
    } else if (!addressText.trim()) {
      alert("請輸入地址.");
    } else {
      dispatch(
        part_two_data({ area: selectedAreaOption, district: selectedDistrictOption, address: addressText })
      );
      navigate("/BusinessWelcome");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-auto w-60"
            src={ProjectCoffeeImage}
            alt="Your Company"
          />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              請輸入你的店舖位置
            </h4>
          </div>
          <div>
            {" "}
            <div className="flex justify-center mt-6 ">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-32 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {selectedAreaOption}
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleAreaClick("香港", 1)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            香港
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleAreaClick("九龍", 2)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            九龍
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleAreaClick("新界", 3)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            新界
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex justify-center mt-6 ">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-32 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {selectedDistrictOption}
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {selectedOptionId === 1
                        ? HKArea.map((day, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleDistrictClick(day)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {day}
                                </button>
                              )}
                            </Menu.Item>
                          ))
                        : selectedOptionId === 2
                        ? KWArea.map((day, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleDistrictClick(day)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {day}
                                </button>
                              )}
                            </Menu.Item>
                          ))
                        : NTArea.map((day, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => handleDistrictClick(day)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {day}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  <div className="flex items-center justify-between">
                    地址#1
                  </div>
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    required
                    value={addressText}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #CB8A58, #562B1A)",
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
                  onClick={handleNextButtonClick}
                >
                  下一步
                </button>

                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #CB8A58, #562B1A)",
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
