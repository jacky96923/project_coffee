import React, { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";
import { Textarea } from "@material-tailwind/react";

const MenuPreview = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [groupedDescriptions, setGroupedDescriptions] = useState<string[]>([]);
  const [groupedRatings, setGroupedRatings] = useState<number[]>([]);
  var shopId = 1000; // Set the default shop id or get it dynamically
  // Retrieve the JWT token from local storage
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    // Split the token into its three parts: header, payload, and signature
    const parts = jwtToken.split(".");

    // Decode and parse the payload (second part)
    const decodedPayload = JSON.parse(atob(parts[1]));

    // Get the shop ID from the decoded payload
    shopId = decodedPayload.id;
    console.log("Decoded JWT payload:", decodedPayload);
  } else {
    console.error("JWT token not found in local storage");
  }

  // Perform the GET request when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8100/comments/all?shop_id=${shopId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComments(data); // Set the comments state with the fetched data
        groupComments(data, shopId); // Group comments after fetching
        groupRatings(data, shopId); // Group ratings after fetching
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, [shopId]);

  // Group comments based on their attributes
  const groupComments = (data: any[], shopId: number) => {
    const descriptions = data
      .filter((comment: { shop_id: number }) => comment.shop_id === shopId)
      .map((comment: { description: string }) => comment.description);
    setGroupedDescriptions(descriptions);
    console.log("descriptions:", descriptions);
  };

  // Group ratings based on their attributes
  const groupRatings = (data: any[], shopId: number) => {
    const ratings = data
      .filter((comment: { shop_id: number }) => comment.shop_id === shopId)
      .map((comment: { rating: number }) => comment.rating);
    setGroupedRatings(ratings);
    console.log("stars:", ratings);
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="mr-1 h-5 w-5 text-warning"
          style={{ marginRight: "-0.2rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-screen h-screen">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold m-4">顧客評價</h1>
          </div>
        </header>

        {/* Textarea */}
        <div
          className="relative overflow-auto"
          style={{ marginTop: "1rem", marginLeft: "4rem", width: "85%" }}
        >
          {/* Render Textareas for descriptions */}

          {groupedDescriptions.map((description, index) => (
            <div key={index} className="mb-4  relative">
              <Textarea
                variant="static"
                rows={7}
                defaultValue={description}
                readOnly
                style={{
                  borderRadius: "0.8rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  border: "none",
                  resize: "none",
                  paddingTop: "2rem",
                }}
              />
              {/* Render stars based on rating */}
              <div className="absolute top-0 right-0 mt-2 non-clickable">
                <div className="rating rating px-4">
                  {renderStars(groupedRatings[index])}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional content */}
        <div className="flex justify-center mt-4 relative z-0 mx-auto inset-x-0"></div>
      </div>
    </div>
  );
};

export default MenuPreview;
