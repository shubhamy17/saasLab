import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const TablePagination = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
            )
            .then((response) => setProjects(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const totalRows = projects.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = projects.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage Funded</th>
                        <th>Amount Pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index}>
                            <td data-label="S.No.">{startIndex + index + 1}</td>
                            <td data-label="Percentage Funded">{row["percentage.funded"]}</td>
                            <td data-label="Amount Pledged">{row["amt.pledged"]}</td>
                        </tr>
                    ))}
                    {Array.from({ length: rowsPerPage - paginatedData.length }).map((_, index) => (
                        <tr key={`empty-${index}`} className="empty-row">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-container">
                <div className="rows-per-page">
                    <label>Rows per page:</label>
                    <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => handlePageChange(page + 1)}
                            className={currentPage === page + 1 ? "active" : ""}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
                <div className="page-info">
                    Showing {startIndex + 1} - {Math.min(startIndex + rowsPerPage, totalRows)} of {totalRows}
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
