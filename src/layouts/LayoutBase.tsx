import { Container } from "@/components/container";
import React, { ReactNode } from "react";

import styles from "./style.module.css";
import { WithStyle } from "@/types/styles";
import classNames from "classnames";

type TLayout = {
  navbar: ReactNode;
  children: ReactNode;
};
export const LayoutBase = (props: WithStyle<TLayout>) => {
  return (
    <div
      className={classNames(styles.root, props.className)}
      style={props.style}
    >
      <header className={styles.navbar}>
        <Container>{props.navbar}</Container>
      </header>
      <div className={styles["page-content"]}>{props.children}</div>
    </div>
  );
};
