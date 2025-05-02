"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import {
  fetchFugitiveSubmissions,
  selectFugitiveSubmissionState,
} from "../../../../../store/slices/ipcc/fugitiveSubmission";
import {
  HEADERS,
  tableHeaderStyles,
  tableDataStyles,
  tdStyles,
  thStyles,
} from "./constant";

function FugitiveEmission({ category }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { fugitiveSubmissions } = useAppSelector(selectFugitiveSubmissionState);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getTitle = () => {
    if (category === "fugitive-emissions") {
      return "Fugitive Emissions";
    }
  };

  const title = getTitle();

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(fugitiveSubmissions.length / itemsPerPage) || 1;

  const currentSubmissions = fugitiveSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    dispatch(fetchFugitiveSubmissions());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-[32px] text-[#0b0905] font-bold">{title}</h1>
      <span className="text-xl font-medium text-black pt-6 block">
        Find all previous uploaded files below. You can download each file to
        view the data entered into the platform. Additionally, you can replace a
        file and delete a file currently being used for emissions. Make sure not
        to add the same file multiple times.
      </span>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#0b0905] mb-12 mt-20">
          Submission History
        </h2>
        <button
          className="flex items-center justify-center text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-8 mr-4"
          onClick={() => router.push(`/data/ipcc/${category}/add`)}
        >
          Upload Data
        </button>
      </div>

      <div className="overflow-auto max-h-[400px] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead className="bg-gray-100 border-b-2 border-gray-300 sticky top-0">
            <tr>
              {HEADERS.map((header) => (
                <th key={header.key} className={thStyles}>
                  <span className={tableHeaderStyles}>{header.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentSubmissions && currentSubmissions.length > 0 ? (
              currentSubmissions.map((row, index) => (
                <tr
                  key={row?._id || index}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                  style={{ borderBottom: "1px solid #c4c4c4" }}
                >
                  {HEADERS.map((header) => (
                    <td key={`${row?._id}-${header.key}`} className={tdStyles}>
                      {header.key === "actions" ? (
                        <div className="flex space-x-2">
                          <Icon
                            icon={"mdi:delete-outline"}
                            className="w-6 h-6 object-contain cursor-pointer text-tealCustom"
                            onClick={() => console.log("item id:", row?._id)}
                          />
                          <Icon
                            icon={"tabler:edit"}
                            className="w-6 h-6 object-contain cursor-pointer text-tealCustom"
                            onClick={() => console.log("item id:", row?._id)}
                          />
                        </div>
                      ) : header.format ? (
                        <span className={tableDataStyles}>
                          {header.format(row)}
                        </span>
                      ) : (
                        <span className={tableDataStyles}>
                          {row?.[header.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={HEADERS.length} className="text-center py-4">
                  No {category?.replace("-", " ")} submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2 text-base">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="text-base border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {fugitiveSubmissions && fugitiveSubmissions.length > itemsPerPage && (
          <div className="flex items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded-l disabled:opacity-50 text-base"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded-r disabled:opacity-50 text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FugitiveEmission;
