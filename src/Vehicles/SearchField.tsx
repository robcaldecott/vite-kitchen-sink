import { ChangeEvent } from "react";
import { useIntl } from "react-intl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function SearchField({ value, onChange, onClear }: SearchFieldProps) {
  const intl = useIntl();

  return (
    <TextField
      size="small"
      fullWidth
      placeholder={intl.formatMessage({
        defaultMessage: "Search",
        description: "Label for the search field",
      })}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              disabled={value === ""}
              onClick={onClear}
              aria-label={intl.formatMessage({
                defaultMessage: "Clear",
                description: "Clear the search",
              })}
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
        style: { borderRadius: 18 },
      }}
      value={value}
      onChange={onChange}
    />
  );
}

export { SearchField };
