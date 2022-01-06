import { ReactNode, useEffect } from "react";
import { DecoratorFn } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { useDarkMode } from "storybook-dark-mode";
import { setIntlConfig, withIntl } from "storybook-addon-intl";
import { ThemeProvider, useThemeMode } from "../src/ThemeProvider";
import fi from "../src/i18n/fi.json";

// Disable `react-query` error logging
setLogger({
  error: () => {},
  log: (...params) => console.log(...params),
  warn: (...params) => console.warn(...params),
});

initialize({ onUnhandledRequest: "bypass" });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  darkMode: {
    stylePreview: true,
  },
  options: {
    storySort: {
      order: ["App"],
    },
  },
};

setIntlConfig({
  locales: ["en", "fi"],
  defaultLocale: "en",
  getMessages: (locale: string) => {
    return {
      fi,
    }[locale];
  },
});

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const dark = useDarkMode();
  const { setMode } = useThemeMode();
  useEffect(() => void setMode(dark ? "dark" : "light"), [dark, setMode]);
  return <>{children}</>;
};

export const decorators: DecoratorFn[] = [
  withIntl,
  mswDecorator,
  (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en">
          <ThemeProvider initialMode={useDarkMode() ? "dark" : "light"}>
            <ThemeWrapper>
              <Story />
            </ThemeWrapper>
          </ThemeProvider>
        </IntlProvider>
      </QueryClientProvider>
    );
  },
];
