import React from "react";

const BusinessWelcome: React.FC = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <h1>歡迎加入！</h1>
      <h1>按下一步進入商家版面設置餐單！</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          className="group relative w-35 flex justify-center mt-4 mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ 
            backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
            borderColor: "transparent"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #B07A4E, #4A2416)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #CB8A58, #562B1A)")}
        >
          上一步
        </button>
        <button
          type="submit"
          className="group relative w-35 flex justify-center mt-4 ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ 
            backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
            borderColor: "transparent"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #B07A4E, #4A2416)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #CB8A58, #562B1A)")}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default BusinessWelcome;
