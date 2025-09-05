import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import AppRouter from "./routes/main.routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
