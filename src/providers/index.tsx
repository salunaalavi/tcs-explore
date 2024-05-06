import { swrFetcher } from "@/lib";
import React, { ReactNode } from "react";
import { SWRConfig } from "swr";
import { ThemeProvider } from "./theme-provider";
import { NotificationProvider } from "./notification-provider";

type TAppProvider = {
  children: ReactNode;
};
export const AppProvider = ({ children }: TAppProvider) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        fetcher: swrFetcher,
      }}
    >
      <ThemeProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};
