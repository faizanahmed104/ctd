// components/Sidebar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuItems } from "./constant";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const SidebarItem = ({ item, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isParent = item.path === "#" && hasChildren;

  return (
    <div className={`ml-${depth * 2} w-full`}>
      <div
        className={`flex items-center justify-between text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer ${
          open ? "bg-green-100 text-green-700" : ""
        }`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {item.icon && (
            <Image src={item.icon} alt={item.title} width={16} height={16} />
          )}
          {item.path !== "#" ? (
            <Link href={item.path} className="truncate">
              {item.title}
            </Link>
          ) : (
            <span className="truncate font-medium">{item.title}</span>
          )}
        </div>
        {hasChildren && (
          <span className="text-xs">
            {open ? <SlArrowDown /> : <SlArrowUp />}
          </span>
        )}
      </div>

      {open && hasChildren && (
        <div className="ml-2 border-l border-gray-200 pl-3">
          {item.children.map((child, idx) => (
            <SidebarItem key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

function Sidebar() {
  return (
    <aside className="border-r text-sm p-3 space-y-2 overflow-y-auto">
      {menuItems.map((item, idx) => (
        <SidebarItem key={idx} item={item} />
      ))}
    </aside>
  );
}
export default Sidebar;
