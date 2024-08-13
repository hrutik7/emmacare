"use client";
import Countdown from "~/components/countdown";
import RootLayout from "~/components/layout";
import { useState } from "react";
import RadarGraph from "~/components/radar-graph";
import { api } from "~/utils/api";
import LineGraph from "~/components/line-graph";
import Introspection from "~/components/introspection";
import { useUser } from "@clerk/nextjs";
export default function Home() {
  const { user } = useUser();
  const { data } = api.user?.getUser?.useQuery();
  
  
  // const {data:aiData} = api.ai?.generateAIContent?.useMutation({
  //   date : new Date().toISOString()
  // });

  
  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <RootLayout>
      <div className="pb-5  font-syne text-sm font-semibold">
        Hey ! <span className="">{user?.username} 👋</span>
        <br />
        <span className="text-gray-400 ">{today}</span>
      </div>
      <div className="flex   w-[100%] flex-col gap-12 text-center">
        <Countdown />
        <div className="flex w-[100%] flex-col gap-3 md:justify-between md:flex-row">
          <RadarGraph mind={data?.mindScore} fit={data?.fitnessScore} relationship={data?.relationShipScore} wealth={data?.wealthScore} />
          <LineGraph />
        </div>

        <div>
          <Introspection />
        </div>
      </div>
    </RootLayout>
  );
}
