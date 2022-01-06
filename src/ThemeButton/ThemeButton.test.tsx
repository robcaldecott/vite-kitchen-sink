import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { ThemeProvider, useThemeMode } from "../ThemeProvider";
import { ThemeButton } from ".";

it("renders", () => {
  const Component = () => {
    const { mode } = useThemeMode();
    return (
      <>
        <ThemeButton label="Toggle theme" />
        <div>Current mode: {mode}</div>
      </>
    );
  };
  render(
    <IntlProvider locale="en">
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(screen.getByText(/current mode: light/i)).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
  expect(screen.getByText(/current mode: dark/i)).toBeInTheDocument();
});
