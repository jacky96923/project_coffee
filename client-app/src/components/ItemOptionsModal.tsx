import React, { useState } from "react";

export default function CoffeeOptions() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="accordion">
      <div
        className={`collapse collapse-arrow bg-base-200 ${
          selectedOption === "option1" ? "open" : ""
        }`}
      >
        <input
          type="radio"
          name="coffee-options"
          id="option1"
          checked={selectedOption === "option1"}
          value="option1"
          onChange={handleOptionChange}
        />
        <div className="collapse-title text-xl font-medium">
          <div>
            凍飲/熱飲
            {selectedOption === "option1" && (
              <span className="text-sm text-green-500 ml-2">(Selected)</span>
            )}
          </div>
        </div>
        <div className="collapse-content">
          {selectedOption === "option1" && (
            <>
              <p>Selected customization inputs go here</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
