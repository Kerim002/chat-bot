import { lazy } from "react";

export const LoginPage = lazy(() =>
  import("./ui/login-page").then((c) => ({ default: c.LoginPage }))
);
export const RegisterPage = lazy(() =>
  import("./ui/register-page").then((c) => ({ default: c.RegisterPage }))
);
