// Importing necessary dependencies and styles
import React, { useState, useEffect, useRef } from "react";
import "./hr.css";
import CSV from "./techstars4.csv";

// Main component function
const HrDataAnalytics = () => {
  // State variables
  const [csvData, setCsvData] = useState([]); // To store CSV data
  const [error, setError] = useState(null); // To handle errors
  const [selectedRows, setSelectedRows] = useState([]); // To track selected rows
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility
  const [rowData, setRowData] = useState([]); // To store data for the selected row
  const [popupWidth, setPopupWidth] = useState(400); // Width of the popup
  const [popupHeight, setPopupHeight] = useState(200); // Height of the popup
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage, setItemsPerPage] = useState(13); // Items to display per page
  const [searchQuery, setSearchQuery] = useState(""); // Search input value

  // Refs for DOM elements
  const tableRef = useRef(null); // Ref for the table
  const popupRef = useRef(null); // Ref for the popup

  // Fetch CSV data on component mount
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

  // Calculate and update popup dimensions on row data change or window resize
  useEffect(() => {
    const calculatePopupDimensions = () => {
      const maxPopupWidth = 400;
      const maxPopupHeight = 300;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      const width = Math.min(maxPopupWidth, maxWidth);
      const height = Math.min(maxPopupHeight, maxHeight);

      setPopupWidth(width);
      setPopupHeight(height);
    };

    calculatePopupDimensions();

    window.addEventListener("resize", calculatePopupDimensions);

    return () => {
      window.removeEventListener("resize", calculatePopupDimensions);
    };
  }, [rowData]);

  // Function to handle outside click to close the popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    // Add or remove event listener based on popup visibility
    if (showPopup) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Function to parse CSV data into an array
  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    return rows.map((row) => row.split(","));
  };

  // Function to handle checkbox change for row selection
  const handleCheckboxChange = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  // Function to handle dropdown button click for displaying popup
  const handleDropdownButtonClick = (rowIndex) => {
    const filteredIndex = csvData.findIndex(
      (row) => row[0] === currentItems[rowIndex][0]
    );
    setRowData(csvData[filteredIndex]);
    setShowPopup(true);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Logic for pagination
  let currentItems = csvData.slice(1);

  if (searchQuery) {
    currentItems = currentItems.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage + 1;
  var paginatedItems = currentItems.slice(
    indexOfFirstItem - 1,
    indexOfLastItem
  );

  // Pagination Logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Render pagination buttons
  const renderPageNumbers = pageNumbers
    .filter(
      (number) =>
        number === 1 ||
        number === currentPage ||
        number === currentPage - 1 ||
        number === currentPage + 1 ||
        number === currentPage + 2
    )
    .map((number) => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={number === currentPage ? "active" : ""}
      >
        {number}
      </button>
    ));

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Functions to navigate to the next and previous pages
  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(currentItems.length / itemsPerPage))
    );
  };

  const doubleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 2, Math.ceil(currentItems.length / itemsPerPage))
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const doublePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 2, 1));
  };

  // Styling for a button
  const button = {
    padding: "0px 10px",
    fontSize: "8px",
  };

  // JSX for the component
  return (
    <div className="container">
      {/* Search input */}
      <div className="wrapper">
        <div className="search-icon">
          <input
            className="search-circle"
            type="text"
            placeholder=" 🔍"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}
      {/* Display the table if CSV data is available */}
      {csvData.length > 0 && (
        <div className="table-container" ref={tableRef}>
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Select</th>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {paginatedItems.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    selectedRows.includes(rowIndex + indexOfFirstItem - 1)
                      ? "selected"
                      : `${rowIndex % 2 == 0 ? "even-row" : "odd-row"}`
                  }
                >
                  {/* Row actions - dropdown button and checkbox */}
                  <td>
                    <button
                      style={button}
                      onClick={() =>
                        handleDropdownButtonClick(
                          rowIndex + indexOfFirstItem - 1
                        )
                      }
                    >
                      🔻
                    </button>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(rowIndex + indexOfFirstItem - 1)
                      }
                      checked={selectedRows.includes(
                        rowIndex + indexOfFirstItem - 1
                      )}
                    />
                  </td>
                  {/* Display each cell in the row */}
                  {row.map((cell, cellIndex) => (
                    <td
                      className={rowIndex % 2 == 0 ? "even-row" : "odd-row"}
                      key={cellIndex}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination controls */}
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={doublePrevPage}>&laquo;&laquo;</button>
          <button onClick={prevPage}>&laquo;</button>
          {renderPageNumbers}
          <button onClick={nextPage}>&raquo;</button>
          <button onClick={doubleNextPage}>&raquo;&raquo;</button>
        </div>
      </div>
      {/* Display the popup if showPopup state is true */}
      {showPopup && (
        <div
          className="popup"
          ref={popupRef}
          style={{ width: ` ${popupWidth}px`, height: `${popupHeight}px` }}
        >
          <div className="popup-content">
            <h3>Details</h3>
            {/* Display details of the selected row */}
            <div className="popup-body">
              <ul>
                {rowData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the component
export default HrDataAnalytics;
