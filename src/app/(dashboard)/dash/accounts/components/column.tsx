"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountDataType } from "@/types/accountDataType";
import Actions from "./actions";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AccountDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold p-2">Acct Name</div>,
    cell: ({ row }) => (
      <div className="font-medium p-2">{row.getValue("name") as string}</div>
    ),
  },
  {
    accessorKey: "plaidId",
    header: () => <div className="font-bold">Plaid Id</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("plaidId") as string}</div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => <Actions id={row.getValue("id")} />,
    // cell: ({ row }) => {
    //   console.log(row.getValue("id"));
    //   return <div>{row.getValue("id")}</div>;
    // },
  },
];
