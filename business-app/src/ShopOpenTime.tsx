import React, { useState } from "react";
import { Checkbox, Input, Button } from "@material-tailwind/react";
import styles from "./ShopOpenTime.module.css";
import { useMutation } from "@tanstack/react-query";
export function BusinessChooseShopOpenTime() {
  const weekdays = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];

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

  const [PHCheckboxStates, setPHCheckboxStates] = useState(
    Array(PH.length).fill(false)
  );
  const [openingTimes, setOpeningTimes] = useState(
    weekdays.map((weekday) => ({ weekday, start: "", end: "" }))
  );

  const handleWeekdayCheckboxClick = (index: number) => {
    const newCheckboxStates = [...weekdayCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setWeekdayCheckboxStates(newCheckboxStates);
  };

  const handlePHCheckboxClick = (index: number) => {
    const newCheckboxStates = [...PHCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setPHCheckboxStates(newCheckboxStates);
  };

  const handleNextStepClick = async () => {
    const checkedWeekdays: string[] = [];
    const checkedPHs: string[] = [];

    // Iterate through weekday checkboxes to find checked weekdays
    weekdayCheckboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        checkedWeekdays.push(weekdays[index]);
      }
    });

    // Iterate through public holiday checkboxes to find checked holidays
    PHCheckboxStates.forEach((isChecked, index) => {
      if (isChecked) {
        checkedPHs.push(PH[index]);
      }
    });

    console.log("Checked weekdays:", checkedWeekdays);
    console.log("Checked public holidays:", checkedPHs);

    // Filter opening times based on checked weekdays
    const filteredOpeningTimes = openingTimes.filter(
      (time, index) => weekdayCheckboxStates[index]
    );

    // Log filtered opening times
    console.log("Opening times:", filteredOpeningTimes);

    await fetch("/api/shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openingTimes: filteredOpeningTimes,
        publicHolidays: checkedPHs,
      }),
    });
    //   const jsonData = JSON.stringify({
    //     openingTimes: filteredOpeningTimes,
    //     publicHolidays: checkedPHs,
    // });
    // console.log(jsonData);
    // Perform further actions with the checked data
  };

  const handleInputChange = (weekday: string, type: string, value: string) => {
    const newOpeningTimes = openingTimes.map((time) =>
      time.weekday === weekdays[parseInt(weekday)]
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
                label={weekdays[weekdayIndex]}
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
                    placeholder={`${weekdays[weekdayIndex]}...開店時間`}
                    onChange={(e) =>
                      handleInputChange(
                        weekdayIndex.toString(),
                        "start",
                        e.target.value
                      )
                    }
                    crossOrigin={undefined}
                  />
                  <Input
                    type="text"
                    placeholder={`${weekdays[weekdayIndex]}...關門時間`}
                    style={{
                      marginTop: "8px",
                      marginLeft: "10px",
                      width: "80%",
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        weekdayIndex.toString(),
                        "end",
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
                id={`weekend-checkbox-${index}`}
                label={weekdays[index]} // Use weekdays array to label checkboxes
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
                    placeholder={`${weekdays[index]}...開店時間`}
                    style={{ marginLeft: "10px", width: "80%" }} // Use weekdays array to label input placeholders
                    onChange={(e) =>
                      handleInputChange(
                        index.toString(),
                        "start",
                        e.target.value
                      )
                    }
                    crossOrigin={undefined}
                  />
                  <Input
                    type="text"
                    placeholder={`${weekdays[index]}...關門時間`} // Use weekdays array to label input placeholders
                    onChange={(e) =>
                      handleInputChange(index.toString(), "end", e.target.value)
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
