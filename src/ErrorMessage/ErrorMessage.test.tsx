import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./ErrorMessage.stories";

const { WithoutAction, WithAction } = composeStories(stories);

it("renders without an action", () => {
  render(<WithoutAction />);
  expect(
    screen.getByRole("heading", { name: /something went wrong!/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/500: an error occurred/i)).toBeInTheDocument();
});

it("renders with an action", async () => {
  render(<WithAction />);
  await userEvent.click(screen.getByRole("button", { name: /action/i }));
});
