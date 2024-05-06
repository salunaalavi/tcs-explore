import {
  TArticleForm,
  TArticleFormValues,
  TUpdateArticleRequest,
  TUsePublicArticleReturnVal,
} from "@/features/articles";

export const queryResponseToFormValues = (
  query: TUsePublicArticleReturnVal,
): TArticleForm["initialValues"] => {
  const { article } = query;

  if (article === null) return {};

  return {
    body: article.body,
    description: article.description,
    tagList: article.tagList.length === 0 ? "" : article.tagList.join(","),
    title: article.title,
  };
};

export const formValuesToPayload = ({
  tagList,
  ...otherValues
}: Partial<TArticleFormValues>): TUpdateArticleRequest => {
  return {
    ...(tagList ? { tagList: tagList.split(",") } : {}),
    ...otherValues,
  };
};
