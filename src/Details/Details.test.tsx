import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Details.stories";

const { Success, LoadingError, DeleteError, HomeBreadcrumb } =
  composeStories(stories);

test("success", async () => {
  render(<Success />);
  expect(screen.getByLabelText(/loading vehicle/i)).toBeInTheDocument();
  // While loading we should have a "Home" breadcrumb
  const loadingBreadcrumbs = within(screen.getByRole("navigation"));
  expect(
    loadingBreadcrumbs.getByRole("link", { name: /home/i })
  ).toBeInTheDocument();
  // Wait for the user to load
  expect(await screen.findByLabelText(/vehicle details/i)).toBeInTheDocument();
  // We should have new breadcrumbs
  const breadcrumbs = within(screen.getByRole("navigation"));
  expect(breadcrumbs.getByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(breadcrumbs.getByText(/te52 hww/i)).toBeInTheDocument();
  // Get the card
  const card = within(screen.getByLabelText(/vehicle details/i));
  expect(card.getByText(/volkswagen explorer cargo van/i)).toBeInTheDocument();
  expect(card.getByText(/te52 hww/i)).toBeInTheDocument();
  // Check the colour
  expect(card.getByLabelText(/colour/i)).toHaveTextContent(/teal/i);
  // Check the fuel
  expect(card.getByLabelText(/fuel/i)).toHaveTextContent(/gasoline/i);
  // Check the VIN
  expect(card.getByLabelText(/vin/i)).toHaveTextContent(/1ustan9z5mnt86399/i);
  // Check the mileage
  expect(card.getByLabelText(/mileage/i)).toHaveTextContent(/70,609/i);
  // Check the registration date
  expect(card.getByLabelText(/registration date/i)).toHaveTextContent(
    /friday, july 8, 2005/i
  );
  // Check for a delete button
  expect(
    card.getByRole("button", { name: /delete vehicle/i })
  ).toBeInTheDocument();
});

test("loading error", async () => {
  render(<LoadingError />);
  expect(
    await screen.findByRole("heading", { name: /something went wrong!/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/500: internal server error/i)).toBeInTheDocument();
  // Click Home button
  userEvent.click(screen.getByRole("link", { name: /home/i }));
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
});

test("delete vehicle", async () => {
  render(<Success />);
  // Click on the Delete User button when it loads
  userEvent.click(
    await screen.findByRole("button", { name: /delete vehicle/i })
  );
  // Wait for the dialog to appear
  const dialog = within(
    await screen.findByRole("dialog", { name: /delete vehicle/i })
  );
  // Click the Delete button
  userEvent.click(dialog.getByRole("button", { name: /delete/i }));
  // We should end up on the home page
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
});

test("cancels the delete dialog", async () => {
  render(<Success />);
  // Click on the Delete User button when it loads
  userEvent.click(
    await screen.findByRole("button", { name: /delete vehicle/i })
  );
  // Wait for the dialog to appear
  const dialog = within(
    await screen.findByRole("dialog", { name: /delete vehicle/i })
  );
  // Click the Cancel button
  userEvent.click(dialog.getByRole("button", { name: /cancel/i }));
  // Wait for the dialog to close
  await waitForElementToBeRemoved(() =>
    screen.queryByRole("dialog", { name: /delete vehicle/i })
  );
});

test("delete vehicle error", async () => {
  const { container } = render(<DeleteError />);
  await DeleteError.play({ canvasElement: container });
  // An error should display
  expect(
    await screen.findByText(/500: internal server error/i)
  ).toBeInTheDocument();
});

test("clear delete error", async () => {
  const { container } = render(<DeleteError />);
  await DeleteError.play({ canvasElement: container });
  // Clear the error
  userEvent.click(await screen.findByRole("button", { name: /close/i }));
  // Wait for the error to disappear
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/500: internal server error/i)
  );
  // The delete button should be back!
  expect(
    screen.getByRole("button", { name: /delete vehicle/i })
  ).toBeInTheDocument();
});

test("home breadcrumb", async () => {
  const { container } = render(<HomeBreadcrumb />);
  await HomeBreadcrumb.play({ canvasElement: container });
});
