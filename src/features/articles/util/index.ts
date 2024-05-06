import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../config";
import {
  TGetPublicArticlesRequest,
  TUsePersonalFeedRequest,
  TUsePublicArticlesRequest,
} from "../types";

export const preProcessGetPublicArgs = (args: TGetPublicArticlesRequest) => {
  return {
    page: args.page ?? DEFAULT_PAGE,
    pageSize: args.pageSize ?? DEFAULT_PAGE_SIZE,
  };
};

export const preProcessUsePublicArticlesArgs = (
  args: TUsePublicArticlesRequest,
) => {
  return {
    page: args.page ?? DEFAULT_PAGE,
    pageSize: args.pageSize ?? DEFAULT_PAGE_SIZE,
    tag: args.tag ?? "",
  };
};

export const preProcessUsePersonalFeedArgs = (
  args: TUsePersonalFeedRequest,
) => {
  return {
    page: args.page ?? DEFAULT_PAGE,
    pageSize: args.pageSize ?? DEFAULT_PAGE_SIZE,
  };
};
