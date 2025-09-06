import { lazy } from "react";

export const AppLayout = lazy(() =>
  import("./app-layout").then((mod) => ({ default: mod.AppLayout }))
);
