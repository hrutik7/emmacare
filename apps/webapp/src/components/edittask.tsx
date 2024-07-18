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
import { min, set } from "date-fns";
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
    const response = await updateMindfullness.mutate(data);
    // console.log(data, "dekhbhai", response);
    setMindfullnessData((oldMindfullnessData): any => {
      const newMindfullnessData = oldMindfullnessData.map(
        (item: any, index: number) => {
          if (data.id == rowId) {
            // console.log(rowId, "sirrrrrrrqe", data.id);
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
      console.log(newMindfullnessData, "iyuuu");
      return newMindfullnessData;
    });
    // console.log(first)
    setMind(mindFullnessData);
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
              <Label htmlFor="username" className="w-[95%] text-left">
                update start time
              </Label>
              <Input
                id="name"
                value={mindStartHR}
                className="col-span-3"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && parseInt(value) <= 12) {
                    setMindStartsHR(value);
                  }
                }}
                placeholder="HH"
              />

              <Input
                id="name"
                value={mindStartsmm}
                className="col-span-3"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && parseInt(value) <= 60) {
                    setMindStartsmm(value);
                  }
                }}
                placeholder="MM"
              />

              <Input
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
              />
            </div>

            <div className="justify-left flex items-center gap-2">
              <Label htmlFor="username" className="w-[95%] text-left">
                update end time
              </Label>
              <Input
                id="name"
                value={mindEndsHR}
                className="col-span-3"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && parseInt(value) <= 12) {
                    setMindEndsHR(value);
                  }
                }}
                placeholder="HH"
              />

              <Input
                id="name"
                value={mindEndsmm}
                className="col-span-3"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && parseInt(value) <= 60) {
                    setMindEndsmm(value);
                  }
                }}
                placeholder="MM"
              />

              <Input
                id="name"
                value={minddEndClockTime}
                className="col-span-3"
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (value === "AM" || value === "PM") {
                    setMinddEndClockTime(value);
                  }
                }}
                placeholder="AM / PM"
              />
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
                      setMindfullnessData((oldMindfullnessData): any => {
                        const newMindfullnessData = oldMindfullnessData.map(
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
                        return newMindfullnessData;
                      });

                      toast({
                        title: "edit",
                        description: "Task edit successfully",
                        variant: "success",
                      });
                      updateMind({
                        id: props.task.id,
                        task: task,
                        startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        status: props.task.status,
                      });
                      // console.log("first", {
                        // task: task,
                        // startTime: `${mindStartHR}:${mindStartsmm} ${mindClockTime}`,
                        // endTime: `${mindEndsHR}:${mindEndsmm} ${minddEndClockTime}`,
                        // status: true,
                      // });
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
