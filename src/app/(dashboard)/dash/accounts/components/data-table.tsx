"use client";

import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/use-confirm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isDelBtnDisabled: boolean;
  onAcctDeleted: (ids: string[]) => void;
}

type RowDataType = {
  id: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  isDelBtnDisabled,
  onAcctDeleted,
}: DataTableProps<TData, TValue>) {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure ?",
    "You are going to do a bulk delete"
  );
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const onDeleteClicked = async () => {
    if (isDelBtnDisabled == true) return;

    const ok = await confirm();

    if (ok) {
      const { rows: selectedRows } = table.getSelectedRowModel();
      const selectedItemIds = selectedRows.map((item: Row<TData>) => {
        const rowData = item.original as RowDataType;
        return rowData.id;
      });

      onAcctDeleted(selectedItemIds);

      table.resetRowSelection();
    }
  };

  return (
    <div>
      <ConfirmationDialog />
      <div className="flex-1 text-sm text-muted-foreground flex justify-between">
        <div>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <Button disabled={isDelBtnDisabled} onClick={onDeleteClicked}>
            delete
          </Button>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md border ">
          <Table>
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
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
