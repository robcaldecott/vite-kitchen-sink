import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Error from "@mui/icons-material/Error";

interface ErrorMessageProps {
  error: Response | null;
  action?: ReactNode | undefined;
}

function ErrorMessage({ error, action }: ErrorMessageProps) {
  return (
    <Paper sx={{ padding: 4 }}>
      <Stack spacing={2} direction="column" alignItems="center">
        <Error color="error" sx={{ fontSize: 64 }} />

        <Typography variant="h5" component="h2" align="center">
          <FormattedMessage
            defaultMessage="Something went wrong!"
            description="The error message"
          />
        </Typography>

        {error && (
          <Typography variant="body1" align="center" color="textSecondary">
            {`${error.status}: ${error.statusText}`}
          </Typography>
        )}

        {action}
      </Stack>
    </Paper>
  );
}

export { ErrorMessage };
