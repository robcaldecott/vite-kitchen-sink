import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./App.stories";

const { Home: App } = composeStories(stories);

it("renders the vehicles route", async () => {
  render(<App />);
  expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { name: /vehicles/i })
  ).toBeInTheDocument();
});

it("renders the details route", async () => {
  render(<App />);
  expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { name: /vehicles/i })
  ).toBeInTheDocument();
  // Select a user
  const list = within(screen.getByRole("list"));
  // Click on the first user
  userEvent.click(list.getAllByRole("link")[0]);
  // Wait for the page to load
  expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByLabelText(/vehicle details/i)).toBeInTheDocument();
});

it("renders the create route", async () => {
  render(<App />);
  expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument();
  userEvent.click(await screen.findByRole("link", { name: /create vehicle/i }));
  expect(
    await screen.findByRole("heading", { name: /create new vehicle/i })
  ).toBeInTheDocument();
});
