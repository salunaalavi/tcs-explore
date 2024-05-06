import useSWR from "swr";
import { axiosInstance } from "@/lib";
import { TGetTagsResponse } from "../types";
import { AxiosError, AxiosResponse } from "axios";

export const getTags = () => {
  return axiosInstance.get<TGetTagsResponse>("/tags");
};

export const useTags = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    AxiosResponse<TGetTagsResponse>,
    AxiosError
  >("/tags");

  return {
    tags: data?.data ?? null,
    errorMessage: error
      ? error?.message ?? "Gagal mendapatkan tags. Tolong coba lagi nanti"
      : null,
    isLoading,
    isValidating,
    refetch: () => mutate(),
  };
};
