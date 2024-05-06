import React from "react";

import { Link } from "@/components/link";
import { WithStyle } from "@/types/styles";

import navbarStyles from "../../styles/styles.module.css";
import styles from "./styles.module.css";

import classNames from "classnames";
import { Button } from "@/components/button";
import { useAuthStore } from "@/stores/auth";

export type TAuthenticatedNavbar = {
  activeLink: "home" | "create-article" | "none";
};
/**
 * This is used on every protected page of the app. The header navbar on the very top of the page
 */
export const AuthenticatedNavbar = (props: WithStyle<TAuthenticatedNavbar>) => {
  const authStore = useAuthStore();

  return (
    <div className={navbarStyles.root}>
      <div>
        <Link href="/" type="next-link" className={navbarStyles.logo}>
          Conduit
        </Link>
      </div>
      <nav className={navbarStyles.nav}>
        <ul className={navbarStyles["nav-list"]}>
          <li>
            <Link
              className={classNames(navbarStyles["nav-link"], {
                [navbarStyles["nav-link-active"]]: props.activeLink === "home",
              })}
              href="/app/beranda"
              type="next-link"
            >
              Beranda
            </Link>
          </li>

          <li>
            <Link
              className={classNames(navbarStyles["nav-link"], {
                [navbarStyles["nav-link-active"]]:
                  props.activeLink === "create-article",
              })}
              href="/app/buat-artikel"
              type="next-link"
            >
              Buat Artikel
            </Link>
          </li>
          <li>
            <Button
              type="link"
              className={classNames(
                navbarStyles["nav-link"],
                styles["button-link"],
              )}
              onClick={() => authStore.doLogout()}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
