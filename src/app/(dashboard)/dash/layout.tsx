import React from "react";
import Header from "./components/Header";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div>{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
