import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

// Test Suite
describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    return {
      button: screen.getByRole("combobox"),
      user: userEvent.setup(),
    };
  };

  it("should render New as the default value", () => {
    // Arrange

    // Act
    const { button } = renderOrderStatusSelector();

    // Assert
    expect(button).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    // Arrange

    // Act
    const { button, user } = renderOrderStatusSelector();
    await user.click(button);

    // Act
    const options = await screen.findAllByRole("option");
    // Assert
    expect(options).toHaveLength(3);

    // Act
    const labels = options.map((option) => option.textContent);
    // Assert
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });
});
