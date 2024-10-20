"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import Image from "next/image";

export default function Signin() {
  return (
    <>
      <div className=" my-0 flex flex-col items-center justify-center mb-10">
      <Link className="mb-10 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/images/logo/onit.svg"}
                alt="Logo"
                width={100}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/onit.svg"}
                alt="Logo"
                width={170}
                height={32}
              />
            </Link>
        <div className="flex flex-row w-full items-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit mb-10 bg-white px-3 text-center font-medium dark:bg-gray-dark">
          sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        </div>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      {/* <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div> */}
    </>
  );
}
