import React, { useState } from "react";
import { Checkbox, Input, Button } from "@material-tailwind/react";
import styles from "./ShopOpenTime.module.css";
import { useMutation } from "@tanstack/react-query";
export function BusinessChooseShopOpenTime() {
  const WeekdaysPH = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
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
    Array(WeekdaysPH.length).fill(false)
  );


  const [openingTimes, setOpeningTimes] = useState(
    WeekdaysPH.map((weekday) => ({ weekday, start_time: "", close_time: "" }))

    
  );

  const handleWeekdayCheckboxClick = (index: number) => {
    const newCheckboxStates = [...weekdayCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekdayCheckboxStates(newCheckboxStates);
  };



  const handleNextStepClick = async () => {
  const checkedWeekdays: string[] = [];
  const checkedOpenTimes: string[] = [];
  const checkedCloseTimes: string[] = [];
  const checkedPHs: string[] = [];

  // Iterate through the openingTimes to find checked WeekdaysPH and corresponding open/close_time_time times
  openingTimes.forEach((time, index) => {
    if (weekdayCheckboxStates[index]) {
      checkedWeekdays.push(time.weekday);
      checkedOpenTimes.push(time.start_time);
      checkedCloseTimes.push(time.close_time);
    }
  });

  // Log the selected days and the corresponding open and close_time_time times
  // console.log("Selected Days:", checkedWeekdays);
  // console.log("Open Times:", checkedOpenTimes);
  // console.log("Close Times:", checkedCloseTimes);


  // Log the selected public holidays
  

  // Stringify the selected days and the corresponding open time inputs
  const selectedDaysWithOpenTime = checkedWeekdays.map((day, index) => ({
    day,
    start_time: checkedOpenTimes[index],
    close_time: checkedCloseTimes[index]
  }));

  // Log the selected days and the corresponding open time inputs


  // Stringify the data before sclose_timeing it in the POST request
  const requestBody = JSON.stringify({
    openingTimes: selectedDaysWithOpenTime,
    
  });
  console.log("Selected Days with Open Time:", selectedDaysWithOpenTime);
  // Log the JSON stringified data
  // console.log("Request Body:", requestBody);

  // Sclose_time the JSON stringified data in the POST request
  await fetch("http://localhost:8100/shopopentime/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
};

  const handleInputChange = (weekday: string, type: string, value: string) => {
    const newOpeningTimes = openingTimes.map((time) =>
      time.weekday === WeekdaysPH[parseInt(weekday)]
        ? { ...time, [type]: value }
        : time
    );
    setOpeningTimes(newOpeningTimes);
  };

  return (
    <div className={styles.top}>
      <p className="m-3 flex justify-center font-bold text-2xl">開店時間</p>
      <div className={styles.flex}>
        <div className="flex-1">
          <h1>平日</h1>
          {[0, 1, 2, 3, 4].map((weekdayIndex, index) => (
            <div key={index} className="my-2">
              <Checkbox
                id={`weekday-checkbox-${index}`}
                label={WeekdaysPH[weekdayIndex]}
                ripple={true}
                checked={weekdayCheckboxStates[weekdayIndex]}
                onChange={() => handleWeekdayCheckboxClick(weekdayIndex)}
                crossOrigin={undefined}
                style={{ marginRight: "8px" }}
              />
              {weekdayCheckboxStates[weekdayIndex] && (
                <div style={{ marginTop: "8px" }}>
                  <Input
                    type="text"
                    style={{ marginLeft: "10px", width: "80%" }}
                    placeholder={`${WeekdaysPH[weekdayIndex]}...開店時間`}
                    onChange={(e) =>
                      handleInputChange(
                        weekdayIndex.toString(),
                        "start_time",
                        e.target.value
                      )
                    }
                    crossOrigin={undefined}
                  />
                  <Input
                    type="text"
                    placeholder={`${WeekdaysPH[weekdayIndex]}...關門時間`}
                    style={{
                      marginTop: "8px",
                      marginLeft: "10px",
                      width: "80%",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        weekdayIndex.toString(),
                        "close_time",
                        e.target.value
                      )
                    }
                    crossOrigin={undefined}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <h1>週末</h1>
          {[5, 6].map((index) => (
            <div key={index} className="my-2">
              <Checkbox
                id={`weekclose_time-checkbox-${index}`}
                label={WeekdaysPH[index]} // Use WeekdaysPH array to label checkboxes
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
                    placeholder={`${WeekdaysPH[index]}...開店時間`}
                    style={{ marginLeft: "10px", width: "80%" }} // Use WeekdaysPH array to label input placeholders
                    onChange={(e) =>
                      handleInputChange(
                        index.toString(),
                        "start_time",
                        e.target.value
                      )
                    }
                    crossOrigin={undefined}
                  />
                  <Input
                    type="text"
                    placeholder={`${WeekdaysPH[index]}...關門時間`} // Use WeekdaysPH array to label input placeholders
                    onChange={(e) =>
                      handleInputChange(index.toString(), "close_time", e.target.value)
                    }
                    style={{
                      marginTop: "8px",
                      marginLeft: "10px",
                      width: "80%",
                    }}
                    crossOrigin={undefined}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
     
<div className="flex-1">
  <h1>公眾假期</h1>
  {Array.from({ length: 16 }, (_, index) => index + 7).map((index) => (
    <div key={index} className="my-2">
      <Checkbox
        id={`weekclose_time-checkbox-${index}`}
        label={WeekdaysPH[index]}
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
            placeholder={`${WeekdaysPH[index]}...開店時間`}
            style={{ marginLeft: "10px", width: "80%" }}
            onChange={(e) =>
              handleInputChange(index.toString(), "start_time", e.target.value)
            }
            crossOrigin={undefined}
          />
          <Input
            type="text"
            placeholder={`${WeekdaysPH[index]}...關門時間`}
            onChange={(e) =>
              handleInputChange(index.toString(), "close_time", e.target.value)
            }
            style={{
              marginTop: "8px",
              marginLeft: "10px",
              width: "80%",
            }}
            crossOrigin={undefined}
          />
        </div>
      )}
    </div>
  ))}
</div>


      </div>
      <div className={styles.buttonContainer}>
        <Button
          placeholder={"上一步"}
          type="submit"
          className="group relative w-35 flex justify-center mt-4 ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        >
          上一步
        </Button>
        <Button
          placeholder={"上一步"}
          type="submit"
          className="group relative w-35 flex justify-center mt-4 ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleNextStepClick}
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
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
