import { axiosInstance } from "@/lib";

export const deleteArticle = (articleSlug: string) => {
  return axiosInstance.delete(`/articles/${articleSlug}`);
};
