"use client";

import React from "react";
import { useMountedState } from "react-use";
import { NewAccountSheet } from "@/components/NewAccountSheet";

type Props = {
  children: React.ReactNode;
};

export const SheetProvider = ({ children }: Props) => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
      {children}
    </>
  );
};
