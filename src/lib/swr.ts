import { axiosInstance } from "./axios";

type SWRArgs = string | { url: string; params: Record<string, unknown> };

export const swrFetcher = (args: SWRArgs) => {
  if (typeof args === "string") {
    return axiosInstance.get(args);
  } else {
    return axiosInstance.get(args.url, { params: args.params });
  }
};
