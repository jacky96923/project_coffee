import { GetOptionInfo } from "../hooks/ItemSlideAPI";
import styles from "./ItemOptionsSlide.module.css";

type SlideProps = {
  itemId: string;
  options: string;
  isSlideShow: string;
  isSlideOptionShow: string;
  isBgShow: string;
  onHide: () => void;
};

export default function ItemOptionSlide(props: SlideProps) {
  function slideHandler() {
    props.onHide();
  }

  const options:
    | string
    | Array<{
        option: string;
        extra_cost: number;
      }> = GetOptionInfo(props.itemId, props.options);

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
              ? options!.map((entry) => (
                  <div className={styles.optionItems}>
                    <div className={styles.optionText}>{entry.option}</div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
