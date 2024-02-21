import React from "react";

const BusinessWelcome: React.FC = () => {
  const handleClick = () => {
    // Retrieve existing data from local storage
    const fullAddressString = localStorage.getItem("fullAddress");
    const registrationDataString = localStorage.getItem("registrationData");

    // Parse retrieved data if it exists
    const fullAddress = fullAddressString ? JSON.parse(fullAddressString) : {};
    const registrationData = registrationDataString ? JSON.parse(registrationDataString) : {};

    // Merge data
    const mergedData = {
      ...fullAddress,
      ...registrationData,
    };

    // Update local storage with merged data
    localStorage.setItem("mergedData", JSON.stringify(mergedData));

    // For demonstration, you can log the merged data
    console.log("Merged Data:", mergedData);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <h1 style={{ fontSize: "24px", paddingBottom: "3rem" }}>歡迎加入！</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ fontSize: "24px", paddingBottom: "3rem" }}>
          按註冊進入商家版面設置餐單！
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          className="group relative w-35 flex justify-center mt-4 mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{
            backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
            borderColor: "transparent",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundImage =
              "linear-gradient(to right, #B07A4E, #4A2416)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundImage =
              "linear-gradient(to right, #CB8A58, #562B1A)")
          }
          onClick={handleClick} // Call handleClick when the button is clicked
        >
          註冊
        </button>
      </div>
    </div>
  );
};

export default BusinessWelcome;
