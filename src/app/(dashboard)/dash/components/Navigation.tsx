import React from "react";

const NAV_ROUTES = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transaction",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/category",
    label: "Category",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const Navigation = () => {
  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {NAV_ROUTES.map((navItem) => {
        return <p>{navItem.label}</p>;
      })}
    </div>
  );
};

export default Navigation;
