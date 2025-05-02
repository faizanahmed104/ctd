"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSort } from "react-icons/fa";
import { RiFileEditFill, RiDeleteBinFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getAllUsers,
  selectAuthState,
  deleteUser,
} from "../../../store/slices/auth";

const UsersTable = () => {
  const router = useRouter();
  const { allUsers } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        await dispatch(deleteUser(userId));
        dispatch(getAllUsers({ page: 1, limit: 10, sortOrder: "desc" }));
        alert("User deleted successfully!");
      } catch (error) {
        alert("Failed to delete user: " + error.message);
      }
    }
  };

  const handleEdit = (userId) => {
    router.push(`/users/edit/${userId}`);
  };

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10, sortOrder: "desc" }));
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mt-4">
        <span className="font-semibold text-2xl text-[#1D1D1D]">All Users</span>
        <p className="mt-2 text-tealCustom">
          View all created users that are available in the Carbon Track
          Dashboard.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-16">
        <div className="flex justify-end items-end">
          <button
            className="text-center items-center justify-center flex text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-[34px]"
            onClick={() => {
              router.push("/users/add");
            }}
          >
            Add New User
          </button>
        </div>
        <div className="">
          <span className="font-semibold text-xl">Search</span>
          <form className="mt-2">
            <div className="relative">
              <input
                type="text"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-md"
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
      </div>

      {/* Table for Users */}
      <div className="w-full mt-4">
        <h2 className="text-lg font-semibold mb-4">Records</h2>
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border border-gray">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Account Name
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Email
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Contact Number
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Role
                    </span>
                    <FaSort />
                  </div>
                </th>
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins font-normal text-[#2A2A3C99]">
                      Status
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
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {user.roleData.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 font-normal text-[#2A2A3C99]">
                      {user.status}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(user._id)}
                        >
                          <RiFileEditFill />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(user._id)}
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
                  <td
                    colSpan="6"
                    className="py-3 px-4 font-normal text-center text-[#2A2A3C99]"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
