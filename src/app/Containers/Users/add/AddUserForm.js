"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getRole,
  signup,
  selectAuthState,
} from "../../../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import toast from "react-hot-toast";
const AddUserForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allRole } = useAppSelector(selectAuthState);
  const [isSelectOpen, setIsSelectOpen] = useState({
    roleDropDown: false,
    statusDropDown: false,
  });
  const [selectedRole, setSelectedRole] = useState("--Select Role--");
  const [selectedStatus, setSelectedStatus] = useState("--Select Status--");
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    userrole: null,
    status: "ACTIVE",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...UserData,
      [name]: value,
    });
  };

  const submitButton = async () => {
    const result = await dispatch(signup(UserData));
    if (result?.meta?.requestStatus === "fulfilled") {
      toast.success(result.payload?.message);
      router.push("/users");
    } else if (result?.meta?.requestStatus === "rejected") {
      toast.error(result.payload.message);
    }
  };

  useEffect(() => {
    dispatch(
      getRole({ page: 1, limit: 10, sortOrder: "desc", filtered: false })
    );
  }, []);

  useEffect(() => {
    setUserData({
      ...UserData,
      userrole: allRole,
    });
  }, [allRole]);

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="mt-4">
        <span className="font-semibold text-2xl text-[#1D1D1D]">Add User</span>
      </div>

      {/* Form */}

      <div className="mt-4">
        <div className="w-full">
          <div className="grid grid-cols-6 gap-2 space-y-6">
            <div className="col-span-6 space-y-2">
              <label className="text-md font-medium">
                Name<span className="text-red-500">*</span>{" "}
              </label>
              <div>
                <input
                  type="text"
                  name="name"
                  value={UserData.name}
                  placeholder="Name"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <label className="text-md font-medium">
                Email<span className="text-red-500">*</span>{" "}
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={UserData.email}
                  placeholder="Email"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <label className="text-md font-medium">
                Phone<span className="text-red-500">*</span>{" "}
              </label>
              <div>
                <input
                  type="phone"
                  name="phone"
                  value={UserData.phone}
                  placeholder="Phone Number"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>

            <div className="col-span-3 space-y-2">
              <label className="text-sm font-medium">Role Name</label>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsSelectOpen({
                      ...isSelectOpen,
                      roleDropDown: !isSelectOpen.roleDropDown,
                    })
                  }
                  className="w-full px-4 py-2 text-left border rounded-md bg-white flex justify-between items-center"
                >
                  {selectedRole}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isSelectOpen.roleDropDown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isSelectOpen.roleDropDown && (
                  <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                    {UserData?.userrole?.map((role) => {
                      return (
                        <button
                          key={role._id}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50"
                          onClick={() => {
                            setSelectedRole(role.role);
                            setUserData({
                              ...UserData,
                              userrole: role, // Set single role object instead of array
                            });
                            setIsSelectOpen({
                              ...isSelectOpen,
                              roleDropDown: false,
                            });
                          }}
                        >
                          {role.name}
                        </button>
                        // <button
                        //   key={role._id}
                        //   className="w-full px-4 py-2 text-left hover:bg-gray-50"
                        //   onClick={() => {
                        //     setSelectedRole(role.role);
                        //     setIsSelectOpen({
                        //       ...isSelectOpen,
                        //       roleDropDown: false,
                        //     });
                        //   }}
                        // >
                        //   {role.name}
                        // </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsSelectOpen({
                      ...isSelectOpen,
                      statusDropDown: !isSelectOpen.statusDropDown,
                    })
                  }
                  className="w-full px-4 py-2 text-left border rounded-md bg-white flex justify-between items-center"
                >
                  {selectedStatus}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isSelectOpen.statusDropDown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isSelectOpen.statusDropDown && (
                  <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                    {["ACTIVE", "INACTIVE"].map((status) => {
                      return (
                        <button
                          key={status}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50"
                          onClick={() => {
                            setSelectedStatus(status);
                            setIsSelectOpen({
                              ...isSelectOpen,
                              statusDropDown: false,
                            });
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-3 space-y-2">
              <label className="text-md font-medium">
                Password<span className="text-red-500">*</span>{" "}
              </label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={UserData.password}
                  placeholder="Password"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <label className="text-md font-medium">
                Confirm Password<span className="text-red-500">*</span>{" "}
              </label>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={UserData.confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            {UserData.password === UserData.confirmPassword &&
            UserData.password !== "" &&
            UserData.confirmPassword !== "" ? (
              <div className="col-span-6">
                <span className="text-tealCustom">Password Match</span>
              </div>
            ) : (
              <div className="col-span-6">
                <span className="text-red-500">Password is not Match</span>
              </div>
            )}
            <div className="col-span-6 h-[40px] flex items-end justify-end w-full">
              <button
                className="bg-tealCustom text-white shadow-md border rounded-full p-2 w-full"
                onClick={() => {
                  submitButton();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
