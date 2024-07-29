import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

// Test Suite
describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      user: userEvent.setup(),
      getOptions: () => screen.findAllByRole("option"),
      onChange,
      getOption: (label: RegExp) => screen.getByRole("option", { name: label }),
    };
  };

  it("should render New as the default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { trigger, user, getOptions } = renderComponent();
    await user.click(trigger);
    const options = await getOptions();

    expect(options).toHaveLength(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onChange with processed when the Processed option is selected",
    async ({ label, value }) => {
      const { user, trigger, onChange, getOption } = renderComponent();
      await user.click(trigger);

      const option = getOption(label);
      await user.click(option);

      expect(onChange).toBeCalledWith(value);
    }
  );

  it("should call onChange with 'New' when the New option is selected", async () => {
    const { user, trigger, onChange, getOption } = renderComponent();
    await user.click(trigger);

    const option = getOption(/processed/i);
    await user.click(option);

    await user.click(trigger);
    const newOption = getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toBeCalledWith("new");
  });
});
