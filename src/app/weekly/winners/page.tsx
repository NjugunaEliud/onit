"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import TableOne from "../../../components/Tables/TableOne";
import { useState } from "react";


const CalendarPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const handleSubbmit = async (e: any) => {
    e.preventDefault();
  
  }
  return (
    <DefaultLayout>
  <DataStatsOne />

<div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
  <TableOne/>
</div>
    </DefaultLayout>
  );
};

export default CalendarPage;
