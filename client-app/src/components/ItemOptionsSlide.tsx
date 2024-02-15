import styles from "./ItemOptionsSlide.module.css";

type SlideProps = {
  isSlideShow: string;
  isSlideOptionShow: string;
  isBgShow: string;
  onHide: () => void;
};

export default function ItemOptionSlide(props: SlideProps) {
  function slideHandler() {
    props.onHide();
  }
  return (
    <>
      <div id="container" className={`${props.isSlideShow}`}>
        <div
          onClick={slideHandler}
          id="slideover-bg"
          className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-zinc ${props.isBgShow}`}
        ></div>
        <div
          id="slideover"
          className={`w-full bg-black h-1/2 absolute duration-500 ease-out ${props.isSlideOptionShow} ${styles.slideover} bottom-0 z-3`}
        ></div>
      </div>
    </>
  );
}
