// utils/cookies.ts
import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, expires: number) => {
  Cookies.set(key, value, { expires: expires, path: "/" });
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const deleteAuthCookies = () => {
  Cookies.remove("refresh_token");
  Cookies.remove("access_token");
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
