import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
// import useTheme from "../../context";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import SideBySideStackedBars from "./Charts/Bars/Side-By-Side_Stacked_Bars";
import Sidebyside from "./Charts/Bars/side-by-side";
import SimpleBar from "./Charts/Bars/simpleBar";
import StepLine from "./Charts/Lines/Step-line";
import SimpleLine from "./Charts/Lines/SimpleLine";
import Spline from "./Charts/Lines/Spline";

Chart.register(...registerables);

const App = () => {
  // const { theme } = useTheme();
  // const [color, setColor] = useState("tw-bg-white");
  const [chartNo, setChartNo] = useState(0);
  const [chartName, setChartName] = useState("Simple Bar");

  // useEffect(() => {
  //   if (theme == "dark") setColor("bg-gray-800 text-white");
  //   else if (theme == "light") setColor("tw-bg-white");
  //   else if (theme == "violet") setColor("tw-bg-purple-950 text-white");
  //   else if (theme == "cyan") setColor("tw-bg-cyan-950 text-white");
  //   else if (theme == "blue") setColor("tw-bg-blue-950 text-white");
  //   else if (theme == "lime") setColor("tw-bg-lime-950 text-white");
  // }, [theme]);

  const call = () => {
    if (chartNo == 0) return <SimpleBar />;
    else if (chartNo == 1) return <Sidebyside />;
    else if (chartNo == 2) return <SideBySideStackedBars />;
    else if (chartNo == 3) return <StepLine />;
    else if (chartNo == 4) return <SimpleLine />;
    else if (chartNo == 5) return <Spline />;
  };

  const setFunction = (chartNo, ChartName) => {
    setChartNo(chartNo);
    setChartName(ChartName);
  };

  const style1 = {
    display: "flex",
    justifyContent: "left",
    paddingLeft: "15%",
    color: "gray",
  };
  const style2 = {
    display: "flex",
    justifyContent: "left",
    paddingLeft: "10%",
    color: "black",
  };

  return (
    <div
      className="container1"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "50px",
      }}
    >
      <style>
        {`
          .container1::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="row">
        <span>
          <DropdownButton
            id="dropdown-basic-button"
            title="Chart List"
            style={{
              position: "fixed",
              zIndex: "1",
              top: "2%",
            }}
          >
            <p style={style2}>BAR CHART</p>
            <Dropdown.Item
              onClick={() => setFunction(0, "Simple Bar")}
              style={style1}
            >
              Simple Bar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFunction(1, "Side-By-Side Bar")}
              style={style1}
            >
              Side-By-Side Bar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFunction(2, "Stacked Bar")}
              style={style1}
            >
              Stacked Bar
            </Dropdown.Item>
            <div style={{ padding: "5%" }}></div>
            <p style={style2}>LINE CHART</p>
            <Dropdown.Item
              onClick={() => setFunction(4, "Simple Line")}
              style={style1}
            >
              Simple Line
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFunction(5, " Spline")}
              style={style1}
            >
              Spline
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFunction(3, "Step Line ")}
              style={style1}
            >
              Step Line
            </Dropdown.Item>
          </DropdownButton>
        </span>

        <div className="col-md-11" style={{ width: "100%" }}>
          <div className="chart-container max-w-11" style={{ height: "33vh" }}>
            <canvas
              className="max-w-800"
              id="chartjs-line-chart"
              width="800"
              height="50"
            ></canvas>
            <div className="card border-5 shadow rounded-lg">
              <div className="card">
                <div className={" card-body"}>
                  <h5 className="card-title">{chartName}</h5>
                  {call()}
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
