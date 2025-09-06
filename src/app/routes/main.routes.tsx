import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "../layouts/app-layout";
import { Chat, Empty } from "@/pages/chat";
import TestPage from "@/pages/test/test-page";
import { Suspense } from "react";
import { authRoutes } from "./auth.routes";
const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Empty />
          </Suspense>
        ),
      },
      {
        path: "/room",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/room/:id",
        element: (
          <Suspense>
            <Chat />
          </Suspense>
        ),
      },
    ],
  },
  ...authRoutes,
  {
    path: "/test",
    element: <TestPage />,
  },
]);

const AppRouter = () => <RouterProvider router={mainRoutes} />;

export default AppRouter;
