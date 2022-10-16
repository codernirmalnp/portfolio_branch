import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactNode } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import "../styles/main.scss";
type GetLayout = (page: ReactNode) => ReactNode;

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => page;

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const queryclient = new QueryClient();
  const getLayout = Component.getLayout ?? defaultGetLayout;

  return (
    <QueryClientProvider client={queryclient}>
      <Head>
        <title>My site</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {getLayout(<Component {...pageProps} />)}
      <Toaster position="top-right" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
