import useSWR from "swr";
import { axiosInstance } from "@/lib";
import {
  TGetPublicArticleRequest,
  TGetPublicArticleResponse,
  TUsePublicArticleRequest,
} from "../types";
import { AxiosError, AxiosResponse } from "axios";

export const getPublicArticle = ({ articleSlug }: TGetPublicArticleRequest) => {
  return axiosInstance.get<TGetPublicArticleResponse>(
    `/articles/${articleSlug}`,
  );
};

export type TUsePublicArticleReturnVal = {
  article: TGetPublicArticleResponse["article"] | null;
  errorMessage: string | null;
  isLoading: boolean;
  isValidating: boolean;
  refetch: () => void;
};

export const usePublicArticle = (
  args: TUsePublicArticleRequest,
): TUsePublicArticleReturnVal => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    AxiosResponse<TGetPublicArticleResponse>,
    AxiosError
  >(
    args.shouldFetch
      ? {
          url: `/articles/${args.articleSlug}`,
        }
      : null,
  );

  return {
    article: data?.data.article ?? null,
    errorMessage: error
      ? error?.message ?? "Gagal mendapat artikel. Tolong coba lagi nanti"
      : null,
    isLoading,
    isValidating,
    refetch: () => mutate(),
  };
};
