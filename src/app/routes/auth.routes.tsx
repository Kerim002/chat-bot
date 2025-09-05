import { LoginPage, RegisterPage } from "@/pages/auth";
import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "/sign-in",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense>
        <RegisterPage />
      </Suspense>
    ),
  },
];
