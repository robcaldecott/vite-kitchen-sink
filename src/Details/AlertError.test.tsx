import { fn } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./AlertError.stories";

const { Default } = composeStories(stories);

it("renders", () => {
  const onClose = fn();
  render(<Default onClick={onClose} />);
  expect(screen.getByText(/500: internal server error/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /close/i }));
  expect(onClose).toHaveBeenCalled();
});
