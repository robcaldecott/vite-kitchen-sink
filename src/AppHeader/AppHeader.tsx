import { ReactNode } from "react";
import { useIntl } from "react-intl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeButton } from "../ThemeButton";

interface AppHeaderProps {
  title: ReactNode;
}

function AppHeader({ title }: AppHeaderProps) {
  const intl = useIntl();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#3C576B",
        color: "common.white",
      }}
    >
      <Toolbar variant="dense">
        {/* App title */}
        <Typography variant="h6" color="inherit" flexGrow={1} noWrap>
          {title}
        </Typography>
        {/* Light/dark mode toggle */}
        <ThemeButton
          edge="end"
          label={intl.formatMessage({
            defaultMessage: "Toggle light/dark mode",
            description: "Switch between colour modes",
          })}
        />
      </Toolbar>
    </AppBar>
  );
}

export { AppHeader };
