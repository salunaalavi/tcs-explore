import { Navbar, TNavbar } from "@/features/navigation";
import React, { ReactNode } from "react";

import { LayoutBase } from "./LayoutBase";

type TLayout = {
  activeLink: TNavbar["activeLink"];
  children: ReactNode;
};
export const Layout = (props: TLayout) => {
  return (
    <LayoutBase navbar={<Navbar activeLink={props.activeLink} />}>
      {props.children}
    </LayoutBase>
  );
};
