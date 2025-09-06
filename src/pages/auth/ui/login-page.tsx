import { LoginForm } from "@/features/auth";

export const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full bg-neutral-50 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
};
