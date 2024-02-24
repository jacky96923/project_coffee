import React, { useEffect, useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import styles from "./CommentSummary.module.css";


export function CommentSummary() {
  const navigate = useNavigate();
  // const [commentData, setCommentData] = useState({
  //   rating: "",
  //   description: ""
  // });

  // Function to navigate to the login page
  const navigateToMainPage = () => {
    navigate('/');
  };

  const navigateToAllReceiptsPage = () => {
    navigate('/receipt/all');
  };

  // useEffect(() => {
  //   // console.log("Component mounted or commentData changed");
  //   const storedData = localStorage.getItem("commentFormData");

  //   if (storedData !== null) {
  //     const parsedData = JSON.parse(storedData);
  //     console.log("Parsed data:", parsedData);
  //     setCommentData(parsedData);
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      <div className="flex flex-col justify-center h-screen">
        <div>
          <div className="flex justify-end mb-4">
            {/* Additional controls could be placed here */}
          </div>

          <div className="text-center">
            <h2>謝謝您的寶貴意見</h2>
            <h2>你的户口已獲得<span className="font-bold">10積分</span></h2>
          </div>

          {/* <div className="relative">
            <Textarea
              style={{ paddingTop: "1rem" }}
              variant="static"
              rows={15}
              value={commentData.description}
            />
            <div className="rating rating-md absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-7"
                  className="mask mask-star-2 bg-orange-400"
                  checked={commentData.rating === `${star}`}
                  readOnly // Added readOnly because this input cannot be changed directly
                />
              ))}
            </div>
          </div> */}

          <div className="flex justify-center mt-4 relative z-0 mx-auto inset-x-0">
            <button className="btn btn-wide" onClick={navigateToMainPage} style={{ position: "relative" }}>
              返回主頁
            </button>
          </div>
          <div className="flex justify-center mt-4 relative z-0 mx-auto inset-x-0">
            <button className="btn btn-wide" onClick={navigateToAllReceiptsPage} style={{ position: "relative" }}>
              返回訂單
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}