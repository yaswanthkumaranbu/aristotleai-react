import React, { useState, useEffect, useRef } from "react";
import "./hr.css";
import CSV from "./techstars4.csv";

const HrDataAnalytics = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [popupWidth, setPopupWidth] = useState(400);
  const [popupHeight, setPopupHeight] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(13);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);
  const popupRef = useRef(null); // Ref for the popup

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

  // Function to handle outside click
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    // Add event listener when the popup is shown
    if (showPopup) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    return rows.map((row) => row.split(","));
  };

  const handleCheckboxChange = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleDropdownButtonClick = (rowIndex) => {
    const filteredIndex = csvData.findIndex(
      (row) => row[0] === currentItems[rowIndex][0]
    ); // Find the index of the row in the original data
    setRowData(csvData[filteredIndex]); // Set the rowData to the corresponding row from the original data
    setShowPopup(true); // Show the popup
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  let currentItems = csvData;

  if (searchQuery) {
    currentItems = currentItems.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage + 1;
  const paginatedItems = currentItems.slice(
    indexOfFirstItem - 1,
    indexOfLastItem
  );

  // Pagination Logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const button = {
    padding: "0px 10px",
    fontSize: "8px",
  };

  return (
    <div className="container">
      {/* <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search"
        />
      </div> */}
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
      {error && <p>Error: {error}</p>}
      {csvData.length > 0 && (
        <div className="table-container" ref={tableRef}>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
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
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={doublePrevPage}>&laquo;&laquo;</button>
          <button onClick={prevPage}>&laquo;</button>
          {renderPageNumbers}
          <button onClick={nextPage}>&raquo;</button>
          <button onClick={doubleNextPage}>&raquo;&raquo;</button>
        </div>
      </div>
      {showPopup && (
        <div
          className="popup"
          ref={popupRef}
          style={{ width: ` ${popupWidth}px`, height: `${popupHeight}px` }}
        >
          <div className="popup-content">
            <h3>Details</h3>
            {/* <span className="close" onClick={() => setShowPopup(false)}>
        &times;
      </span> */}
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

export default HrDataAnalytics;
