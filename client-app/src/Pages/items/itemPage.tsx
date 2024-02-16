import React, { useEffect, useState } from "react";
import styles from "./ItemPage.module.css";
import ItemPageOptions from "../../components/ItemPageOptions";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { GetItemInfo } from "../../hooks/ItemPageAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ItemPage() {
  let { id } = useParams();
  console.log("page", id);

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
        }>;
        optionList: Array<{
          option_list_name: string;
        }>;
      } = GetItemInfo(id!);
  const navigate = useNavigate();
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
                      <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                        <div className={styles.buttonText}>
                          {typeof items === "string"
                            ? " "
                            : items.itemInfo[0].size}
                        </div>
                      </button>
                      <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                        <div className={styles.buttonText}>
                          {typeof items === "string"
                            ? " "
                            : items.itemInfo[1].size}
                        </div>
                      </button>
                      <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                        <div className={styles.buttonText}>
                          {typeof items === "string"
                            ? " "
                            : items.itemInfo[2].size}
                        </div>
                      </button>
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
                      options={entry.option_list_name}
                      itemId={id!}
                    />
                  ))
                : "No Option data"}
            </div>
            <div className={styles.addItemWrap}>
              <button className="btn rounded-full  bg-zinc px-28">
                <div className={styles.addItemContent}>
                  <div>加入購物車</div>
                  <div className={styles.vl}></div>
                  <div>$50</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
