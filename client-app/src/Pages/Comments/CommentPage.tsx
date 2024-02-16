import { Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import styles from "./CommentPage.module.css";

export function CommentPage() {
  const [comment, setComment] = useState("");
  const [star, setStar] = useState("0");

  const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setStar(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Comment:", comment);
    console.log("Star rating:", star);
  
    try {
      const response = await fetch("http://localhost:8100/comments/rating", { // Update the endpoint to '/comments'
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: star,
          description: comment,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Assuming submission was successful, you can handle accordingly
      else{
        console.log("Submission successful!");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error here
    }
  };
  // console.log("Sending data:", JSON.stringify({rating: star, description: comment}));

  return (
    <div className={styles.container}>
      <div className="relative w-[32rem]">
        <div className="relative w-[32rem] flex justify-end">
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

        <h2>你好，Maggie</h2>
        <h3>您的寶貴意見，是我們不斷進步的動力！</h3>
        <h4>請為 Blue Bottle Coffee 評分</h4>
        <div className="center-content">
          <div className="rating rating-md">
            {/* Star inputs here */}
            {/* Hidden radio button for 0-star rating */}
            <input
              key="0"
              type="radio"
              name="rating"
              className="hidden"
              value="0"
              onChange={handleRatingChange}
              checked={star === "0"}
              aria-label="No stars"
            />
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                value={index + 1}
                onChange={handleRatingChange}
                checked={star === `${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Textarea
          style={{ paddingTop: "1rem" }}
          placeholder="請留下你的保貴意見！"
          rows={15}
          onChange={handleCommentChange}
        />

        <div className="flex flex-col items-center py-1.5 fixed z-0 mx-auto inset-x-0">
          <button className="btn btn-wide" onClick={handleSubmit}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
}
