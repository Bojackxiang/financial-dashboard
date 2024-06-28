"use client";

import React from "react";
import { NewAccountSheet } from "@/components/newAccountSheet";
import { useMountedState } from "react-use";
useMountedState;

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
