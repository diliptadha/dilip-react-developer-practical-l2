import React, { FC } from "react";

interface PaginationProps {
  length: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const Pagination: FC<PaginationProps> = ({
  length,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({
        length: Math.ceil(length / itemsPerPage),
      }).map((_, index) => (
        <button
          key={index}
          className={`p-2 mx-1 ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
