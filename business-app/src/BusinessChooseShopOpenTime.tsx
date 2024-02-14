import React, { useState } from "react";
import { Checkbox, Input } from "@material-tailwind/react";

export function BusinessChooseShopOpenTime() {
  const weekdays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
  const PH = [
    "一月一日",
    "農曆新年（初一）",
    "農曆新年（初二）",
    "農曆新年（初三）",
    "農曆新年（初四）",
    "耶穌受難節",  
    "復活節星期一",
    "清明節",
    "勞動節",
    "佛誕",
    "端午節",
    "香港特別行政區成立紀念日",
    "中秋節翌日",
    "國慶日",
    "重陽節",
    "聖誕節",
  ];

  // Array to keep track of the state of each checkbox
  const [checkboxStates, setCheckboxStates] = useState(Array(weekdays.length).fill(false));

  const handleCheckboxClick = (index: number) => {
    // Update the state of the clicked checkbox
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {weekdays.map((weekday, index) => (
          <div key={index} className="my-2">
            <Checkbox
              id={`weekday-checkbox-${index}`}
              label={weekday}
              ripple={true}
              checked={checkboxStates[index]}
              onChange={() => handleCheckboxClick(index)}
              crossOrigin={undefined}
            />
            {/* Show textbox only if the corresponding checkbox is checked */}
            {checkboxStates[index] && (
              <Input
                type="text"
                placeholder={`Enter something for ${weekday}...`}
                onChange={(e) => console.log(e.target.value)} crossOrigin={undefined}              />
            )}
          </div>
        ))}
      </div>
      <div className="flex-1">
        {PH.map((event, index) => (
          <div key={index} className="my-1">
            <Checkbox
              id={`event-checkbox-${index}`}
              label={event}
              ripple={true}
              crossOrigin={undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
