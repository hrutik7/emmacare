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
import { Textarea } from "~/components/ui/textarea";
import { Slider } from "~/components/ui/slider";
import { api } from "~/utils/api";

const FinishTask = (props: any) => {
  const [mindFullnessData, setMindfullnessData] =
    useRecoilState(mindFullnessAtom);

  const minddata = useRecoilValue(mindFullnessAtom);
  const [task, setTask] = useState<any>();
  const { toast } = useToast();
  const [fitnessData, setFitnessData] = useRecoilState(fitnessAtom);
  const [financeData, setFinanceData] = useRecoilState(financeAtom);
  const [relationshipData, setRelationshipData] =
    useRecoilState(relationshipAtom);
  const [open, setOpen] = useState(false);
  const [mindStartHR, setMindStartsHR] = useState<any>();
  const [mindStartsmm, setMindStartsmm] = useState<any>();
  const [mindClockTime, setMindClockTime] = useState<any>();
  const [mindEndsHR, setMindEndsHR] = useState<any>();
  const [mindEndsmm, setMindEndsmm] = useState<any>();
  const [minddEndClockTime, setMinddEndClockTime] = useState<any>();
  const [checkbox, setCheckbox] = useState(false);
  const [taskComplete, setTaskComplete] = useState([33]);
  const [working, setWorking] = useState("");
  const [notWorking, setNotWorking] = useState("");
  const Improvements = api?.improvement.createImprovement.useMutation();

  const taskId = props.taskId;
  const rowId = props.rowId;
  const handleCheckbox = () => {
    setCheckbox(true);
  };

  return (
    <div>
      {
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{props.checkbox}</DialogTrigger>
          {props.checkbox.props.checked && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Task Complete 🎯</DialogTitle>
                <div className="flex flex-col gap-5 py-5">
                  <DialogDescription>
                    <div className="flex flex-col gap-5 py-2">
                      <div className="">
                        your satisfaction level with task completion -{" "}
                        <span className="font-bold text-black">
                          {taskComplete} %
                        </span>
                      </div>

                      <div>
                        <Slider
                          defaultValue={taskComplete}
                          onValueChange={(e) => setTaskComplete(e)}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-5">
                      <div> What works (do more) </div>

                      <Textarea
                        onChange={(e) => {
                          setWorking(e.target.value);
                        }}
                        placeholder="Type your message here."
                      />
                    </div>
                  </DialogDescription>

                  <DialogDescription>
                    <div className="flex flex-col gap-3">
                      <div> What doesn’t work (needs to be changed) </div>

                      <Textarea
                        onChange={(e) => {
                          setNotWorking(e.target.value);
                        }}
                        placeholder="Type your message here."
                      />
                    </div>
                  </DialogDescription>
                </div>
              </DialogHeader>

              <DialogFooter>
                <Button
                  onClick={() => {
                    const todayDate = new Date();
                    const formattedDate = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`;
                    switch (taskId) {
                      
                      case 1:
                        // Improvements.mutate({
                        //   improvement: working,
                        //   notimprovement: notWorking,
                        //   satisfaction: taskComplete,
                        // });

                        Improvements.mutate({
                          id: rowId, // Add the missing 'id' property
                          improvement: working,
                          notimprovement: notWorking,
                          satisfaction: taskComplete,
                          date: formattedDate,
                        });

                        toast({
                          title: "congrats",
                          description: "Task finished succesfully",
                          variant: "success",
                        });
                        setOpen(false);

                        break;
                      case 2:
                        Improvements.mutate({
                          id: rowId, // Add the missing 'id' property
                          improvement: working,
                          notimprovement: notWorking,
                          satisfaction: taskComplete,
                          date: formattedDate,
                        });

                        toast({
                          title: "congrats",
                          description: "Task finished succesfully",
                          variant: "success",
                        });
                        setOpen(false);
                        break;
                      case 3:
                        Improvements.mutate({
                          id: rowId, // Add the missing 'id' property
                          improvement: working,
                          notimprovement: notWorking,
                          satisfaction: taskComplete,
                          date: formattedDate,
                        });

                        toast({
                          title: "congrats",
                          description: "Task finished succesfully",
                          variant: "success",
                        });
                        setOpen(false);
                        break;
                      case 4:
                        Improvements.mutate({
                          id: rowId, // Add the missing 'id' property
                          improvement: working,
                          notimprovement: notWorking,
                          satisfaction: taskComplete,
                          date: formattedDate,
                        });

                        toast({
                          title: "congrats",
                          description: "Task finished succesfully",
                          variant: "success",
                        });
                        setOpen(false);
                        break;
                      default:
                        console.log("default");
                        break;
                    }
                  }}
                  type="submit"
                >
                  Finish task
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      }
    </div>
  );
};

export default FinishTask;
