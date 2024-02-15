import { Textarea, Button } from "@material-tailwind/react";
import React from "react";

import styles from "./CommentSummary.module.css";
export function CommentSummary() {
  return (
    <div className={styles.container}>
      <div className="relative w-[32rem]">
        <div className="flex justify-end mb-4">
          <button className="btn btn-circle btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h2>你好，Maggie </h2>
        <h2>Maggie 謝謝您的寶貴意見 ｜10積分已加至你的户口</h2>

        <div className="relative">
          <Textarea
            style={{ paddingTop: "1rem" }}
            variant="static"
            placeholder="請留下你的保貴意見！"
            rows={15}
          />
          <div className="rating rating-md absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="btn btn-wide">提交</button>
        </div>
      </div>
    </div>
  );
}
