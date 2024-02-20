import React, { useEffect, useState } from "react";
import styles from "./ItemPageOptions.module.css";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import ItemOptionSlide from "./ItemOptionsSlide";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type ItemPageOptionsProps = {
  itemId: string;
  optionListName: string;
  selectedOption: string
};

export default function ItemPageOptions(props: ItemPageOptionsProps) {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(false);
  const [slide, setSlide] = useState("invisible");
  const [slideOptions, setSlideOption] = useState("translate-y-full");
  const [bg, setBg] = useState("opacity-0");
  // const [selected, setSelected] = useState<string[]>([]);

  console.log("optionPage", props.itemId);

  function slideHandler() {
    setIsClicked(!isClicked);
    setSlide("");
    setSlideOption("");
    setBg("opacity-80");
    queryClient.invalidateQueries({ queryKey: ["optionInfo"] });
  }

  function handleClose() {
    setSlide("invisible");
    setSlideOption("translate-y-full");
    setBg("opacity-0");
  }

  const optionsButtons = isClicked
    ? styles.optionsButtonsClicked
    : styles.optionsButtons;
//
  // const getSelectedOption = useSelector(
  //   (state: RootState) => state.itemPage.item.optionList
  // );
  // console.log("getSelected default", getSelectedOption);
  
  // useEffect(() => {
  //   let displayOption: string[] = [];
  //   getSelectedOption.forEach((entry) => {
  //     displayOption.push(entry.option.option_name);
  //   });
  //   console.log("displayOption", displayOption)
  //   setSelected(displayOption);
  //   console.log("ItemPageOptions Selected", selected);
  // }, [getSelectedOption]);
  // console.log("selected outside useEffect", selected)

//
  return (
    <>
      <div className={optionsButtons} onClick={() => slideHandler()}>
        <div className={styles.options}>
          <div>{props.optionListName}</div>
          
          <div className="flex font-bold">
            <p>{props.selectedOption}</p>
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
        optionListName={props.optionListName}
      />
    </>
  );
}
