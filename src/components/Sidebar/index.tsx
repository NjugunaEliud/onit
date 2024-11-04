"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MAIN MENU",
    menuItems: [
      {

        icon: (
          <svg
            className="text- fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5C3 4.44771 3.44772 4 4 4H20C20.5523 4 21 4.44771 21 5V6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6V5Z"
              fill="currentColor"
            />
            <path
              d="M3 11C3 10.4477 3.44772 10 4 10H20C20.5523 10 21 10.4477 21 11V12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12V11Z"
              fill="currentColor"
            />
            <path
              d="M4 16C3.44772 16 3 16.4477 3 17V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V17C21 16.4477 20.5523 16 20 16H4Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Dashboard",
        route: "/",
      },
      {

        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path 
            d="M19 3H5C3.89543 3 3 3.89543 3 5V21H21V5C21 3.89543 20.1046 3 19 3Z"
            fill="currentColor"
          />
          <path 
            d="M7 7H9V9H7V7ZM11 7H13V9H11V7ZM15 7H17V9H15V7Z
               M7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11Z
               M7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z"
            fill="none"
            stroke="white"
            stroke-width="1"
          />
          <path
            d="M10 17H14V21H10V17Z"
            fill="white"
          />
        </svg>


        ),
        label: "Company",
        route: "/company",
      },
      {

        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path 
            d="M12 3L3 7V8H21V7L12 3Z" 
            fill="currentColor"
          />
          <path 
            d="M5 10V17H7V10H5ZM9 10V17H11V10H9ZM13 10V17H15V10H13ZM17 10V17H19V10H17Z" 
            fill="currentColor"
          />
          <path 
            d="M4 19H20C20.5523 19 21 19.4477 21 20V21H3V20C3 19.4477 3.44772 19 4 19Z" 
            fill="currentColor"
          />
        </svg>

        ),
        label: " Bank Account",
        route: "/bankaccounts",
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 7H3C1.89 7 1 7.9 1 9V19C1 20.1 1.89 21 3 21H21C22.1 21 23 20.1 23 19V9C23 7.9 22.1 7 21 7ZM21 19H3V9H21V19ZM14 11H6V13H14V11ZM18 14C17.45 14 17 13.55 17 13C17 12.45 17.45 12 18 12C18.55 12 19 12.45 19 13C19 13.55 18.55 14 18 14ZM4 6V4H20V6H4Z"
              fill="currentColor"
            />
          </svg>

        ),
        label: "Wallets",
        route: "/wallets",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path 
            d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" 
            fill="currentColor"
          />
          <path 
            d="M12 12C9.5 12 7 13.6 7 16V19H17V16C17 13.6 14.5 12 12 12Z" 
            fill="currentColor"
          />
          
          <path 
            d="M6.5 10C7.88071 10 9 8.88071 9 7.5C9 6.11929 7.88071 5 6.5 5C5.11929 5 4 6.11929 4 7.5C4 8.88071 5.11929 10 6.5 10Z" 
            fill="currentColor"
            opacity="0.5"
          />
          <path 
            d="M3 16.5C3 14.7 4.8 13.3 7 13V14.5C7 15.2 7.1 15.8 7.3 16.4C7.6 17.1 7.9 17.6 8.3 18H2V16.5H3Z" 
            fill="currentColor"
            opacity="0.5"
          />
          
          <path 
            d="M17.5 10C18.8807 10 20 8.88071 20 7.5C20 6.11929 18.8807 5 17.5 5C16.1193 5 15 6.11929 15 7.5C15 8.88071 16.1193 10 17.5 10Z" 
            fill="currentColor"
            opacity="0.5"
          />
          <path 
            d="M21 16.5C21 14.7 19.2 13.3 17 13V14.5C17 15.2 16.9 15.8 16.7 16.4C16.4 17.1 16.1 17.6 15.7 18H22V16.5H21Z" 
            fill="currentColor"
            opacity="0.5"
          />
        </svg>

        ),
        label: "Users",
        route: "/users",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path 
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM11 7.5V8H10V9H11V15H10V16H11V16.5H13V16H14V15H13V9H14V8H13V7.5H11ZM12 10C12.5523 10 13 10.4477 13 11V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V11C11 10.4477 11.4477 10 12 10Z"
            fill="currentColor"
          />
          
          <path 
            d="M7 6L4 3L1 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(16, 3)"
          />
          
          <path 
            d="M7 0L4 3L1 0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(16, 18)"
          />
        </svg>

        ),
        label: "Transactions",
        route: "/transactions",
      },

      {
        icon: (
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9453 1.25C13.5778 1.24998 12.4754 1.24996 11.6085 1.36652C10.7084 1.48754 9.95048 1.74643 9.34857 2.34835C8.82363 2.87328 8.55839 3.51836 8.41916 4.27635C8.28387 5.01291 8.25799 5.9143 8.25196 6.99583C8.24966 7.41003 8.58357 7.74768 8.99778 7.74999C9.41199 7.7523 9.74964 7.41838 9.75194 7.00418C9.75803 5.91068 9.78643 5.1356 9.89448 4.54735C9.99859 3.98054 10.1658 3.65246 10.4092 3.40901C10.686 3.13225 11.0746 2.9518 11.8083 2.85315C12.5637 2.75159 13.5648 2.75 15.0002 2.75H16.0002C17.4356 2.75 18.4367 2.75159 19.1921 2.85315C19.9259 2.9518 20.3144 3.13225 20.5912 3.40901C20.868 3.68577 21.0484 4.07435 21.1471 4.80812C21.2486 5.56347 21.2502 6.56459 21.2502 8V16C21.2502 17.4354 21.2486 18.4365 21.1471 19.1919C21.0484 19.9257 20.868 20.3142 20.5912 20.591C20.3144 20.8678 19.9259 21.0482 19.1921 21.1469C18.4367 21.2484 17.4356 21.25 16.0002 21.25H15.0002C13.5648 21.25 12.5637 21.2484 11.8083 21.1469C11.0746 21.0482 10.686 20.8678 10.4092 20.591C10.1658 20.3475 9.99859 20.0195 9.89448 19.4527C9.78643 18.8644 9.75803 18.0893 9.75194 16.9958C9.74964 16.5816 9.41199 16.2477 8.99778 16.25C8.58357 16.2523 8.24966 16.59 8.25196 17.0042C8.25799 18.0857 8.28387 18.9871 8.41916 19.7236C8.55839 20.4816 8.82363 21.1267 9.34857 21.6517C9.95048 22.2536 10.7084 22.5125 11.6085 22.6335C12.4754 22.75 13.5778 22.75 14.9453 22.75H16.0551C17.4227 22.75 18.525 22.75 19.392 22.6335C20.2921 22.5125 21.0499 22.2536 21.6519 21.6517C22.2538 21.0497 22.5127 20.2919 22.6337 19.3918C22.7503 18.5248 22.7502 17.4225 22.7502 16.0549V7.94513C22.7502 6.57754 22.7503 5.47522 22.6337 4.60825C22.5127 3.70814 22.2538 2.95027 21.6519 2.34835C21.0499 1.74643 20.2921 1.48754 19.392 1.36652C18.525 1.24996 17.4227 1.24998 16.0551 1.25H14.9453Z"
              fill=""
            />
            <path
              d="M2.00098 11.249C1.58676 11.249 1.25098 11.5848 1.25098 11.999C1.25098 12.4132 1.58676 12.749 2.00098 12.749L13.9735 12.749L12.0129 14.4296C11.6984 14.6991 11.662 15.1726 11.9315 15.4871C12.2011 15.8016 12.6746 15.838 12.9891 15.5685L16.4891 12.5685C16.6553 12.426 16.751 12.218 16.751 11.999C16.751 11.7801 16.6553 11.5721 16.4891 11.4296L12.9891 8.42958C12.6746 8.16002 12.2011 8.19644 11.9315 8.51093C11.662 8.82543 11.6984 9.2989 12.0129 9.56847L13.9735 11.249L2.00098 11.249Z"
              fill=""
            />
          </svg>
        ),
        label: "Logout",
        route: "#",
      },

    ],
  },

];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between  px-6 py-24 lg:py-0 xl:py-0">
          <Link href="/">
            <Image
              width={150}
              height={32}
              src={"/images/logo/onit.svg"}
              alt="Logo"
              priority
              className="dark:hidden mb-8"
            />
            <Image
              width={150}
              height={32}
              src={"/images/logo/onit.svg"}
              alt="Logo"
              priority
              className="hidden dark:block"

            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className=" px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
