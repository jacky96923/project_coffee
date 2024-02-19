import { Textarea } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import styles from "./CommentPage.module.css";
import { useNavigate } from 'react-router-dom';

export function CommentPage() {
  const [comment, setComment] = useState("");
  const [star, setStar] = useState("0");
  const navigate = useNavigate();

  const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (        event: { target: { value: React.SetStateAction<string>; }; }) => {
    setStar(event.target.value);
  };

  const crossSubmit = () => {
    navigate('/CommentSummary');
  };

  const handleSubmit = async () => {
    console.log("Comment:", comment);
    console.log("Star rating:", star);

    // Save data to local storage
    const formData = {
      rating: star,
      description: comment
    };
    localStorage.setItem("commentFormData", JSON.stringify(formData));

    try {
      // Perform your fetch operation here
      const response = await fetch("http://localhost:8100/comments/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log("Submission successful!");
        navigate('/CommentSummary');
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error here
    }
  };

  useEffect(() => {
    // Retrieve form data from local storage when component mounts
    const storedFormData = localStorage.getItem("commentFormData");
    if (storedFormData) {
      const { rating, description } = JSON.parse(storedFormData);
      setStar(rating);
      setComment(description);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className="{styles.relative w-[32rem]}">
        <div className="relative w-[32rem] flex justify-end">
          <button className="btn btn-circle btn-outline" onClick={crossSubmit}>
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
  className="a" // Add this line
  style={{ paddingTop: "1rem", width: "75%"}}
  placeholder="請留下你的寶貴意見！"
  rows={15}
  onChange={handleCommentChange}
/>


        <div className="flex flex-col items-center py-1.5  absolute fixed z-0 mx-auto inset-x-0">
<button className="btn btn-wide" onClick={handleSubmit} style={{ position: "relative" }}>
  提交
</button>
        </div>
      </div>
    </div>
  );
}
