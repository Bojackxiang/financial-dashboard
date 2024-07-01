import React from "react";
import Image from "next/image";

function AuthBanner() {
  return (
    <div className="hidden bg-blue-600 min-h-screen lg:flex justify-center items-center flex-col">
      <Image src="images/logo.svg" alt="logo.svg" width={400} height={400} />
      <h3 className="font-bold text-white text-2xl">
        Build your Hybrid work space today
      </h3>
    </div>
  );
}

export default AuthBanner;
