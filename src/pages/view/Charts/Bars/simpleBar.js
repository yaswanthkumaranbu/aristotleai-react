import React from "react";
import { Bar } from "react-chartjs-2";

export const SimpleBar = () => {
  const barChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Dataset (Bar Chart)",
        // backgroundColor: "rgb(25, 51, 79)",
        borderColor: "rgba(219, 79, 79, 0.77)",
        borderWidth: 2,
        data: [68, 77, 89, 80, 30, 10, 209],
      },
    ],
  };

  return (
    <Bar
      data={barChartData}
      options={{
        title: {
          display: true,
          text: "Class Strength (Bar Chart)",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
};
export default SimpleBar;
