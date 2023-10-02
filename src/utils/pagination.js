import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ data, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PaginationComponent;
