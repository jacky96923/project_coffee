import React, { useState, useEffect } from 'react';
import Sidebar from './component/Sidebar';
import { Textarea } from '@material-tailwind/react';



  const MenuPreview = () => {
    const [comments, setComments] = useState([]);
   
    // Perform the GET request when the component mounts
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await fetch("http://localhost:8100/comments/all");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("There was a problem with your fetch operation:", error);
        }
      };
      
      fetchComments();
    }, []);
    // Call the function to perform the POST request

  // Define the default value for the textarea
  const defaultValue = "This is the content of the first row.\n\n";

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold m-4">顧客評價</h1>
          </div>
        </header>
        
        {/* Textarea */}
        <div className="relative" style={{ marginTop: "1rem", marginLeft: "4rem", width: "80%" }}>
          <Textarea
            variant="static"
            rows={5}
            defaultValue={defaultValue} // Set the default value
            readOnly // Make the textarea un-editable
          />
          <div className="absolute top-0 right-0 mt-2 non-clickable">
            <div className="rating rating-md px-2">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-7"
                  className="mask mask-star-2 bg-orange-400"
                  readOnly // Added readOnly because this input cannot be changed directly
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Additional content */}
        <div className="flex justify-center mt-4 relative z-0 mx-auto inset-x-0"></div>
      </div>
    </div>
  );
};

export default MenuPreview;
