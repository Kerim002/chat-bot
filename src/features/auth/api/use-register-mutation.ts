import { authApi } from "@/entities/auth";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: authApi.postRegister,
    onError: () => {
      toast.error("Unsuccessfully sign up");
    },
    onSuccess: () => {
      navigate("/sign-in");
      toast.success("Successfully sign up");
    },
  });
  return { registerMutation, isPending };
};
