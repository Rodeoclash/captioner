import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../services/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="gaLoad"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-4QLMJ6LYK4"
      />
      <Script id="gaConfig" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4QLMJ6LYK4', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
