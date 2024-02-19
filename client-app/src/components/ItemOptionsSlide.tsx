import { useEffect, useState } from "react";
import { GetOptionInfo } from "../hooks/ItemSlideAPI";
import styles from "./ItemOptionsSlide.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { optionAndCost } from "../slices/itemPageSlice";

type SlideProps = {
  itemId: string;
  optionListName: string;
  isSlideShow: string;
  isSlideOptionShow: string;
  isBgShow: string;
  onHide: () => void;
};

export default function ItemOptionSlide(props: SlideProps) {
  const [isClicked, setIsClicked] = useState(true);
  const [optionSelected, setOptionSelected] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  function slideHandler() {
    props.onHide();
  }

  function optionClickHandler(entry: {
    option_name: string;
    extra_cost?: number;
  }) {
    setIsClicked(!isClicked);
    setOptionSelected(entry.option_name);
    if (entry.extra_cost !== null && typeof entry.extra_cost === "number") {
      setSelectedPrice(entry.extra_cost);
      dispatch(
        optionAndCost({
          optionListName: props.optionListName,
          option_name: entry.option_name,
          price: entry.extra_cost,
        })
      );
    } else {
      dispatch(
        optionAndCost({
          optionListName: props.optionListName,
          option_name: entry.option_name,
          price: null,
        })
      );
    }
    props.onHide();
  }

  const optionItems = !isClicked
    ? styles.optionsButtonsClicked
    : styles.optionItems;

  const options:
    | string
    | Array<{
        option_name: string;
        extra_cost: number;
      }> = GetOptionInfo(props.itemId, props.optionListName);

  // useEffect (()=>{
  //   if(options) {
  //     dispatch(setOptionState({ option_name: string, extra_cost: number, }))
  //   }
  // })

  return (
    <>
      <div id="container" className={`${props.isSlideShow}`}>
        <div
          onClick={slideHandler}
          id="slideover-bg"
          className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-black ${props.isBgShow}`}
        ></div>
        <div
          id="slideover"
          className={`w-full bg-black h-1/2 absolute duration-500 ease-out ${props.isSlideOptionShow} ${styles.slideover} bottom-0 z-3`}
        >
          <div className={styles.optionsContainer}>
            {Array.isArray(options)
              ? options.map((entry) => (
                  <div className={styles.optionItems}>
                    <div
                      onClick={() => optionClickHandler(entry)}
                      className={`${styles.optionText} ${optionItems}`}
                    >
                      {entry.option_name}{" "}
                      {entry.extra_cost !== null ? "+$" + entry.extra_cost : ""}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
