"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


const CalendarPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [drawName, setDrawName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [tickerPrices, setTickerPrice] = useState<any>('');
  const [drawType, setDrawType] = useState<string>('');


  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create the data object
    const tickerPrice = parseInt(tickerPrices);
    const data = {
      drawName,
      startDate,
      endDate,
      tickerPrice,
      drawType,
    };

    if (!data.drawName) {
      Swal.fire({
        icon: 'info',
        iconColor: '#53b94c',
        text: `Draw name is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
      return;
    }
    if (!data.tickerPrice) {
      Swal.fire({
        icon: 'info',
        iconColor: '#53b94c',
        text: `Draw ticket price is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
      return;
    }

    if (!data.drawType) {
      Swal.fire({
        icon: 'info',
        iconColor: '#53b94c',
        text: `Draw type is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
      return;
    }

    if (!data.startDate) {
      Swal.fire({
        icon: 'info',
        iconColor: '#53b94c',
        text: `Start date is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
      return;
    }

    if (!data.endDate) {
      Swal.fire({
        icon: 'info',
        iconColor: '#53b94c',
        text: `End date is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
      return;
    }
    try {
    const  response  =  await axios.post(`https://us-central1-go-green-436010.cloudfunctions.net/create_draw`,{
      drawName,drawType,endDate,startDate,tickerPrice
    });
    console.log(response.data)
    if(response.data.status == 200){
      Swal.fire({
        icon: 'success',
        iconColor: '#53b94c',
        text: `Draw created successfully `,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        text: `Failed to create draw, retry!`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "red",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `please check our internet `,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "red",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `
      });
    }

  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="New Draw" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col">
            {/* <!-- Contact Form --> */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Add New Draw
                </h3>
              </div>
              <form>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Draw Name
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      value={drawName}
                      onChange={(e) => setDrawName(e.target.value)}
                      placeholder="Enter draw name"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"

                    />
                  </div>

                  {/* Draw Ticket Price Input */}
                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Draw Ticket Price
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      value={tickerPrices}
                      onChange={(e) => setTickerPrice(e.target.value)}
                      placeholder="Enter draw ticket price"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"

                    />
                  </div>

                  {/* Draw Type Select */}
                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm text-dark dark:text-white">
                      Draw Type
                      <span className="text-red">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-dark-2">
                      <select
                        value={drawType}
                        onChange={(e) => {
                          setDrawType(e.target.value);
                          changeTextColor();
                        }}
                        className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-btnColor active:border-btnColor dark:border-dark-3 dark:bg-dark-2 dark:focus:border-btnColor ${isOptionSelected ? "text-dark dark:text-white" : ""}`}

                      >
                        <option value="" disabled className="text-dark-6">
                          Select draw type
                        </option>
                        <option value="daily" className="text-dark-6">
                          Daily Draw
                        </option>
                        <option value="weekly" className="text-dark-6">
                          Weekly Draw
                        </option>
                        <option value="grand" className="text-dark-6">
                          Grand Draw
                        </option>
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
                            fill=""
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Draw Start Date Input */}
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Draw Start Date
                        <span className="text-red">*</span>
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Enter your first name"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"

                      />
                    </div>

                    {/* Draw End Date Input */}
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Draw End Date
                        <span className="text-red">*</span>
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Enter your last name"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"

                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="flex w-full justify-center rounded-[7px] bg-btnColor mt-6 p-[13px] font-medium text-white hover:bg-opacity-90"
                  >
                    Create Draw
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
