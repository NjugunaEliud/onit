"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";
export default function page() {
  
  return (
    <div className=" flex justify-center  py-20 items-center">
    {/* <Breadcrumb pageName="Sign In" /> */}
    <div className="rounded-[10px] w-3/4 bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full px-20 sm:p-12.5 xl:p-15">
            <Signin />
          </div>
        </div>

        <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
          <div className="custom-gradient-1 overflow-hidden rounded-2xl  pt-12.5 dark:!bg-dark-2 dark:bg-none">
            <div className="px-12.5">
            <p className="mb-3 text-xl font-medium text-dark dark:text-white">
              Sign in to your account
            </p>

            <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
              Welcome Back!
            </h1>

            <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
              Please sign in to your account by completing the necessary
              fields below
            </p>
            </div>
            <div className="mt-8">
              <Image
                src={"/images/grids/login.png"}
                alt="Logo"
                width={505}
                height={225}
                className="mx-auto dark:opacity-30 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
