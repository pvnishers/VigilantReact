import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ pageCount, onPageChange }) => {
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setPageRangeDisplayed(2);
      } else {
        setPageRangeDisplayed(5);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <ReactPaginate
          breakLabel={<button className="page-link" type="button">...</button>}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={onPageChange}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          activeClassName={'active'}
        />
      </ul>
    </nav>
  );
};

export default PaginationComponent;
