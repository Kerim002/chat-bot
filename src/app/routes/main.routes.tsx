import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "../layouts/app-layout";
import { Chat } from "@/pages/chat/ui/chat";
import TestPage from "@/pages/test/test-page";
const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Chat />,
      },
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

const AppRouter = () => <RouterProvider router={mainRoutes} />;

export default AppRouter;
