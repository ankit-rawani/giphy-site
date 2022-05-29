import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if(!paginationRange || totalCount < 1) return null;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="page-container">
      <li className={currentPage === 1 ? "disabled" : ""} onClick={onPrevious}
      >
        Prev
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={Math.random()}>&#8230;</li>;
        }

        return (
          <li className={currentPage === pageNumber ? "active disabled":""} key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li className={currentPage === lastPage ? "disabled" : ""} onClick={onNext}>
        Next
      </li>
    </ul>
  );
};

export default Pagination;
