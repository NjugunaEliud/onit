import React from "react";
import { dataStats } from "@/types/dataStats";

const dataStatsList = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2C11.1 2 9.5 3.6 9.5 5.5C8.6 5.9 8 6.8 8 8C8 9.2 8.7 10 9.5 10H16.5C17.3 10 18 9.2 18 8C18 6.8 17.4 5.9 16.5 5.5C16.5 3.6 14.9 2 13 2ZM6 11C4.3 11 3 12.3 3 14V19C3 21.2 4.8 23 7 23H19C21.2 23 23 21.2 23 19V14C23 12.3 21.7 11 20 11H6Z"
          fill="white"
        />
      </svg>

    ),
    color: "#3FD97F",
    title: "Total Collections",
    value: "345",
    growthRate: 0.43,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="13" cy="13" r="12" fill="#B0BEC5" />
        <path
          d="M13 7v6H8l5 5 5-5h-5V7z"
          fill="white"
        />
      </svg>

    ),
    color: "#FF9C55",
    title: "Total Withdrawals",
    value: "422",
    growthRate: 0.35,
  },

  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="13" cy="13" r="12" fill="#B0BEC5" />
        <path
          d="M13 8c-1.657 0-3 1.343-3 3s1.343 3 3 3c1.657 0 3-1.343 3-3s-1.343-3-3-3z"
          fill="white"
        />
        <path
          d="M14.5 14h-3v-1h3v1zm-3-2h3v-1h-3v1z"
          fill="white"
        />
        <path
          d="M16.5 8h-7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h7c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z"
          fill="white"
        />
      </svg>

    ),
    color: "#18BFFF",
    title: "Total Charges",
    value: "34",
    growthRate: -0.95,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 3H5C3.34 3 2 4.34 2 6v14c0 1.66 1.34 3 3 3h16c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3z"
          fill="#B0BEC5"
        />
        <path
          d="M5 4h16c.55 0 1 .45 1 1v1H4V5c0-.55.45-1 1-1z"
          fill="white"
        />
        <path
          d="M6 10h12v2H6v-2zM6 14h8v2H6v-2z"
          fill="white"
        />
        <path
          d="M12 18c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
          fill="#00C853"
        />
      </svg>

    ),
    color: "#18BFFF",
    title: "Total Wallets",
    value: "34",
    growthRate: -0.95,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1C6.372 1 1 6.372 1 13s5.372 12 12 12 12-5.372 12-12S19.628 1 13 1z"
          fill="#B0BEC5"
        />
        <path
          d="M7 11h12v2H7v-2zm0 4h12v2H7v-2z"
          fill="white"
        />
        <path
          d="M13 17c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
          fill="#00C853"
        />
        <path
          d="M11 9h4v2h-4V9z"
          fill="#00C853"
        />
      </svg>

    ),
    color: "#18BFFF",
    title: "Account Balance",
    value: "34",
    growthRate: -0.95,
  },

];

const DataStatsOne: React.FC<dataStats> = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-sm font-medium">{item.title}</span>
              </div>

              <span
                className={`flex items-center gap-1.5 text-body-sm font-medium ${item.growthRate > 0 ? "text-green" : "text-red"
                  }`}
              >
                {item.growthRate}%
                {item.growthRate > 0 ? (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                      fill=""
                    />
                  </svg>
                ) : (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                      fill=""
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
