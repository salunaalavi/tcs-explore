import { AxiosError, AxiosResponse } from "axios";
import { TUsePersonalFeedRequest, TUsePersonalFeedResponse } from "../types";
import useSWR from "swr";
import { preProcessUsePersonalFeedArgs } from "../util";

export type TUsePersonalFeedReturnVal = {
  articles: TUsePersonalFeedResponse["articles"];
  articlesCount: number | null;
  errorMessage: string | null;
  isLoading: boolean;
  isValidating: boolean;
  refetch: () => void;
};

export const usePersonalFeed = (args: TUsePersonalFeedRequest) => {
  const { page, pageSize } = preProcessUsePersonalFeedArgs(args);

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    AxiosResponse<TUsePersonalFeedResponse>,
    AxiosError
  >(
    args.shouldFetch
      ? {
          url: "/articles/feed",
          params: { limit: pageSize, offset: (page - 1) * pageSize },
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
