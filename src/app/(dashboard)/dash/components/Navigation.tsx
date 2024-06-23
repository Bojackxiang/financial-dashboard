"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavItem from "./NavItem";

const NAV_ROUTES = [
  {
    href: "/dash",
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
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {NAV_ROUTES.map((navItem) => {
        return (
          <NavItem
            key={navItem.href}
            label={navItem.label}
            href={navItem.href}
            isActive={pathname === navItem.href}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
