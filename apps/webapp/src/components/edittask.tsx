"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Pen } from "lucide-react";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { useToast } from "~/components/ui/use-toast";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { financeAtom } from "~/recoil/atom/finance";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
const EditTask = (props: any) => {
  const [mindFullnessData, setMindfullnessData] =
    useRecoilState(mindFullnessAtom);
  const [open, setOpen] = useState(false);
  const [mind, setMind] = useRecoilState(mindFullnessAtom);
  const [task, setTask] = useState<any>();
  const { toast } = useToast();
  const [fitnessData, setFitnessData] = useRecoilState(fitnessAtom);
  const [financeData, setFinanceData] = useRecoilState(financeAtom);
  const [relationshipData, setRelationshipData] =
    useRecoilState(relationshipAtom);

  const [mindStartHR, setMindStartsHR] = useState<any>();
  const [mindStartsmm, setMindStartsmm] = useState<any>();
  const [mindClockTime, setMindClockTime] = useState<any>();
  const [mindEndsHR, setMindEndsHR] = useState<any>();
  const [mindEndsmm, setMindEndsmm] = useState<any>();
  const [minddEndClockTime, setMinddEndClockTime] = useState<any>();
  const updateFitness = api.dailytask.updateFitnessTask.useMutation();
  const updateMindfullness = api.dailytask.updateMindfulTask.useMutation();
  const updateRelationshipTask =
    api.dailytask.updateRelationshipTask.useMutation();
  const updateFinanceTask = api.dailytask.updateWealthTask.useMutation();
  const taskId = props.taskId;
  const rowId = props.rowId;
  // console.log(props, "drops");
  const updateMind = async (data: any) => {
   
    // console.log(data, "dekhbhai", response);
    setMindfullnessData((oldMindfullnessData): any => {
      const newMindfullnessData = oldMindfullnessData.map(
        (item: any, index: number) => {
          
          if (data.id == rowId) {
            console.log("sdsdsdsdshgbuiuhu")
            return {
              ...item,
              task: data.task,
              startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
              endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
            };
          }

          return item;
        },
      );
      
      return newMindfullnessData;
    });
    const response = await updateMindfullness.mutate(data);
    // console.log(mind,mindFullnessData,response, "iyuuu");
    // setMind(mindFullnessData);
  };

  const updateFit = async (data: any) => {
    // console.log("updateMind", data);
    const response = await updateFitness.mutate(data);
    // console.log("responsedddddd", response);
  };

  const updateRelation = async (data: any) => {
    const response = await updateRelationshipTask.mutate(data);
    // console.log("responsedddddd", response);
  };

  const updateFinance = async (data: any) => {
    const response = await updateFinanceTask.mutate(data);
    // console.log("responsedddddd", response);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pen
            className="hover:cursor-pointer"
            color="gray"
            size={15}
            onClick={() => {
              // console.log("hereiseditprops", props);
              // <EditTask  />//data is the current mindfullness state just try to edit data[row.id]
            }}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task ✒️</DialogTitle>
            <DialogDescription>
              update your {props.task.task} Task over here
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-row items-center gap-1">
              <Label htmlFor="name" className="w-[25%] text-left">
                update task
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
              <Label htmlFor="username" className="w-[55%] text-left">
                update start time
              </Label>
              <div className="flex w-[95%] gap-12">
                <Select onValueChange={(value) => setMindStartsHR(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(13)].map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString().padStart(2, "0")}
                          onVolumeChange={(value) => {
                            console.log("clicked", "??");
                            setMindStartsHR(value.toString().padStart(2, "0"));
                          }}
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
                <Select onValueChange={(value) => setMindStartsmm(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(61)].map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString().padStart(2, "0")}
                          onVolumeChange={() => setMindStartsmm(index)}
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
                <Select onValueChange={(value) => setMindClockTime(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        onClick={() => setMindClockTime("AM")}
                        value="AM"
                      >
                        AM
                      </SelectItem>
                      <SelectItem
                        onClick={() => setMindClockTime("PM")}
                        value="PM"
                      >
                        PM
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="justify-left flex items-center gap-12">
              <Label htmlFor="username" className="w-[95%] text-left">
                update end time
              </Label>
              <div className="flex w-[90%] gap-12">
                <Select onValueChange={(value) => setMindEndsHR(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(13)].map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString().padStart(2, "0")}
                          onClick={() => setMindEndsHR(index)}
                        >
                          {index.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setMindEndsmm(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(61)].map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString().padStart(2, "0")}
                          onClick={() => setMindEndsmm(index)}
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
                <Select onValueChange={(value) => setMinddEndClockTime(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        onClick={() => setMindEndsHR("AM")}
                        value="AM"
                      >
                        AM
                      </SelectItem>
                      <SelectItem
                        onClick={() => setMindEndsmm("PM")}
                        value="PM"
                      >
                        PM
                      </SelectItem>
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
                  mindStartsmm &&
                  mindClockTime &&
                  mindEndsHR &&
                  mindEndsmm &&
                  minddEndClockTime
                ) {
                  switch (taskId) {
                    case 1:
                      updateMind({
                        id: props.task.id,
                        task: task,
                        startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        status: props.task.status,
                      });

                      // setMindfullnessData((oldMindfullnessData): any => {
                      //   const newMindfullnessData = oldMindfullnessData.map(
                      //     (item: any, index: number) => {
                      //       console.log(index,rowId,"indexrowid")
                      //       if (index === rowId ) {
                      //         console.log(
                      //           "inreturn",
                      //           taskId,
                      //           // newMindfullnessData,
                      //           index,
                      //           rowId,
                      //           item
                      //         );
                      //         return {
                      //           ...item,
                      //           task: task,
                      //           startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                      //           endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                      //         };
                      //       }
                      //       return item;
                      //     },
                      //   );

                      //   return newMindfullnessData;
                      // });

                      toast({
                        title: "edit",
                        description: "Task edit successfully",
                        variant: "success",
                      });
                      setOpen(false);
                      break;
                    case 2:
                      setFitnessData((oldFitnessData: any): any => {
                        const newFitnessData = oldFitnessData.map(
                          (item: any, index: number) => {
                            if (index == rowId) {
                              // console.log("inreturn", index, rowId, item);
                              return {
                                ...item,
                                task: task,
                                startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                                endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                              };
                            }
                            return item;
                          },
                        );
                        return newFitnessData;
                      });
                      updateFit({
                        id: props.task.id,
                        task: task,
                        startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        status: props.task.status,
                      });
                      toast({
                        title: "edit",
                        description: "Task edit successfully",
                        variant: "success",
                      });
                      break;

                    case 3:
                      setFinanceData((oldFitnessData): any => {
                        const newFitnessData = oldFitnessData.map(
                          (item: any, index: number) => {
                            if (index == rowId) {
                              // console.log("inreturn", index, rowId, item);
                              return {
                                ...item,
                                task: task,
                                startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                                endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                              };
                            }
                            return item;
                          },
                        );
                        return newFitnessData;
                      });
                      updateFinance({
                        id: props.task.id,
                        task: task,
                        startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        status: props.task.status,
                      });
                      toast({
                        title: "edit",
                        description: "Task edit successfully",
                        variant: "success",
                      });

                      break;
                    case 4:
                      setRelationshipData((oldRelationshipData: any): any => {
                        const newRelationData = oldRelationshipData.map(
                          (item: any, index: number) => {
                            if (index == rowId) {
                              // console.log("inreturn", index, rowId, item);
                              return {
                                ...item,
                                task: task,
                                startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                                endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                              };
                            }
                            return item;
                          },
                        );
                        return newRelationData;
                      });
                      updateRelation({
                        id: props.task.id,
                        task: task,
                        startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        status: props.task.status,
                      });
                      toast({
                        title: "edit",
                        description: "Task edit successfully",
                        variant: "success",
                      });
                      break;
                    default:
                      console.log("default");
                      break;
                  }
                } else {
                  toast({
                    title: "edit",
                    description: "Task edit failed",
                    variant: "destructive",
                  });
                }
              }}
              type="submit"
            >
              edit task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTask;
