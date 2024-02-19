import React, { useEffect, useState } from "react";
import styles from "./ItemPage.module.css";
import ItemPageOptions from "../../components/ItemPageOptions";
import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Getalloptions, GetItemInfo } from "../../hooks/ItemPageAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  itemCheckOut,
  cupPrice,
  setInitialItems,
  updateQuantity,
  updateSubTotal,
} from "../../slices/itemPageSlice";

export default function ItemPage() {
  let { id } = useParams();
  console.log("page", id);

  const allOptions:
    | string
    | {
        optionList: any;
        itemState: Array<{
          shopName: string;
          address: string;
          id: number;
          name: string;
          item_photo: string;
          size: string;
          price: number;
        }>;
        optionState: Array<{
          optionListName: string;
          options: Array<{ option_name: string; price: number | null }>;
        }>;
      } = Getalloptions(id!);

  console.log("alloptions", allOptions);

  useEffect(() => {
    console.log("check running");
    if (typeof allOptions !== "string") {
      const firstValues = allOptions.optionState.map((optionItem) => {
        const firstOptionList = optionItem.optionListName;
        const firstOption = optionItem.options[0];
        console.log("Check firstOptions", { firstOptionList, firstOption });
        return { firstOptionList, firstOption };
      });
      dispatch(
        setInitialItems({
          shopName: allOptions.itemState[0].shopName,
          address: allOptions.itemState[0].address,
          id: allOptions.itemState[0].id,
          name: allOptions.itemState[0].name,
          item_photo: allOptions.itemState[0].size,
          size: allOptions.itemState[0].size,
          price: allOptions.itemState[0].price,
          optionList: firstValues.map((option) => ({
            optionListName: option.firstOptionList,
            option: option.firstOption,
          })),
        })
      );
    }
  }, [allOptions]);

  const items:
    | string
    | {
        itemInfo: Array<{
          id: number;
          name: string;
          item_photo: string;
          size: string;
          price: number;
          description: string;
          is_enabled: boolean;
          shop_id: number;
          shopName: string;
          address: string;
        }>;
        optionList: Array<{
          option_list_name: string;
        }>;
      } = GetItemInfo(id!);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [cupSize, setCupSize] = useState("小杯");
  const [selectedSizeId, setSelectedSizeId] = useState(id);
  const [price, setPrice] = useState(
    typeof items === "string"
      ? ""
      : items.itemInfo.find((item) => item.size === cupSize)?.price
  );
  useEffect(() => {
    if (typeof items !== "string") {
      setPrice(
        items.itemInfo.find((item) => item.size === cupSize)?.price || ""
      );
    }
  }, [items, cupSize]);

  //dispatch inital state

  function sizeHandler(size: string) {
    setCupSize(size);
    if (typeof items !== "string") {
      const selectedItem = items.itemInfo.find((item) => item.size === size);
      if (selectedItem) {
        setPrice(selectedItem.price);
        //update id based on size change
        setSelectedSizeId(String(selectedItem.id));
        dispatch(
          // itemInfo({
          //   id: parseInt(selectedSizeId!),
          //   name: selectedItem.name,
          //   shopName: selectedItem.shopName,
          //   address: selectedItem.address,
          // }),
          //dispatch()
          cupPrice({ price: selectedItem.price })
        );
      }
    }
  }

  const getOptionsPrice = useSelector(
    (state: RootState) => state.itemPage.item.optionList
  );
  console.log("check option price", getOptionsPrice);
  let totalOptionPrice = 0;
  getOptionsPrice.forEach((option) => {
    if (option.option.price !== null) {
      totalOptionPrice += option.option.price;
    }
  });

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateQuantity(quantity + 1));
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateQuantity(quantity - 1));
    }
  };

  let subtotal = ((price as number) + totalOptionPrice) * quantity;

  useEffect(() => {
    dispatch(updateSubTotal(subtotal));
  }, [subtotal]);

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          className={styles.itemImg}
          src={typeof items === "string" ? "" : items.itemInfo[0].item_photo}
        ></img>
      </div>
      <button
        onClick={() => navigate(-1)}
        className={`btn btn-circle btn-sm ${styles.backButton}`}
      >
        <ChevronLeftIcon className="h-5 w-5 text-white" />
      </button>
      <div className={styles.content}>
        <div className={styles.itemWrap}>
          <div className={styles.itemName_container}>
            <div className={styles.itemName}>
              {typeof items === "string" ? "No data" : items.itemInfo[0].name}
            </div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.itemDetails}>
              <div className={styles.itemDiscription}>
                <div className={styles.itemh2}>關於此產品</div>
                <hr className={styles.divider} />
                <div className={styles.itemh3}>
                  {typeof items === "string"
                    ? "No data"
                    : items.itemInfo[0].description}
                </div>
              </div>
              <div className={styles.itemDiscription}>
                {typeof items === "string" ? (
                  ""
                ) : items.itemInfo.length > 1 ? (
                  <div>
                    <div className={styles.itemh2}>飲品尺寸</div>
                    <div className={styles.sizeButtonWrap}>
                      {typeof items === "string"
                        ? " "
                        : items.itemInfo.map((entry) => (
                            <button
                              onClick={() => sizeHandler(entry.size)}
                              className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown"
                            >
                              <div className={styles.buttonText}>
                                {entry.size}
                              </div>
                            </button>
                          ))}
                    </div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
            <div className={styles.optionsWrap}>
              <div className={styles.optionsTitle}>
                <div className={styles.itemh2}>自訂選項</div>
              </div>
              {typeof items === "string"
                ? ""
                : items.optionList.length > 0
                ? items.optionList.map((entry) => (
                    <ItemPageOptions
                      optionListName={entry.option_list_name}
                      itemId={selectedSizeId!}
                    />
                  ))
                : "No Option data"}
            </div>
            <div className={styles.addItemWrap}>
              <div className={styles.quantityWrap}>
                <button
                  className="btn btn-circle bg-slate-500 w-8 h-8"
                  onClick={decreaseQuantity}
                >
                  <MinusIcon className="fill-white w-6 h-5" />
                </button>
                <div className={styles.count}>
                  <div className="text-white">{quantity}</div>
                </div>
                <button
                  className="btn btn-circle bg-red-600 w-8 h-8"
                  onClick={increaseQuantity}
                >
                  <PlusIcon className="fill-white w-6 h-5" />
                </button>
              </div>
              <button
                className="btn rounded-full  bg-yellow-900 px-28"
                onClick={() => dispatch(itemCheckOut())}
              >
                <div className={styles.addItemContent}>
                  <div className="text-white">加入購物車</div>
                  <div className={styles.vl}></div>
                  <div className="text-white">${subtotal}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
