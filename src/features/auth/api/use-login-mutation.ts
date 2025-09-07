import { authApi } from "@/entities/auth";
import { setCookie } from "@/shared/lib/cookies";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: authApi.postLogin,
    // onError: () => {
    //   toast.error("Unsuccessfully sign in");
    // },
    onSuccess: (data) => {
      setCookie("access_token", data.access_token);
      setCookie("refresh_token", data.refresh_token);
      navigate("/");
      // toast.success("Successfully sign in");
    },
  });
  return { loginMutation, isPending };
};
