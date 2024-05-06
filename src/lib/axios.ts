import axios, { AxiosError } from "axios";
import { IS_BROWSER } from "@/config";
import { IS_SERVER } from "swr/_internal";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notifications";

export const axiosInstance = axios.create({
  // if axios is called client side add /api to make Next's rewrites work
  // if axios is called server side then call API directly
  ...(IS_SERVER ? { baseURL: process.env.API_SOURCE } : { baseURL: "/api" }),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getShownMessage = (error: AxiosError) => {
  if (error.response?.status && error.response.status >= 500) {
    return "Terdeteksi kesalahan dalam sistem. Tolong coba lagi nanti";
  } else if (
    error.response?.status &&
    error.response.status < 500 &&
    error.response.status >= 400
  ) {
    return "Terdeteksi kesalahan dalam permintaan. Mohon diperiksa jika ada kesalahan dalam permintaan";
  } else {
    return "Tolong coba lagi nanti";
  }
};

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    // if error happens on server side then log the error on FE server
    // if error happens on client side then show notification
    if (IS_BROWSER) {
      if (error?.response?.status === 401) {
        useNotificationStore.getState().getInstance().error({
          message: "Gagal melakukan otentikasi",
          description: "Mohon melakukan login ulang",
        });

        useAuthStore.getState().resetUser();

        return;
      }

      useNotificationStore
        .getState()
        .getInstance()
        .error({
          message: "Terjadi kesalahan dalam memproses permintaan",
          description: getShownMessage(error),
        });
    } else if (IS_SERVER) {
      console.error("[axios-interceptors]: ", error);
    }

    return Promise.reject(error);
  },
);
