import { lazy } from "react";

export const Chat = lazy(() =>
  import("./ui/chat").then((c) => ({ default: c.Chat }))
);
