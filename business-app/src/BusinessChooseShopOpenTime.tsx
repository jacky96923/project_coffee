import React, { useState } from "react";
import { Checkbox, Input, Button } from "@material-tailwind/react";
import "./BusinessChooseShopOpenTime.css";
export function BusinessChooseShopOpenTime() {
  const weekdays = ["星期一", "星期二", "星期三", "星期四", "星期五"];
  const weekend = ["星期六", "星期日"];
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
  const [weekdayCheckboxStates, setWeekdayCheckboxStates] = useState(
    Array(weekdays.length).fill(false)
  );
  const [weekendCheckboxStates, setWeekendCheckboxStates] = useState(
    Array(weekend.length).fill(false)
  );

  const handleWeekdayCheckboxClick = (index: number) => {
    // Update the state of the clicked weekday checkbox
    const newCheckboxStates = [...weekdayCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekdayCheckboxStates(newCheckboxStates);
  };

  const handleWeekendCheckboxClick = (index: number) => {
    // Update the state of the clicked weekend checkbox
    const newCheckboxStates = [...weekendCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekendCheckboxStates(newCheckboxStates);
  };

  return (
    <div className="top">
    <h1>開店時間</h1>
    
    <div className="flex">
      <div className="flex-1">
        <h1>平日</h1>

        {weekdays.map((weekday, index) => (
          <div key={index} className="my-2">
            <Checkbox
              id={`weekday-checkbox-${index}`}
              label={weekday}
              ripple={true}
              checked={weekdayCheckboxStates[index]}
              onChange={() => handleWeekdayCheckboxClick(index)}
              crossOrigin={undefined}
              style={{ marginRight: "8px" }} // Add margin-right to the checkboxes
            />

            {/* Show textbox only if the corresponding weekday checkbox is checked */}
            {weekdayCheckboxStates[index] && (
              <div style={{ marginTop: "8px" }}>
                <Input
                  type="text"
                  placeholder={`${weekday}...開店時間`}
                  onChange={(e) => console.log(e.target.value)}
                  crossOrigin={undefined}
                />
                <Input
                  type="text"
                  placeholder={`${weekday}...關門時間`}
                  onChange={(e) => console.log(e.target.value)}
                  style={{ marginTop: "8px" }}
                  crossOrigin={undefined}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1">
        <h1>週末</h1>
        {weekend.map((weekday, index) => (
          <div key={index} className="my-2">
            <Checkbox
              id={`weekend-checkbox-${index}`}
              label={weekday}
              ripple={true}
              checked={weekendCheckboxStates[index]}
              onChange={() => handleWeekendCheckboxClick(index)}
              crossOrigin={undefined}
              style={{ marginRight: "8px" }} // Add margin-right to the checkboxes
            />
            {/* Show textbox only if the corresponding weekend checkbox is checked */}
            {weekendCheckboxStates[index] && (
              <div style={{ marginTop: "8px" }}>
                <Input
                  type="text"
                  placeholder={`${weekday}...開店時間`}
                  onChange={(e) => console.log(e.target.value)}
                  crossOrigin={undefined}
                />
                <Input
                  type="text"
                  placeholder={`${weekday}...關門時間`}
                  onChange={(e) => console.log(e.target.value)}
                  style={{ marginTop: "8px" }}
                  crossOrigin={undefined}
                />
              </div>
            )}
          </div>
        ))}

      </div>

      <div className="flex-1">
        <h1>公眾假期</h1>
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
        <div>


        </div>
      </div>
    </div>
    <div className="button-container">
          <Button size="lg" placeholder={undefined}>
            上一步
          </Button>
          <Button id="nextstep" size="lg" placeholder={undefined}>
            下一步
          </Button>{" "}
        </div>
    </div>
  );
}
