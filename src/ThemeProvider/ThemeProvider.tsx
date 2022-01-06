import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export interface ThemeContextData {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggle: () => void;
}

const Context = createContext<ThemeContextData | undefined>(undefined);

const noop = () => {};

export interface ThemeProviderProps {
  /** The initial theme mode. */
  initialMode?: PaletteMode;
  /** Your application component. */
  children: ReactNode;
  /** Called when the theme mode is changed. Passed the new mode ("light" or "dark") */
  onChangeMode?: (mode: PaletteMode) => void;
}

/**
 * Theme provider for MUI apps.
 */
const ThemeProvider = ({
  children,
  initialMode = "light",
  onChangeMode = noop,
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  useEffect(() => void onChangeMode(mode), [mode, onChangeMode]);
  const value: ThemeContextData = useMemo(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((type) => (type === "light" ? "dark" : "light")),
    }),
    [mode, setMode]
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#2E79B2" : "#87E6FF",
          },
          secondary: {
            main: mode === "light" ? "#3C576B" : "#98EBD3",
          },
          background: {
            default: mode === "light" ? "#eee" : "#303030",
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
          },
          MuiTextField: {
            defaultProps: {
              fullWidth: true,
            },
          },
          MuiUseMediaQuery: {
            defaultProps: {
              noSsr: true,
            },
          },
        },
      }),
    [mode]
  );

  return (
    <Context.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </Context.Provider>
  );
};

/**
 * Hook used to access the theme mode.
 *
 * Returns an object containing `mode` and `setMode` properties.
 */
function useThemeMode() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useThemeMode };
