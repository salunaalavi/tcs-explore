import { useAuthStoreCSR } from "@/stores/auth";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { getAuthStatus } from "../utils";
import { Spin } from "@/components/spin";

import styles from "./style.module.css";

type TProtected = {
  children: ReactNode;
  notAuthorizedRedirectUrl?: string;
  loadingState?: ReactNode;
};
export const Protected = (props: TProtected) => {
  const authStore = useAuthStoreCSR();
  const router = useRouter();
  useEffect(() => {
    if (!router || !authStore) return;

    if (getAuthStatus(authStore) === "not-authenticated") {
      router.push(props.notAuthorizedRedirectUrl ?? "/artikel");
    }
  }, [router, authStore, props.notAuthorizedRedirectUrl]);

  if (authStore && getAuthStatus(authStore) === "authenticated") {
    return <>{props.children}</>;
  }

  return (
    <>
      {props.loadingState ? (
        props.loadingState
      ) : (
        <div className={styles["loading-root"]}>
          <Spin size="large" delay={500} />
        </div>
      )}
    </>
  );
};
