import { ParsedUrlQuery } from "querystring";

export const isPageParamValid = (page: number) => page === 0 || isNaN(page);
export const validatePageParam = (queryParam: ParsedUrlQuery | undefined) => {
  const page = Number(queryParam?.page);

  return {
    page: isPageParamValid(page) ? null : page,
    isQueryParamInvalid: page === 0 || isNaN(page),
  };
};
