import React, { ReactNode } from "react";

import {
  AuthenticatedNavbar,
  TAuthenticatedNavbar,
} from "@/features/navigation";
import { LayoutBase } from "./LayoutBase";

type TLayout = {
  children: ReactNode;
  activeLink: TAuthenticatedNavbar["activeLink"];
};
export const AuthenticatedLayout = (props: TLayout) => {
  return (
    <LayoutBase navbar={<AuthenticatedNavbar activeLink={props.activeLink} />}>
      {props.children}
    </LayoutBase>
  );
};
