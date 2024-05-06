import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArticleCard } from ".";
import { requiredArgs } from "./ArticleCard.mock";

describe("ArticleCard", () => {
  it("should not have unexpected changes", () => {
    const tree = renderer.create(<ArticleCard {...requiredArgs} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render all static information", () => {
    render(<ArticleCard {...requiredArgs} />);

    expect(screen.getByText(requiredArgs.articleTitle)).toBeInTheDocument();
    expect(
      screen.getByText(requiredArgs.articleDescription),
    ).toBeInTheDocument();
    expect(screen.getByText(requiredArgs.numOfLikes)).toBeInTheDocument();
  });

  it.each(requiredArgs.tags as string[])("should render all tags", (tag) => {
    render(<ArticleCard {...requiredArgs} />);

    expect(screen.getByText(tag)).toBeInTheDocument();
  });

  it("should render a more info link", () => {
    render(<ArticleCard {...requiredArgs} />);

    expect(screen.getByText(/selengkapnya.../i)).toBeInTheDocument();
  });

  it("has click listener on click like", async () => {
    const mockClickHandler = jest.fn();
    render(<ArticleCard {...requiredArgs} onClickLike={mockClickHandler} />);

    expect(mockClickHandler).toBeCalledTimes(0);

    const user = userEvent.setup();
    await user.click(screen.getByTestId("like-button"));

    expect(mockClickHandler).toBeCalledTimes(1);
  });
});
