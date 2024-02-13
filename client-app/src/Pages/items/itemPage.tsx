import React from "react";
import "./ItemPage.css";
import { ItemCard } from "../../components/ItemCard";

export default function ItemPage() {
  return (
    <>
      <div>
        <img
          id="itemImg"
          src="https://www.thespruceeats.com/thmb/mouqNJc2-paHkBuRRuPU7ht_L4o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg"
        ></img>
      </div>
      <div id="itemWrap">
        <div id="itemName_container">
          <div id="itemName"></div>
        </div>
        <ItemCard />
      </div>
    </>
  );
}
