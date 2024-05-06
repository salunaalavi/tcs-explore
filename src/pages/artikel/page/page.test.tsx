import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  mockArticlesByTagIpsum,
  mockPublicArticles,
  usePublicArticles,
} from "@/features/articles";
import { useTags } from "@/features/tags";
import ArticlesPage from "./[page].page";
import { TArticlesPage } from "./types";
import { mockTags } from "@/features/tags";

const requiredProps: TArticlesPage = {
  serverSideArticles: mockPublicArticles,
  serverSideArticlesCount: 197,
  serverSidePage: 1,
};

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@/features/tags", () => ({
  __esModule: true,
  ...jest.requireActual("@/features/tags"),
  useTags: jest.fn().mockImplementation(() => ({
    tags: null,
    isLoading: true,
  })),
}));
jest.mock("@/features/articles", () => ({
  __esModule: true,
  ...jest.requireActual("@/features/articles"),
  usePublicArticles: jest.fn().mockImplementation(() => ({
    articlesCount: null,
    isLoading: false,
    articles: [],
  })),
}));

const mockedUseTags = jest.mocked(useTags) as jest.Mock;
const mockedUsePublicArticles = jest.mocked(usePublicArticles) as jest.Mock;
const setup = () => {
  const { container, rerender } = render(<ArticlesPage {...requiredProps} />);

  return {
    container,
    rerender,
  };
};
describe("Articles Page", () => {
  beforeEach(() => {
    jest.mock("@/features/tags", () => ({
      __esModule: true,
      ...jest.requireActual("@/features/tags"),
      useTags: jest.fn().mockImplementation(() => ({
        tags: null,
        isLoading: true,
      })),
    }));
    jest.mock("@/features/articles", () => ({
      __esModule: true,
      ...jest.requireActual("@/features/articles"),
      usePublicArticles: jest.fn().mockImplementation(() => ({
        articlesCount: null,
        isLoading: false,
        articles: [],
      })),
    }));
  });
  it("should not have unexpected code change", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should have title and description", () => {
    setup();

    screen.findByRole("heading", { name: /conduit/i });
    screen.getByText(/tempat untuk berbagi ilmu dan bertukar pikiran/i);
  });

  it("should have only the global article tab initially visible", () => {
    setup();

    expect(screen.getAllByRole("tab").length).toBe(1);
    expect(screen.getByRole("tab", { name: "Feed Artikel Global" }))
      .toBeInTheDocument;
  });

  it.todo("should show tags loading skeleton initially");

  describe("filter by tag", () => {
    it("clicking tag should show a new article tab", async () => {
      const { rerender } = setup();
      mockedUseTags.mockImplementationOnce(() => ({
        tags: { tags: mockTags },
        isLoading: false,
      }));

      rerender(<ArticlesPage {...requiredProps} />);

      const popularTags = screen.getByTestId("popular-tags");
      expect(popularTags).toBeInTheDocument();
      expect(screen.getByText("Popular Tags")).toBeInTheDocument();

      const user = userEvent.setup();

      await user.click(within(popularTags).getByText("ipsum"));

      expect(await screen.findAllByRole("tab")).toHaveLength(2);
      expect(await screen.findByRole("tab", { name: "#ipsum" }));
    });
    it("clicking tag should show a loading skeleton", async () => {
      const { rerender } = setup();
      mockedUseTags.mockImplementationOnce(() => ({
        tags: { tags: mockTags },
        isLoading: false,
      }));

      rerender(<ArticlesPage {...requiredProps} />);

      const popularTags = screen.getByTestId("popular-tags");
      expect(popularTags).toBeInTheDocument();
      expect(screen.getByText("Popular Tags")).toBeInTheDocument();

      const user = userEvent.setup();

      await user.click(within(popularTags).getByText("ipsum"));

      mockedUsePublicArticles.mockImplementation(() => ({
        articlesCount: 13,
        isLoading: true,
        articles: [],
      }));

      expect(await screen.findByTestId("tag-feed-loading")).toBeInTheDocument();
    });
    it.todo("clicking pagination should show next page");
    it.todo(
      "clicking global article tab should make tag article tab disappear",
    );
  });

  describe("global feed pagination", () => {
    it.todo("clicking pagination should show next page");
  });
});
