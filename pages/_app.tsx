import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Routes from "../components/Routes";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";
import { theme } from "../styles/theme";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SafeHydrate>
      <AuthProvider >
        <ThemeProvider theme={theme}>
          <Routes Component={Component} {...pageProps}></Routes>
        </ThemeProvider>
      </AuthProvider>
    </SafeHydrate>
  );
}
export default MyApp;
