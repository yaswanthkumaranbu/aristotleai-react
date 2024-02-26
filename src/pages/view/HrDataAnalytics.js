"use strict";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState, useContext } from "react";
import { themeContext } from "../../component/AdminLayout/AdminLayout";
import data from "./csvjson.json";
import "./table.css";
import { useEffect } from "react";

const App = () => {
  const { theme } = useContext(themeContext);
  const [rowData, setRowData] = useState(
    data
  );

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
          <a
            href={url}
            target="_blank"
         
            style={{ color: "blue" }}
          >
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

  return (
    <div
      className={
        ` ${theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark"}  ` +
        "mt-4 mb-6"
      }
      style={{ height: 600 }}
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
