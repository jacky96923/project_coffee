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

  const [weekdayCheckboxStates, setWeekdayCheckboxStates] = useState(
    Array(weekdays.length).fill(false)
  );
  const [weekendCheckboxStates, setWeekendCheckboxStates] = useState(
    Array(weekend.length).fill(false)
  );
  const [PHCheckboxStates, setPHCheckboxStates] = useState(
    Array(PH.length).fill(false)
  );

  const handleWeekdayCheckboxClick = (index: number) => {
    const newCheckboxStates = [...weekdayCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekdayCheckboxStates(newCheckboxStates);
  };

  const handleWeekendCheckboxClick = (index: number) => {
    const newCheckboxStates = [...weekendCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekendCheckboxStates(newCheckboxStates);
  };

  const handlePHCheckboxClick = (index: number) => {
    const newCheckboxStates = [...PHCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setPHCheckboxStates(newCheckboxStates);
  };
  const handleNextStepClick = () => {
    const checkedWeekdays: string[] = [];
    const checkedWeekends: string[] = [];
    const checkedPHs: string[] = [];

    weekdayCheckboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        checkedWeekdays.push(weekdays[index]);
      }
    });

    weekendCheckboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        checkedWeekends.push(weekend[index]);
      }
    });

    PHCheckboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        checkedPHs.push(PH[index]);
      }
    });

    console.log("Checked weekdays:", checkedWeekdays);
    console.log("Checked weekends:", checkedWeekends);
    console.log("Checked public holidays:", checkedPHs);
    // Perform further actions with the checked data
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
                style={{ marginRight: "8px" }}
              />
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
                style={{ marginRight: "8px" }}
              />
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
                checked={PHCheckboxStates[index]}
                onChange={() => handlePHCheckboxClick(index)}
                crossOrigin={undefined}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <Button size="lg" placeholder={undefined}>
          上一步
        </Button>
        <Button id="nextstep" size="lg" onClick={handleNextStepClick} placeholder={undefined}>
          下一步
        </Button>{" "}
      </div>
    </div>
  );
}
