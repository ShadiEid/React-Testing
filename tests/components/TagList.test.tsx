import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  it("should render tags", async () => {
    render(<TagList />);

    // Exp 1

    // await waitFor(() => {
    //     const listItems = screen.getAllByRole('listitem');
    //     expect(listItems.length).toBeGreaterThan(0);
    // })

    // Exp 2

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
