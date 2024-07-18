"use client"
import React, { useState } from "react";
import RootLayout from "~/components/layout";
import { Input } from "~/components/ui/input";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { financeAtom } from "~/recoil/atom/finance";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { useRecoilValue } from "recoil";
import { mindLengthAtom } from "~/recoil/atom/mindlength";
import { fitLengthAtom } from "~/recoil/atom/fitlength";
import { relationshipLengthAtom } from "~/recoil/atom/relationshiplength";
import { financeLengthAtom } from "~/recoil/atom/financelength";
import { DatePickerWithRange } from "~/components/date-range";
import { ambitiousGoalAtom } from "~/recoil/atom/ambitious";
import { useRecoilState } from "recoil";
import { Button } from "~/components/ui/button";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/router";
import e from "express";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { ambitiousGoalDateAtom } from "~/recoil/atom/ambitiousdate";
const ToDos = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {user} = useUser();
  const ambitiousDate = useRecoilValue(ambitiousGoalDateAtom);
  const mindFullness = useRecoilValue(mindFullnessAtom);
  const finance = useRecoilValue(financeAtom);
  const fitness = useRecoilValue(fitnessAtom);
  const relationships = useRecoilValue(relationshipAtom);
  const mindLength = useRecoilValue(mindLengthAtom);
  const fitLength = useRecoilValue(fitLengthAtom);
  const financeLength = useRecoilValue(financeLengthAtom);
  const relLength = useRecoilValue(relationshipLengthAtom);
  const [ambitiousGoal, setAmbitiousGoal] = useRecoilState(ambitiousGoalAtom);
  const [goal, setGoal] = useState("");
  const [next, setNext] = useState(false);

  const createAmtiousTask = api.ambitiousgoal.createAmbitiousGoal.useMutation();
  
  const fitLenthpercent = (fitLength * 100) / fitness.length;
  const financeLenthpercent = (financeLength * 100) / finance.length;
  const relLenthpercent = (relLength * 100) / relationships.length;

  return (
    <RootLayout>
      <div className="flex flex-col">
        <div>
          <h1 className="-mt-2  font-syne text-xl md:text-3xl font-normal tracking-[2px] text-[#0f172a]">
            {" "}
            Track your most ambitious goal over here
          </h1>
        </div>

        <div className="ml-1  text-gray-500">
          You can set only one ambitious goal at a time.
        </div>

        <div className="mt-10  flex w-[100%] flex-row-reverse gap-10 px-[2%] md:px-[30%]">
          <div className="flex w-[100%] flex-col justify-center rounded-xl border  border-gray-200 bg-white  shadow-lg ">
            {next == false ? (
              <div className="flex pb-7 flex-col justify-center px-5 md:px-10">
                <div className="mt-10 font-syne text-2xl md:text-4xl font-bold">
                  What you want to achieve ?
                </div>
                <div className="mt-2 flex flex-col gap-6 py-2">
                  <div>
                    <Input
                      type="text"
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Enter that ambitious task"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        if (goal.length > 0) {
                          setNext(!next);
                      
                          toast({
                            title: "Goal set successfully",
                            description: "Crush your goal",
                            variant: "success",
                          });
                        } else {
                          toast({
                            title: "Please enter the goal to proceed",
                            description:
                              "you can't proceed without entering the goal",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      next
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-10 flex w-[100%] flex-col justify-center text-center">
                Choose the range of date to track your{" "}
                <span className="font-bold">ambitious goal</span>
                <div className="justify-center px-2 sm:px-10 md:px-32 py-10">
                  <DatePickerWithRange  />
                </div>
                <div className="flex justify-center gap-10 py-4">
                  <Button
                    onClick={() => {
                      setNext(!next);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setAmbitiousGoal(goal);
                      createAmtiousTask.mutate({ goal: goal, id: user?.id as string, ambitiousGoalTime: ambitiousDate.toString() });
                      router.push("/");
                      // console.log(ambitiousGoal, "aaaaaaaaaaaaaaaaa");
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ToDos;
