import { useState, useEffect } from "react";
import { useIntl, FormattedMessage, FormattedNumber } from "react-intl";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useVehicle, useDeleteVehicle, Vehicle } from "../queries";
import { AlertError } from "./AlertError";
import { DeleteDialog } from "./DeleteDialog";

function Loading() {
  const intl = useIntl();

  return (
    <>
      <Box marginBottom={2}>
        <Breadcrumbs>
          <Link component={RouterLink} to="/">
            <FormattedMessage
              defaultMessage="Home"
              description="Click to return to the home page"
            />
          </Link>
        </Breadcrumbs>
      </Box>

      <Card
        aria-label={intl.formatMessage({
          defaultMessage: "Loading vehicle",
          description:
            "Accessibility label when the vehicle details are loading",
        })}
      >
        <CardHeader title={<Skeleton />} subheader={<Skeleton />} />
        <Divider />
        <CardContent>
          {Array.from(Array(16).keys()).map((key) => (
            <Skeleton key={key} />
          ))}
        </CardContent>
      </Card>
    </>
  );
}

interface SuccessProps {
  data?: Vehicle;
}

function Success({ data }: SuccessProps) {
  const intl = useIntl();
  const [showDialog, setShowDialog] = useState(false);
  const { mutate, isError, error, reset } = useDeleteVehicle();
  const navigate = useNavigate();

  if (data === undefined) {
    return null;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <Box marginBottom={2}>
        <Breadcrumbs>
          <Link component={RouterLink} to="/">
            <FormattedMessage
              defaultMessage="Home"
              description="Click to return to the home page"
            />
          </Link>
          <Typography>{data.registrationNumber}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Vehicle details card */}
      <Card
        aria-label={intl.formatMessage({
          defaultMessage: "Vehicle details",
          description: "Accessibility label for the vehicle details card",
        })}
      >
        <CardHeader
          title={`${data.manufacturer} ${data.model} ${data.type}`}
          titleTypographyProps={{ noWrap: true }}
          subheader={data.registrationNumber}
          subheaderTypographyProps={{ noWrap: true }}
          sx={{ "& .MuiCardHeader-content": { minWidth: 0 } }}
        />
        <Divider />
        <CardContent>
          <Box
            component="dl"
            sx={{
              margin: 0,
              typography: "body1",
              "& dt": {
                fontWeight: "fontWeightMedium",
              },
              "& dd": {
                color: "text.secondary",
                marginLeft: 0,
                "&:not(:last-child)": {
                  marginBottom: 2,
                },
              },
            }}
          >
            <dt id="color">
              <FormattedMessage
                defaultMessage="Colour"
                description="Label for the vehicle colour"
              />
            </dt>
            <Box display="flex" alignItems="center" aria-labelledby="color">
              <Box
                component="span"
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  backgroundColor: data.color.replace(/ /g, ""),
                  border: 1,
                  borderColor: "divider",
                  display: "inline-block",
                  marginRight: 0.75,
                }}
              />
              <span>
                {data.color.charAt(0).toUpperCase() + data.color.slice(1)}
              </span>
            </Box>

            <dt id="fuel">
              <FormattedMessage
                defaultMessage="Fuel"
                description="Label for the vehicle fuel type"
              />
            </dt>
            <dd aria-labelledby="fuel">{data.fuel}</dd>

            <dt id="vin">
              <FormattedMessage
                defaultMessage="VIN"
                description="Label for the vehicle VIN"
              />
            </dt>
            <dd aria-labelledby="vin">{data.vin}</dd>

            <dt id="mileage">
              <FormattedMessage
                defaultMessage="Mileage"
                description="Label for the vehicle mileage"
              />
            </dt>
            <dd aria-labelledby="mileage">
              <FormattedNumber value={data.mileage} />
            </dd>

            <dt id="date">
              <FormattedMessage
                defaultMessage="Registration date"
                description="Label for the vehicle registration date"
              />
            </dt>
            {data.registrationDate && (
              <dd aria-labelledby="date">
                <FormattedMessage
                  defaultMessage="{date, date, full}"
                  values={{ date: new Date(data.registrationDate) }}
                  description="The vehicle registration date"
                />
              </dd>
            )}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          {isError ? (
            <AlertError error={error!} onClick={reset} />
          ) : (
            <Button
              color="error"
              startIcon={<DeleteOutline />}
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <FormattedMessage
                defaultMessage="Delete vehicle"
                description="Click to delete the vehicle"
              />
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Delete vehicle dialog */}
      <DeleteDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onDelete={() => {
          mutate(data.id, {
            onSuccess: () => {
              navigate(-1);
            },
            onSettled: () => {
              setShowDialog(false);
            },
          });
        }}
      />
    </>
  );
}

function Details() {
  // Reset scroll position to the top
  useEffect(() => void window.scrollTo(0, 0), []);
  const { vehicleId } = useParams();
  const { isLoading, isSuccess, isError, data, error } = useVehicle(vehicleId!);

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && <Success data={data} />}
      {isError && (
        <ErrorMessage
          error={error}
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<HomeOutlined />}
              component={RouterLink}
              to="/"
            >
              <FormattedMessage
                defaultMessage="Home"
                description="Click to return to the home page"
              />
            </Button>
          }
        />
      )}
    </>
  );
}

export { Details, AlertError, DeleteDialog };
