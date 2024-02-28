import { useEffect, useState } from "react";
import styles from "../AddItem/AddItem.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useParams } from "react-router-dom";
import { AddItemInfo, GetAllTypes, GetItemInfo } from "../../hooks/AddItemAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { saveFirstPageForm } from "../../slices/MainAddItemSlice";
import { AddItemModal, itemToAdd } from "../../component/Modal";

export type Inputs = {
  itemName: string;
  itemPhoto: string;
  itemSize: string;
  itemSizePrice: {
    size: string | null;
    price: number;
  }[];
  itemTypeId: string;
  description: string;
};

type typeOptionListForModal = {
  itemType: { itemTypeName: string; itemTypeId: number };
  itemOptionList: Array<{
    optionList: string;
    options: Array<{
      name: string;
      price: number | null;
    }>;
  }>;
};

export default function AddItem() {
  let { itemId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const handleModalShow = () => setShow(true);
  const handleModalClose = () => setShow(false);

  const getItem:
    | string
    | {
      itemName: string;
      itemPhoto: string;
      itemDescription: string;
      itemIdSizePrice: Array<{ itemid: number, size: string | null; price: number }>;
      itemType: { itemTypeName: string; itemTypeId: number };
      itemOptionList: Array<{
        optionList: string;
        options: Array<{
          name: string;
          price: number | null;
        }>;
      }>;
    } = Number(itemId) !== 0 ? GetItemInfo(Number(itemId)) : "none";

  console.log("check getItem", getItem);

  const getAllType: string | Array<typeOptionListForModal> = GetAllTypes();
  console.log("check getAllType", getAllType);

  const {
    register,
    unregister,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //define the the form's initial values
  // type FormInitialValues = {
  //   itemName: string;
  //   itemPhoto: string;
  //   itemDescription: string;
  //   itemSizePrice: [{ size: string | null; price: number }];
  //   itemTypeId: number;
  // };

  // for props optionList into the modal
  const [selectedOptionList, setSelectedOptionList] = useState(undefined as typeOptionListForModal | undefined);

  let selectedItemTypeId = parseInt(watch("itemTypeId"));
  let itemName = watch("itemName")
  let itemSizePrice = watch("itemSize") === "0" ? [
    { size: watch(`itemSizePrice.0.size`), price: watch("itemSizePrice.0.price") },
    { size: watch(`itemSizePrice.1.size`), price: watch("itemSizePrice.1.price") },
    { size: watch(`itemSizePrice.2.size`), price: watch("itemSizePrice.2.price") },
  ] : watch("itemSize") === "1" ? [{ size: watch(`itemSizePrice.3.size`), price: watch("itemSizePrice.3.price") }]
    : []

  useEffect(() => {
    if (typeof getAllType !== "string") {
      setSelectedOptionList(
        getAllType.filter((item) => item.itemType.itemTypeId === selectedItemTypeId)[0]
      );
    }
    console.log("check selectedOptionList in effect", selectedOptionList);
  }, [selectedItemTypeId]);

  useEffect(() => {
    let sub = watch((data) => {
      console.log("update form data:", data);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // const onTypeChangingHandler: SubmitHandler<Inputs> = (data) => {
  //   console.log("data submitted", data);
  //   dispatch(saveFirstPageForm(data));
  // };

  const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
    console.log("data before formatting", data);
    
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    if (data.itemSize === "0"){
      data.itemSizePrice.splice(3, 1)
      let itemSizePrice = JSON.stringify(data.itemSizePrice)
      console.log("stringified itemsizeprice", itemSizePrice)
      formData.append("itemSizePrice", itemSizePrice);
    } else if (data.itemSize === "1"){
      data.itemSizePrice.splice(0, 3)
      let itemSizePrice = JSON.stringify(data.itemSizePrice)
      console.log("stringified itemsizeprice", itemSizePrice)
      formData.append("itemSizePrice", itemSizePrice);
    }
    
    formData.append("description", data.description);
    formData.append("itemPhoto", data.itemPhoto) //[0] as File);
    formData.append("itemTypeId", data.itemTypeId);
    AddItemInfo(formData)
    handleModalClose()
  }

  // size price register
  useEffect(() => {
    if (watch("itemSize") === "0") {
      unregister(["itemSizePrice.3.size", "itemSizePrice.3.price"]);
    } else {
      unregister([
        "itemSizePrice.0.size",
        "itemSizePrice.0.price",
        "itemSizePrice.1.size",
        "itemSizePrice.1.price",
        "itemSizePrice.2.size",
        "itemSizePrice.2.price",
      ]);
    }
  }, [control, watch, unregister]);

  const renderPriceInputFields = () => {
    if (watch("itemSize") === "0") {
      // unregister(["itemSizePrice.3.size", "itemSizePrice.3.price"]);
      return (
        <div className="form-control">
          <div>小杯價錢</div>
          <input
            id="sizeSmallPrice"
            type="number"
            min="0"
            className="file-input file-input-bordered file-input-sm w-15 max-w-xs"
            {...register(`itemSizePrice.0.size` as const, { value: "小杯" })}
            {...register(`itemSizePrice.0.price` as const, { required: true })}
          />

          <div>中杯價錢</div>
          <input
            id="sizeMediumPrice"
            type="number"
            min="0"
            className="file-input file-input-bordered file-input-sm w-15 max-w-xs"
            {...register(`itemSizePrice.1.size` as const, { value: "中杯" })}
            {...register(`itemSizePrice.1.price` as const, { required: true })}
          />
          <div>大杯價錢</div>
          <input
            id="sizeBigPrice"
            type="number"
            min="0"
            className="file-input file-input-bordered file-input-sm w-15 max-w-xs"
            {...register(`itemSizePrice.2.size` as const, { value: "大杯" })}
            {...register(`itemSizePrice.2.price` as const, { required: true })}
          />
          {errors.itemSizePrice?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
      );
    } else if (watch("itemSize") === "1") {
      // unregister([
      //   "itemSizePrice.0.size",
      //   "itemSizePrice.0.price",
      //   "itemSizePrice.1.size",
      //   "itemSizePrice.1.price",
      //   "itemSizePrice.2.size",
      //   "itemSizePrice.2.price",
      // ]);
      return (
        <div className="form-control">
          <input
            id="sizePrice"
            type="number"
            min="0"
            className="file-input file-input-bordered file-input-sm w-15 max-w-xs"
            {...register(`itemSizePrice.3.size` as const, { value: "無" })}
            {...register(`itemSizePrice.3.price` as const, { required: true })}
          />
        </div>
      );
    } else {
      return <div className="font-bold">請先選擇大小</div>
    }
  };

  return (
    <>
      <div className="flex">
        <div className={styles.content}>
          {/* 3 types of changes: add, edit, delete */}
          <div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  // onChange={()=>set}
                  {...register("itemName", {
                    required: "This is requireddd",
                    maxLength: {
                      value: 6,
                      message: "Max word length is 6",
                    },
                  })}
                />
              </div>
              {/* <ErrorMessage errors={errors} name="itemNameInputError" /> */}
              <ErrorMessage
                errors={errors}
                name="itemName"
                render={({ message }) => {
                  console.log("input error");
                  return <p>{message}</p>;
                }}
              />
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
                  {...register("itemPhoto", {
                    required: "請上傳圖片",
                  })}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  產品大小
                </label>
                <div>
                  <input
                    type="radio"
                    id="大中小"
                    value="0"
                    {...register("itemSize", {
                      required: "請選擇大小",
                    })}
                  />
                  <label htmlFor="大中小">大中小</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="無大小"
                    value="1"
                    {...register("itemSize", {
                      required: "請選擇大小",
                    })}
                  />
                  <label htmlFor="無大小">無大小</label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  產品價錢
                </label>

                {renderPriceInputFields()}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="itemPrice"
                >
                  產品類別
                </label>
                {typeof getAllType === "string" ? (
                  " "
                ) : getAllType.length == 0 ? (
                  <div>
                    <button className="btn btn-sm" type="submit">
                      添加類別
                    </button>
                  </div>
                ) : (
                  getAllType.map((entry) => (
                    <div>
                      <input
                        type="radio"
                        key={entry.itemType.itemTypeId}
                        id={entry.itemType.itemTypeName}
                        value={entry.itemType.itemTypeId}
                        {...register("itemTypeId", {
                          required: "請選擇產品類別",
                        })}
                      />
                      <label htmlFor={entry.itemType.itemTypeName}>{entry.itemType.itemTypeName}</label>
                    </div>
                  ))
                )}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="itemPrice"
                  >
                    產品描述
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="請填寫產品資料"
                    {...register("description")}
                  ></textarea>
                </div>
                <div>
                  {/* multi select of created types from server */}
                  {/* at least and at most 1 type must be selected */}
                  {/* on type selected , display static corresponding option lists and options ( editing won't be done here) */}
                </div>
              </div>
              {typeof getAllType === "string" ? (
                " "
              ) : getAllType.length == 0 ? (
                " "
              ) : (
                <div>
                  <button className="btn btn-sm" type="submit" onClick={(e) => { e.preventDefault(); handleModalShow() }}>
                    確認
                  </button>
                </div>
              )}

              <div>
                <button
                  className="btn btn-sm"
                  type="submit"
                >
                  新增/修改產品類別
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AddItemModal
        isShow={show}
        onClose={handleModalClose}
        onSubmit={handleSubmit(onSubmitHandler)}
        item={{
          itemName: itemName,
          itemSizePrice: itemSizePrice,
          itemOptionList: selectedOptionList?.itemOptionList,
          itemType: selectedOptionList?.itemType
        }}
      />
    </>
  );
}
