import { ParsedUrlQuery } from "querystring";
import { validatePageParam } from "./utils";

describe("utils", () => {
  describe("validatePageParam", () => {
    it("should validate valid query param", () => {
      expect(validatePageParam({ page: "1" } as ParsedUrlQuery)).toEqual({
        page: 1,
        isQueryParamInvalid: false,
      });
    });

    it("should in validate query param - 0 page", () => {
      expect(validatePageParam({ page: "0" } as ParsedUrlQuery)).toEqual({
        page: null,
        isQueryParamInvalid: true,
      });
    });

    it("should in validate query param - not a number page", () => {
      expect(
        validatePageParam({
          page: "a sentence is not valid page",
        } as ParsedUrlQuery),
      ).toEqual({
        page: null,
        isQueryParamInvalid: true,
      });
    });
  });
});
