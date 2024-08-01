"use client";
import React, { useState, useEffect } from "react";
import { BadgePlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Progress } from "~/components/ui/progress";
import { useRecoilState, useRecoilValue } from "recoil";
import { startTimeAtom } from "~/recoil/atom/starttime";
import { useToast } from "~/components/ui/use-toast";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { financeAtom } from "~/recoil/atom/finance";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { endTimeAtom } from "~/recoil/atom/endtime";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import e from "express";

const TodoBlock = (props: any) => {
  const [task, setTask] = useState<any>();
  const { toast } = useToast();
  const [fitnessData, setFitnessData] = useRecoilState(fitnessAtom);
  const [financeData, setFinanceData] = useRecoilState(financeAtom);
  const [relationshipData, setRelationshipData] =
    useRecoilState(relationshipAtom);
  const [mindfullnessData, setMindfullnessData] =
    useRecoilState(mindFullnessAtom);
  const [mindStartHR, setMindStartsHR] = useState<any>();
  const [mindEndHR, setMindEndsHR] = useState<any>();
  const [mindStartmm, setMindStartsmm] = useState<any>();
  const [mindEndmm, setMindEndsmm] = useState<any>();
  const [mindClockTime, setMindClockTime] = useState<any>();
  const [mindEndClockTime, setMinddEndClockTime] = useState<any>();
  const starttime = useRecoilValue(startTimeAtom);
  const mindfullTask = useRecoilValue(mindFullnessAtom);
  const fitnessTask = useRecoilValue(fitnessAtom);
  const financeTask = useRecoilValue(financeAtom);
  const [open, setOpen] = useState(false);
  const relationTask = useRecoilValue(relationshipAtom);
  const [endTimeData, setEndTimeData] = useRecoilState(endTimeAtom);
  const dailyProgress = api?.progress.updateProgress?.useMutation();

  const {
    data: allTasksList,
    isLoading: allTasksLoading,
    isError: allTasksError,
  } = api.alltask?.getTodayAllTasks?.useQuery();

  const [data, setData] = useState<
    {
      startTime: string;
      endTime: string;
      task: string;
      taskId: string;
    }[]
  >([]);
  const [timeData, setTimeData] = useState<any>([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  // useEffect(() => {
  //   setData(mindfullnessData);
  // }, [mindfullnessData]);
  useEffect(() => {
    setData(fitnessData);
  }, [fitnessData]);
  useEffect(() => {
    setData(financeData);
  }, [financeData]);
  useEffect(() => {
    setData(relationshipData);
  }, [relationshipData]);
  useEffect(() => {
    if (!allTasksLoading && !allTasksError) {
      const resultEndTIme = getTimeEndData().then((res) => {
        console.log(res, "resultEndTIme");
        // setEndTimeData(res);
      });
    }
  }, [props.data]);
  const mindTaskDataAdd = api?.dailytask.createMindfulTask?.useMutation();

  const fitnessTaskDataAdd = api?.dailytask.createFitnessTask?.useMutation();

  const wealthTaskDataAdd = api?.dailytask.createWealthTask?.useMutation();

  const { user } = useUser();

  const relationTaskDataAdd =
    api?.dailytask.createRelationshipTask?.useMutation();

  const getTimeEndData = async () => {
    if (!allTasksLoading && !allTasksError) {
      const wholeDayTasks = mindfullTask.concat(
        fitnessTask,
        financeTask,
        relationTask,
      );

      console.log(wholeDayTasks, "hanji");

      const EndTimeList: any = wholeDayTasks.map((item) => {
        return item.endTime;
      });
      setTimeData(EndTimeList);
      return EndTimeList;
    }
  };
  const updateMindTask = async () => {
    mindTaskDataAdd.mutate({
      id: user?.id || "",
      task: task,
      startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
      endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
      status: false,
    });
    const wholeDayTasks = mindfullTask.concat(
      fitnessTask,
      financeTask,
      relationTask,
    );

    console.log(wholeDayTasks, "hanji");

    const EndTimeList: any = wholeDayTasks.map((item) => {
      return item.endTime;
    });
    setEndTimeData(EndTimeList);
    setOpen(false);
  };
  const updateFitnessTask = async () => {
    fitnessTaskDataAdd.mutate({
      id: user?.id || "",
      task: task,
      startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
      endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
      status: false,
    });
    setOpen(false);
  };

  const updateWealthTask = async () => {
    wealthTaskDataAdd.mutate({
      id: user?.id || "",
      task: task,
      startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
      endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
      status: false,
    });
    setOpen(false);
  };

  const updateRelationTask = async () => {
    relationTaskDataAdd.mutate({
      id: user?.id || "",
      task: task,
      startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
      endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
      status: false,
    });
    setOpen(false);
  };

  const handlTask = (id: any) => {
    dailyProgress.mutate({
      dayname: new Date().toLocaleDateString(),
    });

    switch (id) {
      case 1:
        setMindfullnessData((oldMindfullnessData): any => [
          ...oldMindfullnessData,
          {
            id: id,
            task: task,
            startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
            endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
            taskId: id,
          },
        ]);

        setData(props.data);

        updateMindTask();
        toast({
          title: "Saved",
          description: "Task saved successfully",
          variant: "success",
        });
        break;
      case 2: {
        setFitnessData((oldFitnessData: any): any => [
          ...oldFitnessData,
          {
            id: id,
            task: task,
            startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
            endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
            taskId: id,
          },
        ]);

        setData(props.data);
        const wholeDayTasks = mindfullTask.concat(
          fitnessTask,
          financeTask,
          relationTask,
        );

        console.log(wholeDayTasks, "hanji");

        const EndTimeList: any = wholeDayTasks.map((item) => {
          return item.endTime;
        });
        setEndTimeData(EndTimeList);
        toast({
          title: "Saved",
          description: "Task saved successfully",
          variant: "success",
        });
        updateFitnessTask();
        break;
      }

      case 3: {
        setFinanceData((oldFinanceData): any => [
          ...oldFinanceData,
          {
            id: id,
            task: task,
            startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
            endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
            taskId: id,
          },
        ]);

        setData(props.data);
        const wholeDayTasks = mindfullTask.concat(
          fitnessTask,
          financeTask,
          relationTask,
        );
        const EndTimeList: any = wholeDayTasks.map((item) => {
          return item.endTime;
        });
        setEndTimeData(EndTimeList);
        console.log(wholeDayTasks, "hanji");
        toast({
          title: "Saved",
          description: "Task saved successfully",
          variant: "success",
        });
        updateWealthTask();
        break;
      }

      case 4: {
        setRelationshipData((oldRelationshipData: any): any => [
          ...oldRelationshipData,
          {
            id: id,
            task: task,
            startTime: `${mindStartHR}:${mindStartmm} ${mindClockTime}`,
            endTime: `${mindEndHR}:${mindEndmm} ${mindEndClockTime}`,
            taskId: id,
          },
        ]);

        setData(relationTask);
        const wholeDayTasks = mindfullTask.concat(
          fitnessTask,
          financeTask,
          relationTask,
        );
        const EndTimeList: any = wholeDayTasks.map((item) => {
          return item.endTime;
        });
        setEndTimeData(EndTimeList);
        console.log(wholeDayTasks, "hanji");
        toast({
          title: "Saved",
          description: "Task saved successfully",
          variant: "success",
        });
        updateRelationTask();
        break;
      }
      default: {
        console.log("default");
      }
    }
  };
  return (
    <div className="flex w-[100%] flex-col gap-5 rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-lg ">
      <div className=" flex flex-col justify-between md:flex-row ">
        <div className="font-base text-2xl">{props.title}</div>
        <div className="flex py-1">
          <div className="font-sm text-[#9ca3af]">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Enter Task{" "}
                  <div className="pl-2">
                    <BadgePlus />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter Task ☑️</DialogTitle>
                  <DialogDescription>
                    Enter your {props.title} Task over here
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-row items-center gap-1">
                    <Label htmlFor="name" className="w-[25%] text-left">
                      Task Name
                    </Label>
                    <Input
                      id="name"
                      value={task}
                      className="col-span-3"
                      onChange={(e) => setTask(e.target.value)}
                      placeholder="Enter your task"
                    />
                  </div>
                  <div className="justify-left flex items-center gap-2">
                    <Label htmlFor="username" className="w-[20%] text-left">
                      Start time
                    </Label>
                    <div className="flex w-[90%] gap-4">
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[...Array(13)].map((_, index) => (
                              <SelectItem
                                key={index}
                                value={index.toString().padStart(2, "0")}
                              >
                                {index.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* const value = e.target.value;
                        if (/^\d*$/.test(value) && parseInt(value) <= 60) {
                          setMindStartsmm(value);
                        }
                      }}
                      placeholder="MM"
                    /> */}
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[...Array(61)].map((_, index) => (
                              <SelectItem
                                key={index}
                                value={index.toString().padStart(2, "0")}
                              >
                                {index.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* <Input
                      id="name"
                      value={mindClockTime}
                      className="col-span-3"
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        if (value === "AM" || value === "PM") {
                          setMindClockTime(value);
                        }
                      }}
                      placeholder="AM / PM"
                    /> */}
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="justify-left flex items-center gap-2">
                    <Label htmlFor="username" className="w-[20%] text-left">
                      End time
                    </Label>
                    <div className="flex w-[90%] gap-4">
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[...Array(13)].map((_, index) => (
                              <SelectItem
                                key={index}
                                value={index.toString().padStart(2, "0")}
                              >
                                {index.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* const value = e.target.value;
                        if (/^\d*$/.test(value) && parseInt(value) <= 60) {
                          setMindStartsmm(value);
                        }
                      }}
                      placeholder="MM"
                    /> */}
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[...Array(61)].map((_, index) => (
                              <SelectItem
                                key={index}
                                value={index.toString().padStart(2, "0")}
                              >
                                {index.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* <Input
                      id="name"
                      value={mindClockTime}
                      className="col-span-3"
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        if (value === "AM" || value === "PM") {
                          setMindClockTime(value);
                        }
                      }}
                      placeholder="AM / PM"
                    /> */}
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      if (
                        task &&
                        mindStartHR &&
                        mindStartmm &&
                        mindClockTime &&
                        mindEndHR &&
                        mindEndmm &&
                        mindEndClockTime
                      ) {
                        handlTask(props.id);
                      } else {
                        toast({
                          title: "Error",
                          description: "Please fill all the fields",
                          variant: "destructive",
                        });
                      }
                    }}
                    type="submit"
                  >
                    Save Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <DataTable
          id={props?.id}
          columns={columns}
          data={props?.data || []}
          taskType={props?.title}
          taskId={props?.id}
          rowId={props?.data?.id || ""}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div>Progress : {props.progress}%</div>
        <div>
          <Progress value={props.progress} />
        </div>
      </div>
    </div>
  );
};

export default TodoBlock;
