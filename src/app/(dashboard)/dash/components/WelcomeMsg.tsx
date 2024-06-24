"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

function WelcomeMsg() {
  const { user, isLoaded, isSignedIn } = useUser();
  console.log(user);
  return (
    <div className="space-y-4 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back {isLoaded ? "," : ""} {user?.firstName}
      </h2>
      <p className="text-sm lg:text-base text-[#69b6fd]">
        Build you hybrid working environment
      </p>
    </div>
  );
}

export default WelcomeMsg;
