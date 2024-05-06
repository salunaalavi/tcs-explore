export type TPageState = {
  tab: "personal-feed" | "global-feed" | "tag-feed";
  page: number;
  pickedTag: string | null;
};

export type TPickTag = { type: "PICK_TAG"; payload: string };
export type TPickGlobal = {
  type: "PICK_GLOBAL";
};
export type TPickPersonal = {
  type: "PICK_PERSONAL";
};
type TSetPage = {
  type: "SET_PAGE";
  payload: number;
};
export type TPageActions = TPickTag | TPickGlobal | TPickPersonal | TSetPage;
