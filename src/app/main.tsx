import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import AppRouter from "./routes/main.routes";
import { MainProvider } from "./layouts/main-provider";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <AppRouter />
    </MainProvider>
  </StrictMode>
);
