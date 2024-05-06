import { TArticleFormValues, TCreateArticleRequest } from "@/features/articles";

export const formValuesToPayload = (
  values: TArticleFormValues,
): TCreateArticleRequest => {
  return {
    body: values.body,
    title: values.title,
    ...(values.description ? { description: values.description } : {}),
    ...(values.tagList ? { tagList: values.tagList.split(",") } : {}),
  };
};
