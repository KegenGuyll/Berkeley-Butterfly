/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import Layout from "@/layout";

import { store } from "@/redux/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
