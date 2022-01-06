import { Suspense, lazy } from "react";
import { FormattedMessage } from "react-intl";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AppHeader } from "../AppHeader";
import { Fallback } from "../Fallback";
import { FilterProvider } from "../FilterProvider";

const Vehicles = lazy(() => import("../Vehicles"));
const Details = lazy(() => import("../Details"));
const Create = lazy(() => import("../Create"));

function App() {
  return (
    <>
      <AppHeader
        title={
          <FormattedMessage
            defaultMessage="Vehicle Manager"
            description="The app title"
          />
        }
      />

      <FilterProvider>
        <Box component="main" padding={2}>
          <Container maxWidth="lg" disableGutters>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route path="/" element={<Vehicles />} />
                <Route path="/vehicles/:vehicleId" element={<Details />} />
                <Route path="/create" element={<Create />} />
              </Routes>
            </Suspense>
          </Container>
        </Box>
      </FilterProvider>
    </>
  );
}

export { App };
