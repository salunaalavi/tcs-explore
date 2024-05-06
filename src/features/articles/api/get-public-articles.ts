import useSWR from "swr";
import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "@/lib";
import {
  TGetPublicArticlesResponse,
  TGetPublicArticlesRequest,
  TUsePublicArticlesRequest,
} from "../types";
import {
  preProcessGetPublicArgs,
  preProcessUsePublicArticlesArgs,
} from "../util";

export const getPublicArticles = (args: TGetPublicArticlesRequest) => {
  const { page, pageSize } = preProcessGetPublicArgs(args);

  return axiosInstance.get<TGetPublicArticlesResponse>("/articles", {
    params: { limit: pageSize, offset: (page - 1) * pageSize },
  });
};

export type TUsePublicArticlesReturnVal = {
  articles: TGetPublicArticlesResponse["articles"];
  articlesCount: number | null;
  errorMessage: string | null;
  isLoading: boolean;
  isValidating: boolean;
  refetch: () => void;
};

export const usePublicArticles = (
  args: TUsePublicArticlesRequest,
): TUsePublicArticlesReturnVal => {
  const { page, pageSize, tag } = preProcessUsePublicArticlesArgs(args);

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    AxiosResponse<TGetPublicArticlesResponse>,
    AxiosError
  >(
    args.shouldFetch
      ? {
          url: "/articles",
          params: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            ...(tag ? { tag } : {}),
          },
        }
      : null,
    {
      onSuccess: (data) => {
        if (args.onSuccess) {
          args.onSuccess(data.data.articles, data.data.articlesCount);
        }
      },
    },
  );

  return {
    articles: data?.data.articles ?? [],
    articlesCount: data?.data.articlesCount ?? null,
    errorMessage: error
      ? error?.message ?? "Gagal mendapat artikel. Tolong coba lagi nanti"
      : null,
    isLoading,
    isValidating,
    refetch: () => mutate(),
  };
};
