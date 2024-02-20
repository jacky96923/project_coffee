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
};

export default function ItemPageOptions(props: ItemPageOptionsProps) {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(false);
  const [slide, setSlide] = useState("invisible");
  const [slideOptions, setSlideOption] = useState("translate-y-full");
  const [bg, setBg] = useState("opacity-0");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState("");

  console.log("optionPage", props.itemId);

  function slideHandler(e: any) {
    setIsClicked(!isClicked);
    setSlide("");
    setSlideOption("");
    setBg("opacity-80");
    queryClient.invalidateQueries({ queryKey: ["optionInfo"] });
    setSelectedIndex(e.target);
    console.log("check event", e.target);
  }
  function handleClose() {
    setSlide("invisible");
    setSlideOption("translate-y-full");
    setBg("opacity-0");
  }

  const optionsButtons = isClicked
    ? styles.optionsButtonsClicked
    : styles.optionsButtons;

  const getSelectedOption = useSelector(
    (state: RootState) => state.itemPage.item.optionList
  );
  console.log("getSelected", getSelectedOption);
  useEffect(() => {
    let displayOption: string[] = [];
    getSelectedOption.forEach((option) => {
      displayOption.push(option.option.option_name);
      setSelected(displayOption);
    });
    console.log("ItemPageOPtions Selected", selected);
  }, [getSelectedOption]);

  return (
    <>
      <div className={optionsButtons} onClick={(e) => slideHandler(e)}>
        <div className={styles.options}>
          <div>{props.optionListName}</div>
          {selected.map(
            (selectedOption, index) =>
              selectedOption === props.optionListName && (
                <div key={index} className={styles.optionButton}>
                  {selectedOption}
                </div>
              )
          )}
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
        optionListName={props.optionListName}
      />
    </>
  );
}
