import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import {
  startNavigationProgress,
  completeNavigationProgress,
  NavigationProgress,
} from "@mantine/nprogress";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import StoreProvider, { Store } from "../utils/Store";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const queryClient = new QueryClient();
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && startNavigationProgress();
    const handleComplete = () => completeNavigationProgress();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <NotificationsProvider position="top-center" autoClose={4000}>
            <div className={`font-serif `}>
              <NavigationProgress autoReset={true} color="green" />
              <Component {...pageProps} />
            </div>
          </NotificationsProvider>
        </StoreProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default appWithTranslation(MyApp);
