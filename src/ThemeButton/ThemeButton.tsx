import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Brightness3 from "@mui/icons-material/Brightness3";
import WbSunny from "@mui/icons-material/WbSunny";
import { yellow, lightBlue } from "@mui/material/colors";
import { useThemeMode } from "../ThemeProvider";

export interface ThemeButtonProps
  extends Omit<IconButtonProps, "children" | "LinkComponent"> {
  /**
   * The button label. Used for the tooltip and accessibility.
   * Override this with a suitable translation if necessary.
   */
  label: string;
}

/**
 * An icon button that can be used to toggle between
 * light and dark modes. You can use this icon in your
 * app header in conjunction with the `ThemeProvider`
 * component.
 *
 * This component must be a descendant of both `ThemeProvider`
 * and `IntlProvider` in order to operate correctly.
 *
 * Note that other props will be passed to the underlying
 * `IconButton` component.
 */
const ThemeButton = ({ label, ...props }: ThemeButtonProps) => {
  const { mode, toggle } = useThemeMode();
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      title={label}
      open={open}
      // Use a controlled tooltip so we can
      // ensure it hides when the button is
      // clicked. This addresses a potential
      // issue in the Global Header that could
      // leave the tooltip open.
      disableHoverListener
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <IconButton
        color="inherit"
        onClick={() => {
          setOpen(false);
          toggle();
        }}
        aria-label={label}
        size="large"
        {...props}
      >
        {mode === "light" ? (
          <Brightness3 sx={{ color: lightBlue["100"] }} />
        ) : (
          <WbSunny sx={{ color: yellow["A200"] }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export { ThemeButton };
