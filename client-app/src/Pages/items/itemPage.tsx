import React, { useEffect, useState } from "react";
import styles from "./ItemPage.module.css";
import ItemPageOptions from "../../components/ItemPageOptions";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function ItemPage() {
  const navigate = useNavigate();
  const [cupSize, setCupSize] = useState(null);

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          className={styles.itemImg}
          src="https://www.thespruceeats.com/thmb/mouqNJc2-paHkBuRRuPU7ht_L4o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg"
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
            <div className={styles.itemName}>朱古力咖啡</div>
          </div>
          <div className={styles.itemCard}>
            <div className={styles.itemDetails}>
              <div className={styles.itemDiscription}>
                <div className={styles.itemh2}>關於此產品</div>
                <hr className={styles.divider} />
                <div className={styles.itemh3}>
                  摩卡咖啡是義式拿鐵咖啡的變種。和經典的義式拿鐵咖啡一樣，它通常是由三分之一的義式濃縮咖啡和三分之二的奶沫配成，不過它還會加入少量巧克力。
                </div>
              </div>
              <div className={styles.itemDiscription}>
                <div>
                  <div className={styles.itemh2}>飲品尺寸</div>
                  <div className={styles.sizeButtonWrap}>
                    <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                      <div className={styles.buttonText}>小杯</div>
                    </button>
                    <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                      <div className={styles.buttonText}>中杯</div>
                    </button>
                    <button className="btn btn-warning bg-gradient-to-r from-light-brown to-dark-brown">
                      <div className={styles.buttonText}>大杯</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.optionsWrap}>
              <div className={styles.optionsTitle}>
                <div className={styles.itemh2}>自訂選項</div>
              </div>
              <ItemPageOptions />
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
