import React, { useEffect, useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import styles from "./CommentSummary.module.css";

export function CommentSummary() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const [commentData, setCommentData] = useState({
    rating: "",
    description: ""
  });

  // Function to navigate to the login page
  const navigateToLoginPage = () => {
    navigate('/client-login'); // use navigate function to change the route
  };

  useEffect(() => {
    // Your useEffect logic here...
  }, [commentData]);

  return (
    <div className={styles.container}>
      <div className="relative w-[32rem]">
        <div className="flex justify-end mb-4">

        </div>

        <h2>你好，Maggie </h2>
        <h2>Maggie 謝謝您的寶貴意見 ｜10積分已加至你的户口</h2>

        <div className="relative">
          <Textarea
            style={{ paddingTop: "1rem" }}
            variant="static"
          
            rows={15}
            // Add this line to make the textarea non-editable
            value={commentData.description} // Set value of the Textarea
          />
          <div className="rating rating-md absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <input
                key={index}
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                checked={commentData.rating === `${star}`} // Check the input if rating matches
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 fixed z-0 mx-auto inset-x-0">
        <button className="btn btn-wide" onClick={navigateToLoginPage}>
      返回主頁
    </button>
        </div>
      </div>
    </div>
  );
}
