"use client"
import React from "react";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
const TopNav = () => {
  return (
    <div className="flex w-[100%] justify-between border-b py-2 pl-4 pr-5 ">
      <div className="flex">
        <Image src="/logo.svg" alt="" width={150} height={170} />
      </div>

      <div className="pr-4 pt-2">
        <div className="h-9 w-9">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
