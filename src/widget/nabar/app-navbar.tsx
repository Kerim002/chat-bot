import { Button } from "@/shared/ui/button";

export const AppNavbar = () => {
  return (
    <nav className="h-16 flex justify-between bg-white items-center px-3 border-b border-gray-200">
      <h2>TK gpt</h2>
      <Button>Login</Button>
    </nav>
  );
};
