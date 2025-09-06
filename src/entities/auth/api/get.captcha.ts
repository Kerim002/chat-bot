import { BASE_URL } from "@/shared/config";
import { AUTH_ENDPOINT } from "@/shared/constants/endpoints";

export const getCaptcha = async () => {
  const response = await fetch(`${BASE_URL}${AUTH_ENDPOINT}/captcha`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "User-Agent": "GPT-Login-App/1.0",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }

  const captchaId = response.headers.get("x-captcha-id");

  if (!captchaId) {
    throw new Error("captchaNotFound");
  }

  const imageBlob = await response.blob();
  const imageUrl = URL.createObjectURL(imageBlob);

  return { imageUrl, captchaId };
};
