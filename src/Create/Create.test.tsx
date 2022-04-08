import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Create.stories";

const { Filled, Empty, InvalidMileage, InvalidDate } = composeStories(stories);

it("creates a new user", async () => {
  const { container } = render(<Filled />);
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /create new vehicle/i })
  ).toBeInTheDocument();
  // Fill in the form
  await act(async () => {
    await Filled.play({ canvasElement: container });
  });

  // Submit the form
  await userEvent.click(screen.getByRole("button", { name: /create/i }));

  // Fields should be disabled
  expect(screen.getByRole("button", { name: /make/i })).toHaveAttribute(
    "aria-disabled",
    "true"
  );
  expect(screen.getByRole("textbox", { name: /model/i })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /variant/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /fuel/i })).toHaveAttribute(
    "aria-disabled",
    "true"
  );
  expect(screen.getByRole("button", { name: /colour/i })).toHaveAttribute(
    "aria-disabled",
    "true"
  );

  // Buttons should be disabled
  expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /reset/i })).toBeDisabled();
  expect(
    screen.getByRole("textbox", { name: /registration number/i })
  ).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /vin/i })).toBeDisabled();
  expect(screen.getByRole("textbox", { name: /mileage/i })).toBeDisabled();
  expect(
    screen.getByRole("textbox", { name: /registration date/i })
  ).toBeDisabled();

  // Home page should load
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
}, 60000);

it("validates the fields", async () => {
  render(<Empty />);
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.click(screen.getByRole("button", { name: /create/i }));
  });
  // Check the validation messages
  expect(screen.getByText(/please select a make/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter the model/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter the variant/i)).toBeInTheDocument();
  expect(screen.getByText(/please select a fuel type/i)).toBeInTheDocument();
  expect(screen.getByText(/please select a colour/i)).toBeInTheDocument();
  expect(
    screen.getByText(/please enter the registration number/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/please enter the vin/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter the mileage/i)).toBeInTheDocument();
  expect(
    screen.getByText(/please enter the registration date/i)
  ).toBeInTheDocument();
});

it("resets the form", async () => {
  const { container } = render(<Filled />);
  // Fill in the form
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await Filled.play({ canvasElement: container });
    await userEvent.click(screen.getByRole("button", { name: /reset/i }));
  });
  // Check fields
  expect(
    screen.queryByRole("button", { name: /audi/i })
  ).not.toBeInTheDocument();
  expect(screen.getByLabelText(/model/i)).toHaveValue("");
  expect(screen.getByLabelText(/variant/i)).toHaveValue("");
  expect(
    screen.queryByRole("button", { name: /electric/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /black/i })
  ).not.toBeInTheDocument();
  expect(screen.getByLabelText(/registration number/i)).toHaveValue("");
  expect(screen.getByLabelText(/vin/i)).toHaveValue("");
  expect(screen.getByLabelText(/mileage/i)).toHaveValue("");
  expect(screen.getByLabelText(/registration date/i)).toHaveValue("");
}, 60000);

it("cancels the form", async () => {
  render(<Empty />);
  await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
});

it("handles the breadcrumbs", async () => {
  render(<Empty />);
  await userEvent.click(screen.getByRole("link", { name: /home/i }));
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
});

it("validates the mileage", async () => {
  const { container } = render(<InvalidMileage />);
  await act(async () => {
    await InvalidMileage.play({ canvasElement: container });
  });
});

it("validates the registration date", async () => {
  const { container } = render(<InvalidDate />);
  await act(async () => {
    await InvalidDate.play({ canvasElement: container });
  });
  expect(
    screen.getByText(/please enter a valid registration date/i)
  ).toBeInTheDocument();
});
