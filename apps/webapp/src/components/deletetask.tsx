"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { useToast } from "~/components/ui/use-toast";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { financeAtom } from "~/recoil/atom/finance";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { api } from "~/utils/api";
const DeleteTask = (props: any) => {
  const [mindFullnessData, setMindfullnessData] =
    useRecoilState(mindFullnessAtom);

  const minddata = useRecoilValue(mindFullnessAtom);
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const [fitnessData, setFitnessData] = useRecoilState(fitnessAtom);
  const [financeData, setFinanceData] = useRecoilState(financeAtom);
  const [relationshipData, setRelationshipData] =
    useRecoilState(relationshipAtom);

  
  const deleteMindTask = api.dailytask.deleteMindfulTask.useMutation();
  const deleteFitnessTask = api.dailytask.deleteFitnessTask.useMutation();
  const deleteFinanceTask = api.dailytask.deleteWealthTask.useMutation();
  const deleteRelationshipTask =
    api.dailytask.deleteRelationshipTask.useMutation();
  const taskId = props.taskId;
  const rowId = props.rowId;
  // console.log(props, "deleteprops");
  const deleteMind = async (id: string) => {
    try {
      const response = await deleteMindTask.mutate({ id: id });
      setOpen(false);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const deleteFitness = async (id: string) => {
    try {
      const response = await deleteFitnessTask.mutate({ id: id });
      setOpen(false);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const deleteFinance = async (id: string) => {
    try {
      const response = await deleteFinanceTask.mutate({ id: id });
      setOpen(false);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const deleteRelationship = async (id: string) => {
    try {
      const response = await deleteRelationshipTask.mutate({ id: id });
      setOpen(false);
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash color="gray" size={15} className="hover:cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Task ❌</DialogTitle>
            <DialogDescription>
              Are you sure delete this task {props.task.task}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => {
                switch (taskId) {
                  case 1:
                    setMindfullnessData((oldMindfullnessData): any => {
                      const newMindfullnessData = oldMindfullnessData.filter(
                        (item: any, index: number) => {
                          if (index != rowId) {
                            return item;
                          }
                        },
                      );
                      // console.log(newMindfullnessData, "newMindfullnessData");
                      return newMindfullnessData;
                    });

                    deleteMind(props.task?.id);
                    // console.log("first", minddata);
                    break;
                  case 2:
                    setFitnessData((oldFitnessData:any): any => {
                      const newFitnessData = oldFitnessData.filter(
                        (item: any, index: number) => {
                          if (index != rowId) {
                            return item;
                          }
                        },
                      );
                      deleteFitness((fitnessData[rowId] as any)?.id);
                      // console.log(newFitnessData, "newFitnessData");
                      return newFitnessData;
                    });

                    toast({
                      title: "deleted successfully",
                      description: "Task delete successfully",
                      variant: "success",
                    });
                    break;
                  case 3:
                    setFinanceData((oldFinanceData): any => {
                      const newFinanceData = oldFinanceData.filter(
                        (item: any, index: number) => {
                          if (index != rowId) {
                            return item;
                          }
                        },
                      );
                      // console.log(newFinanceData, "newFinanceData");
                      return newFinanceData;
                    });
                    deleteFinance((financeData[rowId] as any)?.id);
                    toast({
                      title: "deleted successfully",
                      description: "Task delete successfully",
                      variant: "success",
                    });
                    break;
                  case 4:
                    setRelationshipData((oldRelationshipData:any): any => {
                      const newRelationShipData = oldRelationshipData.filter(
                        (item: any, index: number) => {
                          if (index != rowId) {
                            return item;
                          }
                        },
                      );
                      // console.log(newRelationShipData, "newRelationShipData");
                      return newRelationShipData;
                    });
                    deleteRelationship((relationshipData[rowId] as any)?.id);
                    toast({
                      title: "deleted successfully",
                      description: "Task delete successfully",
                      variant: "success",
                    });
                    break;
                  default:
                    console.log("default");
                    break;
                }
              }}
              type="submit"
            >
              delete task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteTask;
