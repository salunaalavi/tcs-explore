import { AppProvider } from "@/providers";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Protected, RedirectIfDoneAuth } from "@/features/auth";

type NextPageExtended = NextPage & {
  withLayout?: (page: ReactElement) => ReactNode;
  isProtected?: boolean;
  redirectIfDoneAuth?: boolean;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageExtended;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const withLayout = Component.withLayout ?? ((page) => page);
  const isProtected = Component.isProtected ?? false;
  const redirectIfDoneAuth = Component.redirectIfDoneAuth ?? false;

  const pageContent = withLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <title>Conduit Blog</title>
        <meta name="description" content="Blog that mimics Medium" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        {isProtected ? (
          <Protected>{pageContent}</Protected>
        ) : redirectIfDoneAuth ? (
          <RedirectIfDoneAuth>{pageContent}</RedirectIfDoneAuth>
        ) : (
          pageContent
        )}
      </AppProvider>
    </>
  );
}
