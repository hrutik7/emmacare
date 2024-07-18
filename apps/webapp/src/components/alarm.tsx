import React, { useState, useEffect } from "react";
import useSound from "use-sound";
// import alarmSound from '../../src/assets/alarm.mp3'; // Import your alarm sound file
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { financeAtom } from "~/recoil/atom/finance";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { endTimeAtom } from "~/recoil/atom/endtime";
import { api } from "~/utils/api";
export const Alarm =  ({ time }: any) => {
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [open, setOpen] = useState(false);
  const [endTimeData, setEndTimeData] = useRecoilState<any>(endTimeAtom);
  const [fitnessData, setFitnessData] = useRecoilState(fitnessAtom);
  const [financeData, setFinanceData] = useRecoilState(financeAtom);
  const [relationshipData, setRelationshipData] =
    useRecoilState(relationshipAtom);
  const [mindfullnessData, setMindfullnessData] =
    useRecoilState(mindFullnessAtom);
  const mindfullTask = useRecoilValue(mindFullnessAtom);
  const fitnessTask = useRecoilValue(fitnessAtom);
  const financeTask = useRecoilValue(financeAtom);
  const [endData, setEndData] = useState([])
  const relationTask = useRecoilValue(relationshipAtom);
  
  const {
    data: allTasksList,
    isLoading: allTasksLoading,
    isError: allTasksError,
  } =  api.alltask?.getTodayAllTasks?.useQuery();
  
  const [play] = useSound("alarm.mp3"); // Alarm sound

  const getEndTimeData = async () => {
    
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
      // setEndTimeData(EndTimeList);
      // setEndData(EndTimeList)
      // console.log(EndTimeList, "EndTimeList",endTimeData);
      return EndTimeList;
    }
  };



  useEffect(() => {
    getEndTimeData().then((res) => {
      
      const interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log("done",res,currentTime);
        if (res?.includes(currentTime)) {
          play();
          setIsAlarmSet(true);
          setOpen(true);
          clearInterval(interval); // Stop checking once alarm is set
        }
      
      }, 1000); // Check every second
  
      return () => clearInterval(interval);
    });
    
  }, [endTimeData]);

  useEffect(() => {
    if (isAlarmSet) {
      // play()
      // Stop the alarm after 30 seconds
    }
  }, [isAlarmSet, play]);

  return (
    <div>
      {isAlarmSet && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          {/* <AlertDialogTrigger>Start a new day</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hurray! task finish</AlertDialogTitle>
              <AlertDialogDescription>
                We hope you had a completed the task efficiently . just click on
                continue to stop alarm and focus on next task . ALl the best
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export const AlarmComponent = (props: any) => {
  // const [endTimeData, setEndTimeData] = useRecoilState(endTimeAtom);
  const alarmArray = ["03:56 PM", "03:57 PM", "03:58 PM", "06:52 PM"];
  // console.log(props.endTimeData,"propsbro")
  return (
    <div>
      {alarmArray.map((time, index) => (
        <Alarm key={index}  />
      ))}
    </div>
  );
};

export default AlarmComponent;
