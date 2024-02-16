import React, { useState } from "react";
import styles from "./ItemPageOptions.module.css";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import ItemOptionSlide from "./ItemOptionsSlide";

type ItemPageOptionsProps = {
  itemId: string;
  options: string;
};

export default function ItemPageOptions(props: ItemPageOptionsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [slide, setSlide] = useState("invisible");
  const [slideOptions, setSlideOption] = useState("translate-y-full");
  const [bg, setBg] = useState("opacity-0");
  function slideHandler() {
    setIsClicked(!isClicked);
    setSlide("");
    setSlideOption("");
    setBg("opacity-80");
  }
  function handleClose() {
    setSlide("invisible");
    setSlideOption("translate-y-full");
    setBg("opacity-0");
  }

  const optionsButtons = isClicked
    ? styles.optionsButtonsClicked
    : styles.optionsButtons;

  return (
    <>
      <div className={optionsButtons} onClick={slideHandler}>
        <div className={styles.options}>
          <div>{props.options}</div>
          <div>
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>
      </div>

      <ItemOptionSlide
        isSlideShow={slide}
        isSlideOptionShow={slideOptions}
        isBgShow={bg}
        onHide={handleClose}
        itemId={props.itemId}
        options={props.options}
      />
    </>
  );
}
