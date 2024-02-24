import { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";
import styles from "../AddItem/AddItem.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { FaShieldVirus } from "react-icons/fa";
import { type } from "os";

type FormState = {
  itemName: string;
  itemPhoto: string;
  itemPrice: number;
  itemCat: string;
  optionList: string[];
  options: string[];
  description: string;
};

export default function AddItem() {
  const { register, control, handleSubmit } = useForm();
  const [radioTextValue, setRadioTextValue] = useState("");
  const { fields, append } = useFieldArray({
    control,
    name: "itemType",
  });

  const handleOptionAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (radioTextValue.trim().length === 0) return;
    const newOption = radioTextValue.toLowerCase().replace(" ", "-");
    append({ option: newOption });
    setRadioTextValue("");
  };

  // //for type radio button
  // //for all the radio options,, can get from initialstate
  // const [radioOptions, setRadioOptions] = useState<string[]>([]);
  // //for recording the input text
  // const [radioTextValue, setRadioTextValue] = useState("");
  // //
  // const [radioValue, setRadioValue] = useState("");
  // //for type radio button
  // //for options
  // const [option, setOption] = useState("");
  // //for options
  // const handleOptionAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   //remove unwanted spaces
  //   if (radioTextValue.trim().length === 0) return;
  //   const newOption = radioTextValue.toLowerCase().replace(" ", "-");
  //   //add newOption into the array of radioOptions
  //   setRadioOptions([...radioOptions, newOption]);
  //   // Clear the input field
  //   setRadioTextValue("");
  // };
  // const optionRadioButtonHandler = (e: any) => {
  //   setRadioValue(e.target.value);
  // };
  // useEffect(() => {
  //   setOption(radioValue);
  // }, [radioValue]);
  // //for radio button

  // //for optionList
  // const [optionList, setOptionList] = useState<string[]>([]);
  // //for optionList

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pageTitle}>添加商品 </div>
          <div className="border-2 border-black">
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  產品名稱
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="產品名稱"
                  className="input input-bordered input-sm w-50 max-w-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPhoto"
                >
                  產品圖片
                </label>
                <input
                  id="itemPhoto"
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  產品價錢
                </label>
                <input
                  id="itemPrice"
                  type="number"
                  min="0"
                  className="file-input file-input-bordered file-input-sm w-15 max-w-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  產品類別
                </label>
                {/*radio button*/}
                <div>
                  <input
                    type="text"
                    placeholder="添加類別"
                    className="input input-bordered input-xs w-25 max-w-xs"
                    onChange={(e) => setRadioTextValue(e.target.value)}
                  />
                  <button className="btn btn-sm" onClick={handleOptionAdd}>
                    添加
                  </button>
                </div>

                {fields.map((field, index) => (
                  <input
                    key={field.id}
                    type="radio"
                    className="radio"
                    {...register(`test.${index}.value`)}
                  />
                ))}
                {/* <div>
                  <div>
                    <input
                      type="text"
                      value={radioTextValue}
                      onChange={(e) => setRadioTextValue(e.target.value)}
                      placeholder="添加類別"
                      className="input input-bordered input-xs w-25 max-w-xs"
                    />
                    <button className="btn btn-sm" onClick={handleOptionAdd}>
                      添加
                    </button>
                  </div>
                  {radioOptions.map((option) => (
                    <p>
                      <label>
                        <input
                          type="radio"
                          name="dynamic-radio"
                          value={option}
                          onChange={(e) => optionRadioButtonHandler(e)}
                        />
                        {option}
                      </label>
                    </p>
                  ))}
                </div> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  選項
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
