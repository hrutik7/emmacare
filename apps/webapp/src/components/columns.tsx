"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Todo = {
//   id: number
//   startTime: string
//   endTime: string
//   task: string
// }

export const columns:any = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "Task",
    header: "Task",
  },
  {
    accessorKey: "Start Time",
    header: "Start Time",
  },
  
  {
    accessorKey: "Finish Time",
    header: "Finish Time",
  },
  
  {
    accessorKey: "Customize",
    header: "Customize",
  }
]
