import React from "react";

import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "./WelcomeMsg";

function Header() {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="mx-auto">
        <div className="w-full flex items-center mb-14">
          <div className="w-full flex grow items-center">
            <HeaderLogo />
            <Navigation />
          </div>
          <div>
            <ClerkLoading>
              <Loader2 className="text-white animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
          </div>
        </div>
        <WelcomeMsg />
      </div>
    </div>
  );
}

export default Header;
