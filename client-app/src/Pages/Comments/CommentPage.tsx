import { Textarea } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import styles from "./CommentPage.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function CommentPage() {
  const { transactionId } = useParams()
  const userName = useSelector((state:RootState)=>state.auth.user)
  const shopName = localStorage.getItem("commentingShop")
  const shopId = localStorage.getItem("shopId")
  const [comment, setComment] = useState("");
  const [star, setStar] = useState("0");
  const navigate = useNavigate();

  const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setStar(event.target.value);
  };

  const crossSubmit = () => {
    navigate('/CommentSummary');
    localStorage.removeItem("commentingShop")
    localStorage.removeItem("shopId")
  };

  const handleSubmit = async () => {
    console.log("Comment:", comment);
    console.log("Star rating:", star);

    // Save data to local storage
    const formData = {
      shopId: Number(shopId),
      transactionId: Number(transactionId),
      rating: star,
      description: comment
    };
    // localStorage.setItem("commentFormData", JSON.stringify(formData));

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
        localStorage.removeItem("commentingShop")
        localStorage.removeItem("shopId")
        navigate('/CommentSummary');
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error here
    }
  };

  // useEffect(() => {
  //   // Retrieve form data from local storage when component mounts
  //   const storedFormData = localStorage.getItem("commentFormData");
  //   if (storedFormData) {
  //     const { rating, description } = JSON.parse(storedFormData);
  //     setStar(rating);
  //     setComment(description);
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className="flex my-5">
          <button
            onClick={() => navigate(-1)}
            className={`self-center btn btn-circle btn-sm ml-2`}
          >
            <ChevronLeftIcon className="h-5 w-5 text-black" />
          </button>
        </div>

        <h2>你好，{userName}</h2>
        <h3>您的寶貴意見，是我們不斷進步的動力！</h3>
        <h4>請為<span className="font-bold">{shopName}</span>評分</h4>
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
          style={{ paddingTop: "1rem", width: "75%" }}
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
