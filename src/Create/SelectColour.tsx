import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import { FieldProps } from "formik";
import { fieldToTextField } from "formik-mui";
import { colors } from "../mocks/vehicles";

interface SelectColourProps
  extends Omit<
    TextFieldProps,
    "select" | "InputLabelProps" | "sx" | "children"
  > {}

function SelectColour({ disabled, ...props }: SelectColourProps) {
  return (
    <TextField
      {...props}
      select
      InputLabelProps={{ required: true }}
      sx={{
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
      }}
      disabled={disabled}
    >
      {colors().map((color) => (
        <MenuItem key={color} value={color}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Box
              height={16}
              width={16}
              borderRadius="50%"
              bgcolor={(theme) =>
                disabled
                  ? theme.palette.mode === "light"
                    ? theme.palette.grey["300"]
                    : theme.palette.grey["800"]
                  : color.replace(/ /g, "")
              }
              border={1}
              borderColor="divider"
            />
          </ListItemIcon>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </MenuItem>
      ))}
    </TextField>
  );
}

// Formik-aware wrapper
function SelectColourField(props: FieldProps & SelectColourProps) {
  return <SelectColour {...fieldToTextField(props)} />;
}

export { SelectColour, SelectColourField };
