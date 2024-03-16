import React from "react";
import { Bar } from "react-chartjs-2";

import { population as data } from "../../demo-data/data-vizualization";

const SideBySideStackedBars = () => {
  // Labels for each state
  const labels = data.map((item) => item.state);

  // Extracting data for males and females separately
  const maleData = data.map((item) => ({
    state: item.state,
    young: item.maleyoung,
    middle: item.malemiddle,
    older: item.maleolder,
  }));
  const femaleData = data.map((item) => ({
    state: item.state,
    young: item.femaleyoung,
    middle: item.femalemiddle,
    older: item.femaleolder,
  }));

  // Generating datasets for males and females
  const maleDatasets = [
    {
      label: "Male (0-14)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      data: maleData.map((item) => item.young),
    },
    {
      label: "Male (15-64)",
      backgroundColor: "rgba(255, 159, 64, 0.5)",
      data: maleData.map((item) => item.middle),
    },
    {
      label: "Male (65 and older)",
      backgroundColor: "rgba(255, 206, 86, 0.5)",
      data: maleData.map((item) => item.older),
    },
  ];

  const femaleDatasets = [
    {
      label: "Female (0-14)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      data: femaleData.map((item) => item.young),
    },
    {
      label: "Female (15-64)",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      data: femaleData.map((item) => item.middle),
    },
    {
      label: "Female (65 and older)",
      backgroundColor: "rgba(153, 102, 255, 0.5)",
      data: femaleData.map((item) => item.older),
    },
  ];

  const chartData = {
    labels: labels,
    datasets: [...maleDatasets, ...femaleDatasets],
  };

  const options = {
    indexAxis: "x",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Population",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "State",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SideBySideStackedBars;
