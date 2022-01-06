import { render, screen, within } from "@testing-library/react";
// import { AppHeader as Default } from "./AppHeader";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./AppHeader.stories";

const { Default } = composeStories(stories);

it("renders", () => {
  render(<Default title="Application Title" />);
  const header = within(screen.getByRole("banner"));
  expect(
    header.getByRole("heading", { name: /application title/i })
  ).toBeInTheDocument();
  expect(
    header.getByRole("button", { name: /toggle light\/dark mode/i })
  ).toBeInTheDocument();
});
