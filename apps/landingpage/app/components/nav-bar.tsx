"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export default function Navbar() {
  const [nav, setNav] = useState(false);
  return (
    <header className="flex flex-wrap justify-center sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
      <nav
        className="flex   md:items-center justify-evenly items-center sm:flex-row  max-w-[89rem] w-full mx-auto  px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="font-4xl">
          <Image src="/emma.png" alt="logo" width={50} height={50} />
        </div>
        <div className="flex flex-row items-center   sm:justify-end sm:mt-0 sm:ps-5">
          <div  className="flex text-white text-[16px]  font-sans font-medium p-3 cursor-pointer text-center bg-[#2971C7] align-middle justify-center rounded-xl h-12 ">
          <a href="http://localhost:3000/">
          Try emma for free
          </a>
          </div>
         
        </div>
      </nav>
    </header>
  );
}
