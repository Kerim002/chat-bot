import { getCookie, setCookie } from "../lib/cookies";
import { API_VERSION, BASE_URL } from "../config";
import { AUTH_ENDPOINT } from "../constants/endpoints";

class ApiError extends Error {
  public response: Response;

  constructor(response: Response) {
    super("ApiError:" + response.status + "\n" + response.statusText);
    this.response = response;
  }
}

export const handleApiError = async (error: unknown) => {
  if (error instanceof ApiError) {
    try {
      const errorData = (await error.response.json()) as {
        loc: string[];
        msg: string;
        type: string;
      };
      return errorData;
    } catch {
      return { loc: [], msg: "unknown", type: "unknown" };
    }
  } else {
    return { loc: [], msg: "unknown", type: "unknown" };
  }
};

const cleanParams = (
  params: Record<string, unknown>
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

// Function to refresh access token
const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getCookie("refresh_token");

  const res = await fetch(`${BASE_URL}${AUTH_ENDPOINT}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    setCookie("access_token", data.access_token, 1);
    setCookie("refresh_token", data.refresh_token, 7);
    return true;
  } else {
    window.location.href = "/sign-in";
    sessionStorage.setItem("LAST_PATH", window.location.pathname);
    return false;
  }
};

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & {
    json?: unknown;
    params?: Record<string, unknown>;
    retry?: boolean;
  }
): Promise<T> => {
  let headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string>),
  };

  if (init?.json) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(
      cleanParams(init.json as Record<string, unknown>)
    );
  }

  if (init?.params) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = cleanParams(init.params) as any;
    const searchParams = new URLSearchParams(params);
    url = `${url}${searchParams.toString() && "?" + searchParams.toString()}`;
  }

  const locale = getCookie("i18next") || "en";

  const token = getCookie("access_token");

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      "Accept-Language": locale,
      ...headers,
    };
  }

  const fullUrl = `${BASE_URL}${url.replace("v_ver", API_VERSION ?? "v0")}`;

  const result = await fetch(fullUrl, {
    ...init,
    headers,
  });

  if (
    (result.status === 401 && init?.retry !== false) ||
    result.status === 403
  ) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return jsonApiInstance<T>(url, { ...init, retry: false });
    } else {
      // Already redirected inside refreshAccessToken

      return Promise.reject(new ApiError(result));
    }
  }

  if (!result.ok) {
    throw new ApiError(result);
  }

  try {
    const data = (await result.json()) as T;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    if (result.status === 204 || result.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return "success" as any;
    }
  }

  return Promise.reject(new Error("Unexpected API response"));
};
