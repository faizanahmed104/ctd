"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../../hooks";
import { addRole } from "../../../../store/slices/auth";

const AddRoleForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [RoleData, setRoleData] = useState({
    name: "",
    description: "",
    permissions: [
      {
        id: "view-entries",
        name: "View previous data entries made on the platform",
        enabled: false,
      },
      {
        id: "create-entries",
        name: "Create new data entries on the platform",
        enabled: false,
      },
      {
        id: "view-analytics",
        name: "View analytics overview and categories",
        enabled: false,
      },
      {
        id: "export-report",
        name: "Export analytics and carbon report",
        enabled: false,
      },
    ],
  });

  const togglePermission = (id) => {
    setRoleData({
      ...RoleData,
      permissions: RoleData.permissions.map((permission) =>
        permission.id === id
          ? { ...permission, enabled: !permission.enabled }
          : permission
      ),
    });
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setRoleData({
      ...RoleData,
      [name]: value,
    });
  };

  const submitButton = async () => {
    const result = await dispatch(addRole(RoleData));
    if (result?.meta?.requestStatus === "fulfilled") {
      toast.success(result.payload?.message);
      router.push("/roles");
    } else if (result?.meta?.requestStatus === "rejected") {
      toast.error(result.payload.message);
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="mt-4">
        <span className="font-semibold text-2xl text-[#1D1D1D]">Add Roles</span>
        <p className="mt-2 text-tealCustom">
          Create new categories of roles that different users across the
          platform can be assigned to. Each role comes with unique access
          abilities and permission to view different areas of the Carbon Track
          dashboard.
        </p>
      </div>

      {/* Form */}

      <div className="mt-4">
        <div className="w-full">
          <div className="space-y-6">
            <div className="space-y-2 w-[100%] xl:w-[50%]">
              <label className="text-md font-medium">Role Name</label>
              <div>
                <input
                  type="text"
                  name="name"
                  value={RoleData.name}
                  placeholder="Name"
                  className="w-full border rounded-md px-4 py-2"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-2">
              <div className="w-[100%] lg:w-[65%]">
                <div>
                  <h3 className="text-md font-medium mb-4">Access</h3>
                </div>

                <div className="space-y-4 border rounded-md shadow-md p-8">
                  {RoleData.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="grid grid-cols-12 items-center"
                    >
                      <div className="col-span-8 text-md text-tealCustom">
                        {permission.name}
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className={`w-[90px] h-[40px] ${
                              permission.enabled
                                ? "bg-tealCustom text-white shadow-md border rounded-full"
                                : ""
                            }`}
                            onClick={() => togglePermission(permission.id)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`w-[90px] h-[40px] ${
                              !permission.enabled
                                ? "bg-tealCustom text-white shadow-md border rounded-full"
                                : ""
                            }`}
                            onClick={() => togglePermission(permission.id)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 xl:mt-0 w-[100%] lg:w-[35%]">
                <div>
                  <h3 className="text-md font-medium mb-4">Description</h3>
                </div>
                <div className="">
                  <textarea
                    name="description"
                    value={RoleData.description}
                    onChange={(e) => onChangeHandler(e)}
                    rows={10}
                    className="w-[100%] border rounded-md shadow-md p-4"
                    id=""
                    placeholder="Write Description for Role..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="h-[40px] flex items-end justify-end w-full">
              <button
                className="bg-tealCustom text-white shadow-md border rounded-full p-2 w-24"
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

export default AddRoleForm;
