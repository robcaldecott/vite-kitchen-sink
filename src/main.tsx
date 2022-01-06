import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./ThemeProvider";
import { App } from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import("./mocks/browser").then(({ worker }) => {
  worker.start({ onUnhandledRequest: "bypass" });
  // Create the react-query client
  const queryClient = new QueryClient();
  // Render the app
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en-GB" defaultLocale="en-GB">
          <Router>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </Router>
        </IntlProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
