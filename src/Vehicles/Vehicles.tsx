import { useState, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Refresh from "@mui/icons-material/Refresh";
import Info from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage";
import { useVehicles, Vehicle } from "../queries";
import { useFilter } from "../FilterProvider";
import { SearchField } from "./SearchField";
import { CreateFab } from "./CreateFab";

function Loading() {
  const intl = useIntl();

  return (
    <Paper
      aria-label={intl.formatMessage({
        defaultMessage: "Loading vehicles",
        description: "Accessibility label when the vehicle list is loading",
      })}
    >
      <Typography variant="h5" component="h1" padding={2}>
        <Skeleton />
      </Typography>
      <Divider />
      <List>
        {Array.from(Array(10).keys()).map((key, index, arr) => (
          <ListItem key={key} divider={index < arr.length - 1}>
            <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

function NoResults() {
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      paddingX={2}
      paddingY={4}
    >
      <Info
        sx={{
          fontSize: 64,
          color: (theme) =>
            theme.palette.mode === "light" ? "info.main" : "info.light",
        }}
      />
      <Typography variant="h5" component="h2" align="center">
        <FormattedMessage
          defaultMessage="No matching vehicles found."
          description="The search returned no matches"
        />
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary">
        <FormattedMessage
          defaultMessage="Please try a different filter."
          description="Hint that a different filter should be used"
        />
      </Typography>
    </Stack>
  );
}

function filterItems(data: Vehicle[], filter: string) {
  return data.filter((vehicle) => {
    if (filter === "") {
      return true;
    }
    const re = new RegExp(filter, "i");
    const description = `${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`;
    return description.search(re) !== -1;
  });
}

interface SuccessProps {
  data?: Vehicle[];
}

function Success({ data = [] }: SuccessProps) {
  const { filter, setFilter } = useFilter();
  const [items, setItems] = useState(filterItems(data, filter));
  useEffect(() => void setItems(filterItems(data, filter)), [filter, data]);

  return (
    <Paper>
      <Box padding={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm>
            <Badge
              badgeContent={items?.length}
              color="primary"
              sx={{ "& .MuiBadge-badge": { top: 16, right: -24 } }}
            >
              <Typography variant="h5" component="h1">
                <FormattedMessage
                  defaultMessage="Vehicles"
                  description="The title for the list of vehicles"
                />
              </Typography>
            </Badge>
          </Grid>

          <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
            <Divider flexItem />
          </Grid>

          <Grid item xs={12} sm="auto">
            <SearchField
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              onClear={() => setFilter("")}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      {items.length === 0 ? (
        <NoResults />
      ) : (
        <List>
          {items.map((vehicle, index, arr) => (
            <ListItemButton
              key={vehicle.id}
              divider={index < arr.length - 1}
              component={Link}
              to={`/vehicles/${vehicle.id}`}
            >
              <ListItemText
                primary={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.type} ${vehicle.fuel}`}
                primaryTypographyProps={{
                  noWrap: true,
                }}
                secondary={vehicle.registrationNumber}
                secondaryTypographyProps={{
                  noWrap: true,
                }}
              />
              <ChevronRight color="action" />
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}

function Vehicles() {
  const { isLoading, isSuccess, isError, data, error, refetch } = useVehicles();

  return (
    <>
      <Box marginBottom={12}>
        {isLoading && <Loading />}
        {isSuccess && <Success data={data} />}
        {isError && (
          <ErrorMessage
            error={error}
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<Refresh />}
                onClick={() => refetch()}
              >
                <FormattedMessage
                  defaultMessage="Try again"
                  description="Fetch the list of vehicles again"
                />
              </Button>
            }
          />
        )}
      </Box>

      <CreateFab />
    </>
  );
}

export { Vehicles };
