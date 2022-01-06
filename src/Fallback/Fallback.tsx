import Box from "@mui/material/Box";
import { Logo } from "../Logo";

function Fallback() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Logo />
    </Box>
  );
}

export { Fallback };
