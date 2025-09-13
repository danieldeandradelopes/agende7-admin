import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { theme as antTheme, ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppWithUpdater from "./components/AppWithUpdater/index.tsx";
import { BrandingProvider, useBrandingContext } from "./context/branding.tsx";
import { GlobalProvider } from "./context/global.tsx";
import "./index.scss";
import MainRoutes from "./routes.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 30 } },
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  const { theme } = useBrandingContext();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <BrowserRouter>
              <AppWithUpdater />
              <MainRoutes />
              <ToastContainer
                position="top-right"
                closeButton={false}
                autoClose={2000}
                theme={theme === "dark" ? "dark" : "light"}
              />
              <Analytics />
            </BrowserRouter>
          </StrictMode>
        </QueryClientProvider>
      </GlobalProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrandingProvider>
    <Main />
  </BrandingProvider>
);
