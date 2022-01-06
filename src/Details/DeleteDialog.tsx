import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteDialog({ open, onClose, onDelete }: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        <FormattedMessage
          defaultMessage="Delete vehicle"
          description="Title for the Delete Vehicle dialog"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          <FormattedMessage
            defaultMessage="Are you really sure you want to delete this vehicle?"
            description="Prompt for the Delete Vehicle dialog"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          <FormattedMessage
            defaultMessage="Cancel"
            description="Cancel the dialog"
          />
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutline />}
          onClick={onDelete}
        >
          <FormattedMessage
            defaultMessage="Delete"
            description="Delete the vehicle"
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DeleteDialog };
