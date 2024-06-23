import React from "react";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";

function Header() {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className=" mx-auto">
        <div className="w-full flex items-center mb-14 gap-x-12">
          <HeaderLogo />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default Header;
