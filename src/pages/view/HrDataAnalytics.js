"use strict";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState, useContext, useEffect } from "react";
import useTheme from "../../context";
import data from "./csvjson.json";
import "./table.css";

const App = () => {
  const { theme, darkTheme, lightTheme, violetTheme } = useTheme();
  const [color, setColor] = useState("ag-theme-quartz");
  const [rowData, setRowData] = useState(data);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Sl No",
      filter: "agNumberColumnFilter",
      checkboxSelection: true,
    },
    { field: "Company Name" },
    {
      headerName: "Website",
      field: "Website",
      cellRenderer: (params) => {
        const url = `https://${params.value}`;
        return (
          <a href={url} target="_blank" style={{ color: "blue" }}>
            {params.value}
          </a>
        );
      },
    },
    { field: "Twitter_url" },
    { field: "Linkedin_url" },
    { field: "Crunchbase_url" },
    { field: "City" },
    { field: "EMAIL" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  useEffect(() => {
    // Use a useEffect to handle theme changes and update color accordingly
    if (theme === "light") {
      setColor("ag-theme-quartz");
    } else if (theme === "dark") {
      setColor("ag-theme-quartz-dark");
    } else if (theme === "violet") {
      setColor("ag-theme-quartz vio");
    } else if (theme == "cyan") setColor("ag-theme-quartz cya");
    else if (theme == "blue") setColor("ag-theme-quartz blu");
    else if (theme == "lime") setColor("ag-theme-quartz lim");
  }, [theme]); // Run this effect whenever the theme changes

  return (
    <div
      className={color + " mt-7 mb-6"}
      style={{ height: 600, fontFamily: "sans-serif" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={500}
        paginationPageSizeSelector={[200, 500, 1000]}
      />
    </div>
  );
};
export default App;
