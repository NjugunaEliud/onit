"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [year, setYear] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("AdminData");

    if (!userData) {
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setLoading(false); // Disable the loader when authentication is successful
    }

    const year = new Date().getFullYear().toString();
    if (year) {
      setYear(year);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Loader Spinner */}
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="ml-6 flex space-x-1">
          <span className="inline-block animate-wave">P</span>
          <span className="inline-block animate-wave delay-[100ms]">l</span>
          <span className="inline-block animate-wave delay-[200ms]">e</span>
          <span className="inline-block animate-wave delay-[300ms]">a</span>
          <span className="inline-block animate-wave delay-[400ms]">s</span>
          <span className="inline-block animate-wave delay-[500ms]">e</span>
          <span className="inline-block animate-wave delay-[600ms]"> </span>
          <span className="inline-block animate-wave delay-[700ms]">w</span>
          <span className="inline-block animate-wave delay-[800ms]">a</span>
          <span className="inline-block animate-wave delay-[900ms]">i</span>
          <span className="inline-block animate-wave delay-[1000ms]">t</span>
          <span className="inline-block animate-wave delay-[1100ms]"> </span>
          <span className="inline-block animate-wave delay-[1200ms]">f</span>
          <span className="inline-block animate-wave delay-[1300ms]">o</span>
          <span className="inline-block animate-wave delay-[1400ms]">r</span>
          <span className="inline-block animate-wave delay-[1500ms]"> </span>
          <span className="inline-block animate-wave delay-[1600ms]">w</span>
          <span className="inline-block animate-wave delay-[1700ms]">h</span>
          <span className="inline-block animate-wave delay-[1800ms]">i</span>
          <span className="inline-block animate-wave delay-[1900ms]">l</span>
          <span className="inline-block animate-wave delay-[2000ms]">e</span>
          <span className="inline-block animate-wave delay-[2100ms]">...</span>
        </p>

      </div>
    );
  }

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-x-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto mb-10 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
            <footer className="fixed w-full bottom-0 grid items-center justify-start gap-20 py-8 bg-white shadow-1 p-4 dark:border-stroke-dark dark:bg-gray-dark">
              <div className="flex justify-between w-full text-black dark:text-white">
                <p className="mr-10">&copy; Copyright   Onit Bank Pay Bill APP <span id="year">{year}</span></p>
                
              </div>
            </footer>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}

      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
