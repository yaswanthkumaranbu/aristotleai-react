import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useTheme from "../../context";

Chart.register(...registerables);

const App = () => {
  const { theme, darkTheme, lightTheme, violetTheme } = useTheme();
  const [color, setColor] = useState("tw-bg-white");

  useEffect(() => {
    if (theme == "dark") setColor("bg-gray-800 text-white");
    else if (theme == "light") setColor("tw-bg-white");
    else if (theme == "violet") setColor("tw-bg-purple-950 text-white");
    else if (theme == "cyan") setColor("tw-bg-cyan-950 text-white");
    else if (theme == "blue") setColor("tw-bg-blue-950 text-white");
    else if (theme == "lime") setColor("tw-bg-lime-950 text-white");
  }, [theme]);

  const pieChartData = {
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
        label: "Dataset (Pie Chart)",
        backgroundColor: [
          "Indigo",
          "Purple",
          "Yellow",
          "Teal",
          "Red",
          "Navy",
          "Brown",
        ],
        data: [10, 14, 17, 16, 19, 16, 17],
      },
    ],
  };

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
        backgroundColor: "rgb(25, 51, 79)",
        borderColor: "rgba(219, 79, 79, 0.77)",
        borderWidth: 2,
        data: [68, 77, 89, 80, 30, 10, 209],
      },
    ],
  };

  const lineChartData = {
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
        label: " Dataset(Line Chart)",
        fill: false,
        lineTension: 0.5,
        borderColor: "rgb(25, 51, 79)",
        borderWidth: 2,
        data: [10, 14, 17, 16, 19, 16, 17],
      },
    ],
  };

  return (
    <div className="ml-5 mt-7 mb-5">
      {/* Include Bootstrap CSS */}
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="row">
        {/* Bar Chart */}
        <div className="col-md-7">
          <div className="chart-container max-w-10">
            <canvas
              className="max-w-100"
              id="chartjs-bar-chart"
              width="100"
              height="10"
            ></canvas>
          </div>
          <div className="card border-5 shadow rounded-lg">
            <div className={color + " card-body"}>
              <h5 className="card-title text-center mb-4">Bar Chart</h5>

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
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-4">
          <div className="chart-container max-w-10">
            <canvas id="chartjs-combo-chart" width="250" height="10"></canvas>
          </div>
          <div className="card border-5 shadow rounded-lg">
            <div className={color + " card-body"}>
              <h5 className="card-title text-center mb-4">Pie Chart</h5>
              <div className="chart-container">
                <Pie
                  data={pieChartData}
                  options={{
                    title: {
                      display: true,
                      text: "Class Strength (Pie Chart)",
                      fontSize: 20,
                      fontColor: "#333", // Adjust font color
                    },
                    legend: {
                      display: true,
                      position: "right",
                      labels: {
                        boxWidth: 15,
                        fontColor: "#555", // Adjust font color
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Render Line chart */}
        <div className="col-md-11">
          <div className="chart-container max-w-11">
            <canvas
              className="max-w-800"
              id="chartjs-line-chart"
              width="800"
              height="50"
            ></canvas>
            <div className="card border-5 shadow rounded-lg">
              <div className="card">
                <div className={color + " card-body"}>
                  <h5 className="card-title">Line Chart</h5>
                  <Line
                    data={lineChartData}
                    options={{
                      title: {
                        display: true,
                        text: "Class Strength (Line Chart)",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
