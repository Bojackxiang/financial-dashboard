import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  href: string;
  isActive?: boolean;
};

function NavItem(props: Props) {
  const { href, label, isActive } = props;
  return (
    <div>
      <Link href={href}>{label}</Link>
    </div>
  );
}

export default NavItem;
