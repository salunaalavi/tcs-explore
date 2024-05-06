import { axiosInstance } from "@/lib";
import { TUpdateArticleRequest, TUpdateArticleResponse } from "../types";

export const updateArticle = (
  articleSlug: string,
  args: TUpdateArticleRequest,
) => {
  return axiosInstance.put<TUpdateArticleResponse>(`/articles/${articleSlug}`, {
    article: args,
  });
};
