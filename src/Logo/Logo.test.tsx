import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Logo.stories";

const { Default } = composeStories(stories);

it("renders", () => {
  render(<Default />);
  expect(screen.getByRole("img", { name: /vite logo/i })).toBeInTheDocument();
});
