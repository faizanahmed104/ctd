"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSort } from "react-icons/fa";
import { RiFileEditFill, RiDeleteBinFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  deleteRole,
  getRole,
  selectAuthState,
} from "../../../store/slices/auth";

const RolesTable = () => {
  const router = useRouter();
  const { allRole } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const handleDeleteRole = async (roleId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (isConfirmed) {
      try {
        await dispatch(deleteRole(roleId));
        // Refresh the roles list after deletion
        dispatch(getRole({ page: 1, limit: 10, sortOrder: "desc" }));
        alert("Role deleted successfully!");
      } catch (error) {
        alert("Failed to delete role: " + error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getRole({ page: 1, limit: 10, sortOrder: "desc" }));
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mt-4">
        <span className="font-semibold text-2xl text-[#1D1D1D]">All Roles</span>
        <p className="mt-2 text-tealCustom">
          View all created roles that are available for new or existing users to
          be assigned in the Carbon Track Dashboard.
        </p>
      </div>

      {/* Search Bar */}
      <div className="grid grid-cols-12 mt-16">
        <div className="col-span-10 lg:col-8">
          <span className="font-semibold text-xl">Search</span>
          <form className="max-w-md mt-2">
            <div className="relative">
              <input
                type="text"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-full"
                placeholder="Search..."
                autoComplete="off"
                required
              />
              <div className="absolute inset-y-0 end-0 flex items-center px-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-2 lg:col-4">
          <button
            className="text-center items-center justify-center flex text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-[34px]"
            onClick={() => {
              window.location = "/roles/add";
            }}
          >
            Add New Role
          </button>
        </div>
      </div>

      {/* Table for Roles */}
      <div className="w-full mt-4">
        <h2 className="text-lg font-semibold mb-4">Records</h2>
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border border-gray">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Role Name
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Description
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Actions
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {allRole.length > 0 ? (
                allRole.map((role) => (
                  <tr key={role._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {role.name}
                    </td>
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {role.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => router.push(`/roles/edit/${role._id}`)}
                        >
                          <RiFileEditFill />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteRole(role._id)}
                        >
                          <RiDeleteBinFill />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[200px]">
                  <td></td>
                  <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                    No Role Found
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesTable;
