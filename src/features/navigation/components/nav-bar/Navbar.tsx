import React from "react";

import { Link } from "@/components/link";
import { WithStyle } from "@/types/styles";

import styles from "../../styles/styles.module.css";
import classNames from "classnames";

export type TNavbar = {
  activeLink: "home" | "login" | "sign-up" | "none";
};
/**
 * This is used on every public page of the app. The header navbar on the very top of the page
 */
export const Navbar = (props: WithStyle<TNavbar>) => {
  return (
    <div className={styles.root}>
      <div>
        <Link href="/" type="next-link" className={styles.logo}>
          Conduit
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles["nav-list"]}>
          <li>
            <Link
              className={classNames(styles["nav-link"], {
                [styles["nav-link-active"]]: props.activeLink === "home",
              })}
              href="/artikel"
              type="next-link"
            >
              Artikel
            </Link>
          </li>
          <li>
            <Link
              className={classNames(styles["nav-link"], {
                [styles["nav-link-active"]]: props.activeLink === "login",
              })}
              href="/login"
              type="next-link"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className={classNames(styles["nav-link"], {
                [styles["nav-link-active"]]: props.activeLink === "sign-up",
              })}
              href="/register"
              type="next-link"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
