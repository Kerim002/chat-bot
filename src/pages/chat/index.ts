import { lazy } from "react";

export const Chat = lazy(() =>
  import("./ui/chat").then((c) => ({ default: c.Chat }))
);
export const Empty = lazy(() =>
  import("./ui/empty").then((c) => ({ default: c.Empty }))
);
