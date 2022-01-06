import { FormattedMessage } from "react-intl";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

interface AlertErrorProps {
  error: Response;
  onClick: () => void;
}

function AlertError({ error, onClick }: AlertErrorProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onClick}>
          <FormattedMessage
            defaultMessage="Close"
            description="Dismiss the error"
          />
        </Button>
      }
    >
      {`${error.status}: ${error.statusText}`}
    </Alert>
  );
}

export { AlertError };
