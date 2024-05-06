import { TArticle } from "@/features/articles";

export type TArticlesPage = {
  serverSidePage: number;
  serverSideArticles: TArticle[];
  serverSideArticlesCount: number;
};

export type TPageState = {
  clientSidePage: number;
  pickedTag: string | null;
};

export type TPickTag = { type: "pickTag"; payload: string };
export type TPickGlobal = {
  type: "PICK_GLOBAL";
};
type TNextPage = {
  type: "NEXT_PAGE";
};
type TPrevPage = {
  type: "PREV_PAGE";
};
export type TPageActions = TPickTag | TPickGlobal | TNextPage | TPrevPage;
