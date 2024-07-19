"use client";
import React, { useEffect } from "react";
import RootLayout from "~/components/layout";
import TodoBlock from "~/components/todo-block";
import { mindFullnessAtom } from "~/recoil/atom/mindfulness";
import { financeAtom } from "~/recoil/atom/finance";
import { fitnessAtom } from "~/recoil/atom/fitness";
import { relationshipAtom } from "~/recoil/atom/relationship";
import { useRecoilState, useRecoilValue } from "recoil";
import { mindLengthAtom } from "~/recoil/atom/mindlength";
import { fitLengthAtom } from "~/recoil/atom/fitlength";
import { relationshipLengthAtom } from "~/recoil/atom/relationshiplength";
import { financeLengthAtom } from "~/recoil/atom/financelength";
import { api } from "~/utils/api";

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
import { endTimeAtom } from "~/recoil/atom/endtime";
import { useUser } from "@clerk/nextjs";
import AlarmComponent, { Alarm } from "~/components/alarm";
const ToDos = () => {
  const { user } = useUser();
  const [mindFullness, setMindFullness] = useRecoilState(mindFullnessAtom);
  const [finance, setFinance] = useRecoilState(financeAtom);
  const [fit, setFit] = useRecoilState(fitnessAtom);
  const [endTimeData, setEndTimeData] = useRecoilState<any>(endTimeAtom);
  const [rel, setRel] = useRecoilState(relationshipAtom);
  const relationships = useRecoilValue(relationshipAtom);
  const [mindprogess, setMindProgress] = useRecoilState(mindLengthAtom);
  const [fitprogess, setFitProgress] = useRecoilState(fitLengthAtom);
  const [relprogess, setRelProgress] = useRecoilState(relationshipLengthAtom);
  const [financeprogess, setFinanceProgress] =
    useRecoilState(financeLengthAtom);
  
  const deleteAll = api.dailytask?.deleteAllTasks?.useMutation();

  const {
    data: allTasksList ,
    isLoading: allTasksLoading,
    isError: allTasksError,
  } = api.alltask?.getTodayAllTasks?.useQuery();
  const {
    data: mindFullnessData = [],
    isLoading,
    isError,
  } = api.dailytask?.getMindfulTasks?.useQuery();
  const {
    data: fitData = [],
    isLoading: fitIsLoading,
    isError: fitIsError,
  } = api.dailytask?.getFitnessTasks?.useQuery();
  const {
    data: financeData = [],
    isLoading: financeIsLoading,
    isError: financeIsError,
  } = api.dailytask?.getWealthTasks?.useQuery();

  const {
    data: relData = [],
    isLoading: relIsLoading,
    isError: relIsError,
  } = api.dailytask?.getRelationshipTasks?.useQuery();



  const getRelData = () => {
    if (!relIsLoading && !relIsError) {
      setRel(relData);
    }
  };
  const getMindData = () => {
    if (!isLoading && !isError) {
      setMindFullness(mindFullnessData);
    }
  };

  const getFinanceData = () => {
    if (!financeIsLoading && !financeIsError) {
      setFinance(financeData);
    }
  };

  const getFitData = () => {
    if (!fitIsLoading && !fitIsError) {
      setFit(fitData);
    }
  };

  const getEndTime = () => {
    if (!allTasksLoading && !allTasksError) {
    
      // setEndTimeData(allTasksList?.allTasksEndtime);
    }
  }


  useEffect(() => {
    getMindData();
  }, [mindFullnessData]);
  useEffect(() => {
    getFinanceData();
  }, [financeData]);
  useEffect(() => {
    getFitData();
  }, [fitData]);
  useEffect(() => {
    getRelData();
  }, [relData]);
useEffect(() => {
  // console.log(allTasksList?.allTasksEndtime,"SASASASASASAS",endTimeData)
  getEndTime()
}
, [endTimeData])

console.log(endTimeData,"endTimeData,llllk")
  const mindFilter = mindFullness?.filter((item) => {
    if (item?.status === true) {
      return item;
    }
  });
  // console.log(mindFilter, "csdsdfsadfsf");
  const financeFilter = finance?.filter((item) => {
    if (item?.status === true) {
      return item;
    }
  });

  const fitFilter = fit?.filter((item: any) => {
    if (item?.status === true) {
      return item;
    }
  });

  const relFilter = rel?.filter((item: any) => {
    if (item?.status === true) {
      return item;
    }
  });
const totalFilterLength = mindFilter?.length + fitFilter?.length + financeFilter?.length + relFilter?.length;
const totalTaskLength = mindFullness?.length + fit?.length + finance?.length + rel?.length;


const progressData = ( totalFilterLength / totalTaskLength) * 100;


  const mindLenthpercent =
    ((mindFilter?.length ?? 0) * 100) / (mindFullness?.length ?? 1) || 0;

  const fitLenthpercent =
    ((fitFilter?.length ?? 0) * 100) / (fit?.length ?? 1) || 0;
  const financeLenthpercent =
    ((financeFilter?.length ?? 0) * 100) / (finance?.length ?? 1) || 0;
  const relLenthpercent =
    ((relFilter?.length ?? 0) * 100) / relationships.length;
    
  const pillarData = [
    {
      id: 1,
      title: "Mindfulness 🧘",
      progress:
        isNaN(mindLenthpercent) || !isFinite(mindLenthpercent)
          ? 0
          : mindLenthpercent.toFixed(2),
      data: mindFullness,
      dataqty: mindFullness?.length ?? 0,
    },
    {
      id: 2,
      title: "Fitness 🏋️‍♀️",
      progress: isNaN(fitLenthpercent) ? 0 : fitLenthpercent.toFixed(2),
      data: fit,
      dataqty: fit.length,
    },
    {
      id: 3,
      title: "Finance 💰",
      progress: isNaN(financeLenthpercent) ? 0 : financeLenthpercent.toFixed(2),
      data: finance,
      dataqty: finance.length,
    },
    {
      id: 4,
      title: "Relationships 👨‍👩‍👧‍👦",
      progress: isNaN(relLenthpercent) ? 0 : relLenthpercent.toFixed(2),
      data: rel,
      dataqty: rel.length,
    },
  ];

  const deleAll = async () => {
  const result = await deleteAll.mutate({
    id: user?.id as string,
   })
   window.location.reload();

    return result;
  };
  return (
    <RootLayout>
      <div className="flex flex-col">
        <AlarmComponent endTimeData={endTimeData} />
        <div className="flex flex-col gap-8">
          <h1 className="-mt-2  font-syne text-xl font-normal tracking-[2px] text-[#0f172a] md:text-3xl">
            {" "}
            Infuse your work with Emma&apos;s{" "}
            <span className="text-gray-400">4 Pillars</span> of Life.{" "}
          </h1>
          <div className="md:w-[20%] border-gray-400  rounded-lg border p-2 text-center">
            {" "}
            <AlertDialog>
              <AlertDialogTrigger>Start a new day</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your today&apos;s progress.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction  onClick={deleAll}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="mt-8  grid w-[100%] grid-cols-1 gap-5 md:grid-cols-2">
          {pillarData.map((item, key) => (
            <TodoBlock
              key={item.id}
              id={item.id}
              title={item.title}
              progress={item.progress}
              data={item.data}
              dataqty={item.dataqty}
            />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ToDos;
