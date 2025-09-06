import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
const AppRouter = lazy(() => import("./routes/main.routes"));
import { MainProvider } from "./layouts/main-provider";
import "../shared/localization/i18n";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <Suspense>
        <AppRouter />
      </Suspense>
    </MainProvider>
  </StrictMode>
);
