"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavItem from "./NavItem";
import { cn } from "@/lib/utils";

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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);

  // click function
  const onNavItemClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const DeskMenuComponent = (
    <>
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
    </>
  );

  const MobileMenuComponent = (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 ring-transparent outline-none text-white focus:bg-white/30 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetHeader>
            <SheetTitle className="p-4">Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <nav className="flex flex-col gap-y-2 pt-6">
            {NAV_ROUTES.map((navItem) => {
              return (
                <Button
                  className={cn(
                    "w-full justify-start no-underline hover:no-underline",
                    navItem.href === pathname
                      ? "bg-slate-200"
                      : "text-slate-500"
                  )}
                  key={`mobile-nav-${navItem.href}`}
                  variant="link"
                  onClick={() => onNavItemClick(navItem.href)}
                >
                  {navItem.label}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );

  if (isMobile) {
    return <>{MobileMenuComponent}</>;
  }

  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto ml-4">
      {DeskMenuComponent}
    </div>
  );
};

export default Navigation;
