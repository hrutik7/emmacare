"use client";
import React, { useState, useEffect, use } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { ambitiousGoalDateAtom } from "~/recoil/atom/ambitiousdate";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Skeleton } from "~/components/ui/skeleton";
// import { title } from "process";
const CountdownTimer = ({ targetDate }: any) => {
  const datetarget = useRecoilValue(ambitiousGoalDateAtom);
  const [title , setTitle] = useState(true)
  const calculateTimeRemaining = (targetDate: any) => {
    const now = new Date().getTime();
    const difference: number = new Date(targetDate).getTime() - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    // console.log(days, hours, minutes, seconds, "difference");
if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
  setTitle(false)
      return { days, hours, minutes, seconds, difference };
    }
    return { days, hours, minutes, seconds, difference };
  };

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-8 px-1 md:grid-cols-4 md:gap-20 md:px-20 ">
          <div className="">
            <div className="flex flex-col font-orbitron text-6xl font-medium text-gray-400">{`${timeRemaining.days}`}</div>{" "}
            <div className="font-syne text-xl font-normal">Days</div>
          </div>
          <div>
            {" "}
            <div className="font-orbitron text-6xl font-medium text-gray-400">{`${timeRemaining.hours}`}</div>{" "}
            <div className="font-syne text-xl font-normal">Hours</div>
          </div>

          {/* {} */}
          <div>
            {" "}
            <div className="font-orbitron text-6xl font-medium text-gray-400">{`${timeRemaining.minutes}`}</div>{" "}
            <div className="font-syne text-xl font-normal">Minutes</div>
          </div>
          <div>
            {" "}
            <div className="font-orbitron text-6xl font-medium text-gray-400">{`${timeRemaining.seconds}`}</div>{" "}
            <div className="text-normal font-syne text-xl font-normal">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Countdown = () => {
  const [date, setDate] = useState<any>();
  const router = useRouter();
  const datetarget = useRecoilValue(ambitiousGoalDateAtom);
  const [ambitiousGoalDate, setAmbitiousGoalDate] = useRecoilState(
    ambitiousGoalDateAtom,
  );

  const {
    data: ambitiosData,
    isError,
    isLoading,
  } = api?.ambitiousgoal?.getAmbitiousGoals?.useQuery();

  useEffect(() => {
    if (isLoading === false && isError === false) {
      const date =
        ambitiosData[ambitiosData.length - 1]?.ambitiousGoalTime ?? "";
      setAmbitiousGoalDate(date);
    }
  }, [ambitiosData]);
  return !isLoading ? (
    <div className="flex w-[100%] justify-center rounded-xl border border-gray-200 bg-white py-5 shadow-lg">
      {datetarget !== new Date().toISOString() &&
      datetarget > new Date().toISOString()  ? (
        <div className="flex flex-col">
          <div className="w-[100%] font-syne text-5xl font-medium">
            Time Left
          </div>

          <div className="flex flex-row gap-10">
            <div className="flex flex-col items-center py-9">
              <div className="text-xl">
                {" "}
                <CountdownTimer targetDate={datetarget} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="px-2 font-syne text-lg font-normal hover:cursor-pointer md:text-5xl"
          onClick={() => {
            router.push("/ambitiousgoal");
          }}
        >
          click to choose most ambitious goal
        </div>
      )}
    </div>
  ) : (
    <div className="flex w-[100%] justify-center rounded-xl border border-gray-200 bg-white py-5 shadow-lg">
      <Skeleton className="h-[100%] w-[100%] rounded-xl" />
    </div>
  );
};

export default Countdown;
