/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import Image from "next/image";

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  ChevronLeft,
  Goal,
  Sparkle,
  ListChecksIcon,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 1100;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={
        isCollapsed
          ? " flex h-full w-[80px] min-w-[80px]  flex-col items-baseline border-r  bg-[#F8FAFA]  text-xl transition-all delay-200 duration-200   ease-in-out "
          : "relative flex h-full w-[15%] min-w-[80px]  flex-col justify-around border-r  bg-[#F8FAFA]  text-xl transition-all delay-200 duration-200   ease-in-out "
      }
    >
      {!mobileWidth && (
        <div>
          <div
            className={
              isCollapsed
                ? "ml-[29%] py-6 transition-all delay-200 duration-200 ease-in-out"
                : "flex-left ml-[90%] flex py-6 transition-all delay-200 duration-200 ease-in-out"
            }
          >
            <div>
              <Button
                onClick={toggleSidebar}
                variant="secondary"
                className="rounded-full border bg-white p-2"
              >
                {isCollapsed ? (
                  <ChevronRight color="black" />
                ) : (
                  <ChevronLeft color="black" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },

            {
              title: "daily TO-DOs",
              href: "/Todos",
              icon: ListChecksIcon,
              variant: "ghost",
            },
            {
              title: "Ambitious goal",
              href: "/ambitiousgoal",
              icon: Goal,
              variant: "ghost",
            },
            {
              title: "Introspection",
              href: "/introspection",
              icon: Sparkle,
              variant: "ghost",
            },
          ]}
        ></Nav>

        <div
          className={
            isCollapsed || mobileWidth
              ? "mt-20 flex w-[100%] flex-col justify-between gap-3 border-t  px-4 py-8 transition-all delay-200 duration-200 ease-in-out"
              : "flex-end mt-32 flex w-[100%] flex-row justify-between gap-3 border-t  px-4 py-8 transition-all delay-200 duration-200 ease-in-out"
          }
        >
          <div>
            <Image src="/discord.svg" alt="" width={30} height={30} />
          </div>

          <div>
            <Image src="/twitter.svg" alt="" width={30} height={30} />
          </div>

          <div>
            <Image src="/git.svg" alt="" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
