import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layouts/app-layout";
import { Chat } from "@/pages/chat";
import TestPage from "@/pages/test/test-page";
import { Suspense } from "react";
import { authRoutes } from "./auth.routes";
const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
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
