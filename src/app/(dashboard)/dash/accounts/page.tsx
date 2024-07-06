"use client";
import { Loader2, Plus } from "lucide-react";
import { isUndefined } from "lodash";

import { AccountDataType } from "@/types/accountDataType";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/hooks/accounts/use-new-account";
import { columns } from "./components/column";
import { DataTable } from "./components/data-table";
import { useGetAccounts } from "@/hooks/accounts/api/use-get-account";
import { Skeleton } from "@/components/ui/skeleton";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const { data, error, isError, isLoading } = useGetAccounts();
  const shouldDataTableDisplay = !isLoading && !isError && !isUndefined(data);
  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-white rounded-sm shadow-2xl">
        <div className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </CardContent>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl">Acct pages</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="mr-4" size={20} />
            Add New Acct
          </Button>
        </CardHeader>
        <CardContent>
          {shouldDataTableDisplay && (
            <DataTable
              columns={columns}
              data={(data as AccountDataType[]) || []}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
