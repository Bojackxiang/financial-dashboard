"use client";

import { useGetAccounts } from "@/hooks/accounts/api/use-get-account";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Dashboard() {
  const { data, error, isError, isLoading } = useGetAccounts();
  return <div>{data?.name}</div>;
}
