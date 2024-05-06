import { axiosInstance } from "@/lib";
import { TCreateArticleRequest, TCreateArticleResponse } from "../types";

export const createArticle = (args: TCreateArticleRequest) => {
  return axiosInstance.post<TCreateArticleResponse>("/articles", {
    article: args,
  });
};
