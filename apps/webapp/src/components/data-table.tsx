"use client";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { Checkbox } from "~/components/ui/checkbox";
import DeleteTask from "./deletetask";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { mindLengthAtom } from "~/recoil/atom/mindlength";
import { fitLengthAtom } from "~/recoil/atom/fitlength";
import { financeLengthAtom } from "~/recoil/atom/financelength";
import { relationshipLengthAtom } from "~/recoil/atom/relationshiplength";
import { useRecoilState } from "recoil";
import EditTask from "./edittask";
import FinishTask from "./finishedtask";
import { CheckCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  taskType?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  id,
  taskId,
  taskType,
  rowID,
  allTasksLoading,
  className,
}: any) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [rowNo, setRowNo] = useState(0);
  const [mindLength, setMindLength] = useRecoilState(mindLengthAtom);
  const [fitLength, setFitLength] = useRecoilState(fitLengthAtom);
  const [financeLength, setFinanceLength] = useRecoilState(financeLengthAtom);
  const [relationlength, setRelationlength] = useRecoilState(
    relationshipLengthAtom,
  );
  const { user } = useUser();
  const mindTaskDataAdd = api?.dailytask.updateMindfulTask?.useMutation();

  const fitnessTaskDataAdd = api?.dailytask.updateFitnessTask?.useMutation();

  const wealthData = api?.dailytask.updateWealthTask?.useMutation();

  const relationTaskDataAdd =
    api?.dailytask.updateRelationshipTask?.useMutation();
  const dailyProgress = api?.progress.updateProgress?.useMutation();
  const radarmindValue = api?.user?.updateMindRadar?.useMutation();
  const radarwealthValue = api?.user?.updateWealthRadar?.useMutation();
  const radarfitnessValue = api?.user?.updateFitnessRadar?.useMutation();
  const radarrelationValue = api?.user?.updateRelationshipRadar?.useMutation();
  const { data: daialyTaskData } = api.alltask.getTodayTasks.useQuery();

  const [check, setCheck] = useState(true);
  const [taskrowId, setTaskRowId] = useState(1);
  console.log(data, "databatte",allTasksLoading);
  const updateProgress = () => {
    dailyProgress.mutate({
      dayname: new Date().toLocaleDateString(),
    });
  };
  const updateMindTask = async (
    status: boolean,
    rowId: string,
    rowNo: number,
  ) => {
    if (status) {
      mindTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowNo]?.task as string,
        startTime: `${data[rowNo]?.startTime}` as string,
        endTime: data[rowNo]?.endTime as string,
        status: true,
      });

      radarmindValue.mutate({
        id: user?.id as string,
        mindScore: 10 as number,
      });

      const dailyprognumber = daialyTaskData?.allEndTimes?.map((task: any) => {
        return task;
      });

      dailyProgress.mutate({
        dayname: new Date().toLocaleDateString(),
      });
      console.log(dailyProgress.data, "radarffdfd");
    } else {
      mindTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowNo]?.task as string,
        startTime: `${data[rowNo]?.startTime}` as string,
        endTime: data[rowNo]?.endTime as string,
        status: false,
      });
    }
  };
console.log(data, "databatte",allTasksLoading);
  const updateFitnessTask = async (
    status: boolean,
    rowId: string,
    rowNo: number,
  ) => {
    if (status) {
      fitnessTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowNo]?.task as string,
        startTime: `${data[rowNo]?.startTime}` as string,
        endTime: data[rowNo]?.endTime as string,
        status: true,
      });
      radarfitnessValue.mutate({
        id: user?.id as string,
        fitnessScore: 10 as number,
      });
      const dailyprognumber = daialyTaskData?.allEndTimes?.map((task: any) => {
        return task;
      });

      dailyProgress.mutate({
        dayname: new Date().toLocaleDateString(),
      });
    } else {
      fitnessTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowId]?.task as string,
        startTime: `${data[rowId]?.startTime}` as string,
        endTime: data[rowId]?.endTime as string,
        status: false,
      });
    }
  };

  const updateWealthData = async (
    status: boolean,
    rowId: string,
    rowNo: number,
  ) => {
    if (status) {
      wealthData.mutate({
        id: rowId as string,
        task: data[rowNo]?.task as string,
        startTime: `${data[rowNo]?.startTime}` as string,
        endTime: data[rowNo]?.endTime as string,
        status: true,
      });

      radarwealthValue.mutate({
        id: user?.id as string,
        wealthScore: 10 as number,
      });

      const dailyprognumber = daialyTaskData?.allEndTimes?.map((task: any) => {
        return task;
      });

      dailyProgress.mutate({
        dayname: new Date().toLocaleDateString(),
      });
    } else {
      wealthData.mutate({
        id: rowId as string,
        task: data[rowId]?.task as string,
        startTime: `${data[rowId]?.startTime}` as string,
        endTime: data[rowId]?.endTime as string,
        status: false,
      });
    }
  };

  const updateRelationTask = async (
    status: boolean,
    rowId: string,
    rowNo: number,
  ) => {
    if (status) {
      relationTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowNo]?.task as string,
        startTime: `${data[rowNo]?.startTime}` as string,
        endTime: data[rowNo]?.endTime as string,
        status: true,
      });

      radarrelationValue.mutate({
        id: user?.id as string,
        relationShipScore: 10 as number,
      });

      const dailyprognumber = daialyTaskData?.allEndTimes?.map((task: any) => {
        return task;
      });

      dailyProgress.mutate({
        dayname: new Date().toLocaleDateString(),
      });
    } else {
      relationTaskDataAdd.mutate({
        id: rowId as string,
        task: data[rowId]?.task as string,
        startTime: `${data[rowId]?.startTime}` as string,
        endTime: data[rowId]?.endTime as string,
        status: false,
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table key={id}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {taskId === 1 && (
          <TableBody key={id}>
            {(table?.getRowModel()?.rows?.length ?? 0) > 0 && taskId === 1 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="text-left">
                        {cell.column.id === "status" && (
                          <div>
                            {check == true ? (
                              <FinishTask
                                onClick={() => {
                                  setCheck(false);
                                }}
                                checkbox={
                                  <Checkbox
                                    checked={
                                      row.getIsSelected() ||
                                      data[Number(row.id)].status
                                        ? true
                                        : false
                                    }
                                    onCheckedChange={(value) => {
                                      setTaskRowId(1);
                                      // console.log(taskId, "aa", "taskIdddd");
                                      row.toggleSelected(!!value);
                                      if (
                                        value === true &&
                                        row.getIsSelected() === false
                                      ) {
                                        setMindLength(mindLength + 1);

                                        updateMindTask(
                                          value,
                                          data[Number(row.id)].id,
                                          Number(row.id),
                                        );
                                      } else {
                                        setMindLength(mindLength - 1);

                                        updateMindTask(
                                          value as boolean,
                                          data[row.id].id,
                                          Number(row.id),
                                        );
                                      }
                                    }}
                                    aria-label="Select row"
                                  />
                                }
                                rowId={row.id}
                                taskId={taskId}
                                task={data[row.id]}
                              />
                            ) : (
                              <CheckCheck />
                            )}
                          </div>
                        )}
                        {cell.column.id === "Start Time" &&
                          data[row.id]?.startTime}
                        {cell.column.id === "Finish Time" &&
                          data[row.id]?.endTime}
                        {cell.column.id === "Task" && data[row.id]?.task}
                        {cell.column.id === "Customize" && (
                          <div className="flex gap-5">
                            <EditTask
                              rowId={data[row.id]?.id}
                              taskId={taskId}
                              task={data[row.id]}
                              taskType={taskType}
                            />
                            <DeleteTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : !allTasksLoading[0] ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center font-semibold"
                  // onClick={() => {setTask(1)}}
                >
                  Add Tasks.
                </TableCell>
              </TableRow>
            ) : (
              [1, 2, 3, 4].map((index) => (
                <TableRow>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-4 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        )}
        {taskId === 2 && (
          <TableBody key={id}>
            {table.getRowModel().rows?.length && taskId === 2 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="text-left">
                        {cell.column.id === "status" && (
                          <div>
                            {check == true ? (
                              <FinishTask
                                onClick={() => {
                                  setCheck(false);
                                }}
                                checkbox={
                                  <Checkbox
                                    checked={
                                      row.getIsSelected() ||
                                      data[Number(row.id)].status
                                        ? true
                                        : false
                                    }
                                    onCheckedChange={(value) => {
                                      setTaskRowId(1);
                                      // console.log(taskId, "aa", "taskIdddd");
                                      row.toggleSelected(!!value);
                                      if (
                                        value === true &&
                                        row.getIsSelected() === false
                                      ) {
                                        setMindLength(mindLength + 1);

                                        updateFitnessTask(
                                          value,
                                          data[Number(row.id)].id,
                                          Number(row.id),
                                        );
                                      } else {
                                        setMindLength(mindLength - 1);

                                        updateFitnessTask(
                                          value as boolean,
                                          data[row.id].id,
                                          Number(row.id),
                                        );
                                      }
                                    }}
                                    aria-label="Select row"
                                  />
                                }
                                rowId={row.id}
                                taskId={taskId}
                                task={data[row.id]}
                              />
                            ) : (
                              <CheckCheck />
                            )}
                          </div>
                        )}
                        {cell.column.id === "Start Time" &&
                          data[row.id]?.startTime}
                        {cell.column.id === "Finish Time" &&
                          data[row.id]?.endTime}
                        {cell.column.id === "Task" && data[row.id]?.task}
                        {cell.column.id === "Customize" && (
                          <div className="flex gap-5">
                            <EditTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                            <DeleteTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) :  !allTasksLoading[1]  ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center font-semibold"
                  // onClick={() => {setTask(1)}}
                >
                  Add Tasks.
                </TableCell>
              </TableRow>
            ) : (
              [1, 2, 3, 4].map((index) => (
                <TableRow>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-4 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        )}
        {taskId === 3 && (
          <TableBody key={id}>
            {table.getRowModel().rows?.length && taskId === 3 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="text-left">
                        {cell.column.id === "status" && (
                          <div>
                            {check == true ? (
                              <FinishTask
                                onClick={() => {
                                  setCheck(false);
                                }}
                                checkbox={
                                  <Checkbox
                                    checked={
                                      row.getIsSelected() ||
                                      data[Number(row.id)].status
                                        ? true
                                        : false
                                    }
                                    onCheckedChange={(value) => {
                                      setTaskRowId(1);
                                      // console.log(taskId, "aa", "taskIdddd");
                                      row.toggleSelected(!!value);
                                      if (
                                        value === true &&
                                        row.getIsSelected() === false
                                      ) {
                                        setMindLength(mindLength + 1);

                                        updateWealthData(
                                          value,
                                          data[Number(row.id)].id,
                                          Number(row.id),
                                        );
                                      } else {
                                        setMindLength(mindLength - 1);

                                        updateWealthData(
                                          value as boolean,
                                          data[row.id].id,
                                          Number(row.id),
                                        );
                                      }
                                    }}
                                    aria-label="Select row"
                                  />
                                }
                                rowId={row.id}
                                taskId={taskId}
                                task={data[row.id]}
                              />
                            ) : (
                              <CheckCheck />
                            )}
                          </div>
                        )}
                        {cell.column.id === "Start Time" &&
                          data[row.id]?.startTime}
                        {cell.column.id === "Finish Time" &&
                          data[row.id]?.endTime}
                        {cell.column.id === "Task" && data[row.id]?.task}
                        {cell.column.id === "Customize" && (
                          <div className="flex gap-5">
                            <EditTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                            <DeleteTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) :  !allTasksLoading[2]  ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center font-semibold"
                  // onClick={() => {setTask(1)}}
                >
                  Add Tasks.
                </TableCell>
              </TableRow>
            ) : (
              [1, 2, 3, 4].map((index) => (
                <TableRow>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-4 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        )}
        {taskId === 4 && (
          <TableBody key={id}>
            {table.getRowModel().rows?.length && taskId === 4 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="text-left">
                        {cell.column.id === "status" && (
                          <div>
                            {check == true ? (
                              <FinishTask
                                onClick={() => {
                                  setCheck(false);
                                }}
                                checkbox={
                                  <Checkbox
                                    checked={
                                      row.getIsSelected() ||
                                      data[Number(row.id)].status
                                        ? true
                                        : false
                                    }
                                    onCheckedChange={(value) => {
                                      setTaskRowId(1);
                                      // console.log(taskId, "aa", "taskIdddd");
                                      row.toggleSelected(!!value);
                                      if (
                                        value === true &&
                                        row.getIsSelected() === false
                                      ) {
                                        setMindLength(mindLength + 1);

                                        updateRelationTask(
                                          value,
                                          data[Number(row.id)].id,
                                          Number(row.id),
                                        );
                                      } else {
                                        setMindLength(mindLength - 1);

                                        updateRelationTask(
                                          value as boolean,
                                          data[row.id].id,
                                          Number(row.id),
                                        );
                                      }
                                    }}
                                    aria-label="Select row"
                                  />
                                }
                                rowId={row.id}
                                taskId={taskId}
                                task={data[row.id]}
                              />
                            ) : (
                              <CheckCheck />
                            )}
                          </div>
                        )}
                        {cell.column.id === "Start Time" &&
                          data[row.id]?.startTime}
                        {cell.column.id === "Finish Time" &&
                          data[row.id]?.endTime}
                        {cell.column.id === "Task" && data[row.id]?.task}
                        {cell.column.id === "Customize" && (
                          <div className="flex gap-5">
                            <EditTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                            <DeleteTask
                              rowId={row.id}
                              taskId={taskId}
                              task={data[row.id]}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) :  !allTasksLoading[3]  ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center font-semibold"
                  // onClick={() => {setTask(1)}}
                >
                  Add Tasks.
                </TableCell>
              </TableRow>
            ) : (
              [1, 2, 3, 4].map((index) => (
                <TableRow>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-4 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
