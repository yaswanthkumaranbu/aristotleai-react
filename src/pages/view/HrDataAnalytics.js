import React, { useState, useEffect, useRef } from "react";
import "./hr.css";
import CSV from "./techstars4.csv";
const HrDataAnalytics = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV);
        if (!response.ok) {
          throw new Error("Failed to fetch CSV data");
        }
        const data = await response.text();
        const parsedData = parseCSV(data);
        setCsvData(parsedData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    return rows.map((row) => row.split(","));
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handleCheckboxChange = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  return (
    <div className="container">
      {/* <button onClick={toggleTableVisibility}>Toggle CSV Table</button> */}
      <div className="tw-w-full tw-py-4 tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-transparent tw-from-80% ">
        <h1 className="tw-text-2xl tw-text-black tw-font-bold">
          Hr Data Analytics
        </h1>
      </div>
      {error && <p>Error: {error}</p>}
      {isTableVisible && csvData.length > 0 && (
        <div className="table-container" ref={tableRef}>
          <table>
            <thead>
              <tr>
                {<th></th>}
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={selectedRows.includes(rowIndex) ? "selected" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(rowIndex)}
                      checked={selectedRows.includes(rowIndex)}
                    />
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HrDataAnalytics;
