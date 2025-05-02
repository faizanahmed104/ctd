"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { menuItems } from "./constant";
import "./index.css";
import { useAuth } from "../../Context";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../store/slices/auth";
import Alert from "../../Components/alert";
import DateTime from "./DateTime";

const activeTextStyles = "text-tealCustom font-semibold text-lg";
const inActiveTextStyles = "text-darkGreenCustom  font-medium text-lg";

const HomeLayout = ({ children, headerTitle }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { activeItem, setActiveItem, activeHeader, setActiveHeader } =
    useAuth();
  const [alertOpen, setAlertOpen] = useState(false);

  const handleNavigation = (item) => {
    if (!item.isAdmin) {
      setAlertOpen(true);
      return;
    }

    if (item.title === "Log Out") {
      dispatch(logout());
      router.push("/signin");
      return;
    }

    router.push(item.path);
    setActiveItem(item.title);
    setActiveHeader(1);
  };

  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div className="flex-col">
        {item.title === "Manage Roles" && (
          <div>
            <hr className="border-t border-gray-300 my-2 bg-mintGreen" />
          </div>
        )}
        {!hasChildren ? (
          <div
            className={`flex items-center py-3 px-4 ${
              item.title === activeItem
                ? "bg-mintGreen font-semibold"
                : "bg-transparent"
            }  hover:bg-mintGreen cursor-pointer`}
            onClick={() => item.title !== activeItem && handleNavigation(item)}
          >
            <span className="mr-[10px]">
              <img src={item.icon} className="w-5 h-5 object-contain" />
            </span>
            <span
              className={
                activeItem === item.title
                  ? activeTextStyles
                  : inActiveTextStyles
              }
            >
              {item.title}
            </span>
          </div>
        ) : (
          <DataChildren
            heading={item.title}
            data={item.children}
            icon={item.icon}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen relative" style={{ scrollbarWidth: 0 }}>
        <aside className="w-[328px] fixed h-full bg-[#F6F6F6] overflow-y-auto text-white slidebar z-50">
          <div
            className="h-full overflow-y-scroll scrollbar-hide flex flex-col"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="p-4 text-center font-bold text-xl mb-[30px] mt-2">
              <img
                src="/carbon-track-logo.png"
                className="w-60 h-8 object-contain"
              />
            </div>

            {/* <div className="px-4 mb-10">
              <DateTime />
            </div> */}

            <div className="px-4 mb-[14px]">
              <select
                disabled
                className="w-full rounded px-[10px] py-[7px] bg-tealCustom border border-tealCustom text-white"
                defaultValue="option1"
              >
                <option value="option1">Dropdown Option 1</option>
                <option value="option2">Dropdown Option 2</option>
              </select>
            </div>
            <div className="px-4 mb-[52px]">
              <button className="w-full px-[10px] py-[7px] bg-tealCustom hover:bg-tealCustom rounded text-left">
                📅 Open Calendar
              </button>
            </div>
            {/* <Sidebar/> */}
            <nav className="flex-1">
              <div>
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {renderMenuItem(item)}
                  </React.Fragment>
                ))}
              </div>
            </nav>
          </div>
        </aside>
        <div
          className="flex-1 flex flex-col bg-white relative z-0"
          style={{ width: `calc(100vw - 328px)` }}
        >
          {activeHeader === 1 ? (
            <header className="ml-[328px] p-4 bg-white flex items-center justify-between border-b border-gray-300">
              <h1 className="text-[32px] text-[#0b0905] font-bold">
                {/* {headerTitle} */}
              </h1>
              <div className="flex items-center">
                <button className="text-center items-center justify-center flex text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-[34px] mr-4">
                  Add a co-worker
                </button>
                <button
                  className="text-center items-center justify-center flex bg-transparent border text-sm font-semibold border-tealCustom text-tealCustom rounded-md w-[210px] h-[34px] mr-4"
                  onClick={() => {
                    setActiveItem("Learn");
                    router.push("/learn");
                    setActiveHeader(1);
                  }}
                >
                  Carbon Track Academy
                </button>
                <button
                  className="text-center items-center justify-center flex bg-transparent border text-sm font-semibold border-tealCustom text-tealCustom rounded-md w-36 h-[34px] mr-[26px]"
                  onClick={() => {
                    setActiveItem("Analytics");
                    router.push("/analytics-overview");
                  }}
                >
                  Carbon Report
                </button>
                <div className="h-8 w-[1px] bg-gray-400"></div>
                <div className="flex items-center ml-[26px]">
                  <img
                    src="/mekaeel photo.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-[10px]"
                  />
                  <div>
                    <p className="font-semibold text-[15px] text-[#0b0905]">
                      Mekaeel Malik
                    </p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
              </div>
            </header>
          ) : (
            <header className="ml-[328px] p-4 bg-white flex items-center justify-between border-b border-gray-300">
              <h1 className="text-[32px] text-[#0b0905] font-bold">
                {/* {"My Climate Journey"} */}
              </h1>
              <div className="flex items-center">
                <button className="text-center items-center justify-center flex text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-[34px] mr-4">
                  Add a co-worker
                </button>
                <button
                  className="text-center items-center justify-center flex bg-transparent border text-sm font-semibold border-tealCustom text-tealCustom rounded-md w-[210px] h-[34px] mr-4"
                  onClick={() => {
                    setActiveItem("Learn");
                    router.push("/learn");
                    setActiveHeader(1);
                  }}
                >
                  Carbon Track Academy
                </button>
                <button
                  className="text-center items-center justify-center flex bg-transparent border text-sm font-semibold border-tealCustom text-tealCustom rounded-md w-36 h-[34px] mr-[26px]"
                  onClick={() => {
                    setActiveItem("Analytics");
                    router.push("/analytics-overview");
                  }}
                >
                  Carbon Report
                </button>
                <div className="h-8 w-[1px] bg-gray-400"></div>
                <div className="flex items-center ml-[26px]">
                  <img
                    src="/mekaeel photo.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-[10px]"
                  />
                  <div>
                    <p className="font-semibold text-[15px] text-[#0b0905]">
                      Mekaeel Malik
                    </p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
              </div>
            </header>
          )}
          <main
            className="ml-[328px] flex-1 bg-white p-4"
            style={{ scrollbarWidth: "none" }}
          >
            <div>{children}</div>
          </main>{" "}
        </div>
      </div>
      <Alert
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        message="You don't have permission to access this feature. Please contact your administrator."
      />
    </>
  );
};

const DataChildren = ({ heading, data, icon, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { activeItem, setActiveItem, setActiveHeader } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);

  const handleExpandClick = (event, isAdmin) => {
    if (!isAdmin) {
      setAlertOpen(true);
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (!item.isAdmin) {
      setAlertOpen(true);
      return;
    }

    if (item.path !== "#") {
      setActiveItem(item.title);
      router.push(item.path);
      setActiveHeader(2);
    }
  };

  return (
    <>
      <div className="flex flex-col relative">
        <div
          className={`flex items-center py-3 px-4 ${
            isOpen ? "bg-mintGreen" : "bg-transparent"
          } cursor-pointer`}
          onClick={(e) => handleExpandClick(e, data[0]?.isAdmin)}
        >
          <span className="mr-[10px]">
            <img src={icon} className="w-5 h-5 object-contain" />
          </span>
          <span
            className={`${isOpen ? activeTextStyles : inActiveTextStyles} ${
              heading === activeItem ? "font-semibold" : ""
            }`}
          >
            {heading}
          </span>
          <div className="ml-auto">
            {!isOpen ? (
              <SlArrowDown color="#000000" />
            ) : (
              <SlArrowUp color="#000000" />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="bg-[#E8F3F1] relative z-50">
            {data.map((item, index) => (
              <div key={index} className="pl-[10px]">
                {item.children ? (
                  <DataChildren
                    heading={item.title}
                    data={item.children}
                    icon={item.icon || icon}
                    level={level + 1}
                  />
                ) : level === 0 ? (
                  <div
                    className={`flex items-center p-4 cursor-pointer`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span
                      className={`text-lg ${
                        item.title === activeItem
                          ? "text-tealCustom font-semibold"
                          : "text-darkGreenCustom font-medium"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <li
                    className={`py-2 pl-12 cursor-pointer list-disc ml-4 ${
                      item.title === activeItem
                        ? "font-semibold text-tealCustom"
                        : "text-darkGreenCustom"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.title}
                  </li>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="z-[999999]">
        <Alert
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          message="You don't have permission to access this feature. Please contact your administrator."
        />
      </div>
    </>
  );
};

export default HomeLayout;
