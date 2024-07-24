import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncateText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 255 characters", () => {
    const text = "Short Text";
    render(<ExpandableText text={text} />);

    const artical = screen.getByRole("article");
    expect(artical).toBeInTheDocument();
    expect(artical).toHaveTextContent(text);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });

  it("should truncate text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    const artical = screen.getByRole("article");
    expect(artical).not.toHaveTextContent(longText);

    // OR

    expect(screen.getByText(truncateText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveAccessibleName(/more/i);
  });

  it("should expand text when Show More button is clicked.", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const artical = screen.getByRole("article");
    expect(artical).toHaveTextContent(longText);
    expect(button).toHaveAccessibleName(/less/i);
  });

  it("should collapse text when Show Less button is clicked.", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    const artical = screen.getByRole("article");
    expect(artical).toHaveTextContent(truncateText);
    expect(showLessButton).toHaveAccessibleName(/more/i);
  });
});
