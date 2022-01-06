import { useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, FormikErrors } from "formik";
import { TextField } from "formik-mui";
import { DesktopDatePicker } from "formik-mui-lab";
import { useCreateVehicle, VehiclePayload } from "../queries";
import { manufacturers, fuelTypes } from "../mocks/vehicles";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/fi";
import { SelectColourField } from "./SelectColour";

interface Values extends Omit<VehiclePayload, "mileage" | "registrationDate"> {
  mileage: string;
  registrationDate: dayjs.Dayjs | null;
}

function Create() {
  const intl = useIntl();
  const { mutate } = useCreateVehicle();
  const navigate = useNavigate();
  useEffect(() => {
    dayjs.extend(utc);
  }, []);

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

      <Paper>
        <Typography variant="h5" padding={2}>
          <FormattedMessage
            defaultMessage="Create new vehicle"
            description="Title for the Create Vehicle form"
          />
        </Typography>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={intl.locale}>
          <Formik
            initialValues={
              {
                manufacturer: "",
                model: "",
                type: "",
                fuel: "",
                registrationNumber: "",
                vin: "",
                color: "",
                mileage: "",
                registrationDate: null,
              } as Values
            }
            validate={(values) => {
              let errors: FormikErrors<Values> = {};

              if (values.manufacturer === "") {
                errors.manufacturer = intl.formatMessage({
                  defaultMessage: "Please select a make",
                  description: "Error if no make is selected",
                });
              }
              if (values.model === "") {
                errors.model = intl.formatMessage({
                  defaultMessage: "Please enter the model",
                  description: "Error if no model is entered",
                });
              }
              if (values.type === "") {
                errors.type = intl.formatMessage({
                  defaultMessage: "Please enter the variant",
                  description: "Error if no variant is entered",
                });
              }
              if (values.fuel === "") {
                errors.fuel = intl.formatMessage({
                  defaultMessage: "Please select a fuel type",
                  description: "Error if no fuel type is selected",
                });
              }
              if (values.registrationNumber === "") {
                errors.registrationNumber = intl.formatMessage({
                  defaultMessage: "Please enter the registration number",
                  description: "Error if no registration number is entered",
                });
              }
              if (values.vin === "") {
                errors.vin = intl.formatMessage({
                  defaultMessage: "Please enter the VIN",
                  description: "Error if no VIN is entered",
                });
              }
              if (values.color === "") {
                errors.color = intl.formatMessage({
                  defaultMessage: "Please select a colour",
                  description: "Error if no colour is selected",
                });
              }
              if (values.mileage === "") {
                errors.mileage = intl.formatMessage({
                  defaultMessage: "Please enter the mileage",
                  description: "Error if no mileage is entered",
                });
              } else if (values.mileage.match(/^\d+$/) === null) {
                errors.mileage = intl.formatMessage({
                  defaultMessage: "Please enter a valid mileage",
                  description: "Error if an invalid mileage is entered",
                });
              }
              if (values.registrationDate === null) {
                errors.registrationDate = intl.formatMessage({
                  defaultMessage: "Please enter the registration date",
                  description: "Error if no registration date is entered",
                });
              } else if (!values.registrationDate.isValid()) {
                errors.registrationDate = intl.formatMessage({
                  defaultMessage: "Please enter a valid registration date",
                  description:
                    "Error if an invalid registration date is entered",
                });
              }

              return errors;
            }}
            onSubmit={(values: Values) => {
              mutate(
                {
                  ...values,
                  registrationDate: values.registrationDate!.utc().format(),
                  mileage: parseInt(values.mileage, 10),
                },
                {
                  onSuccess: () => navigate(-1),
                }
              );
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <Box padding={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Field
                        component={TextField}
                        name="manufacturer"
                        id="manufacturer"
                        label={
                          <FormattedMessage
                            defaultMessage="Make"
                            description="Label for the make"
                          />
                        }
                        select
                        InputLabelProps={{ required: true }}
                      >
                        {manufacturers().map((make) => (
                          <MenuItem key={make} value={make}>
                            {make}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        component={TextField}
                        name="model"
                        id="model"
                        label={
                          <FormattedMessage
                            defaultMessage="Model"
                            description="Label for the model"
                          />
                        }
                        fullWidth
                        InputLabelProps={{ required: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        component={TextField}
                        name="type"
                        id="type"
                        label={
                          <FormattedMessage
                            defaultMessage="Variant"
                            description="Label for the variant"
                          />
                        }
                        InputLabelProps={{ required: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="fuel"
                        id="fuel"
                        label={
                          <FormattedMessage
                            defaultMessage="Fuel"
                            description="Label for the fuel type"
                          />
                        }
                        select
                        InputLabelProps={{ required: true }}
                      >
                        {fuelTypes().map((fuel) => (
                          <MenuItem key={fuel} value={fuel}>
                            {fuel}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={SelectColourField}
                        name="color"
                        id="color"
                        label={
                          <FormattedMessage
                            defaultMessage="Colour"
                            description="Label for the colour"
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="registrationNumber"
                        id="registrationNumber"
                        label={
                          <FormattedMessage
                            defaultMessage="Registration number"
                            description="Label for the registration number"
                          />
                        }
                        InputLabelProps={{ required: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="vin"
                        id="vin"
                        label={
                          <FormattedMessage
                            defaultMessage="VIN"
                            description="Label for the VIN"
                          />
                        }
                        InputLabelProps={{ required: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        name="mileage"
                        id="mileage"
                        label={
                          <FormattedMessage
                            defaultMessage="Mileage"
                            description="Label for the mileage"
                          />
                        }
                        inputProps={{
                          inputMode: "numeric",
                        }}
                        InputLabelProps={{ required: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={DesktopDatePicker}
                        name="registrationDate"
                        id="registrationDate"
                        label={
                          <FormattedMessage
                            defaultMessage="Registration date"
                            description="Label for the registration date"
                          />
                        }
                        openTo="year"
                        inputFormat="DD/MM/YYYY"
                        views={["year", "month", "day"]}
                        disableFuture
                        InputLabelProps={{ required: true }}
                        inputProps={{
                          "aria-label": intl.formatMessage({
                            defaultMessage: "Registration date",
                            description:
                              "Accessibility label for the registration date",
                          }),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box padding={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => resetForm()}
                        disabled={isSubmitting}
                        sx={{ width: { xs: 1, sm: "auto" } }}
                      >
                        <FormattedMessage
                          defaultMessage="Reset"
                          description="Resets all the form fields"
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm="auto">
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        sx={{ width: { xs: 1, sm: "auto" } }}
                      >
                        <FormattedMessage
                          defaultMessage="Cancel"
                          description="Cancel the form and return to the home page"
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm="auto">
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                        sx={{ width: { xs: 1, sm: "auto" } }}
                      >
                        <FormattedMessage
                          defaultMessage="Create"
                          description="Create the vehicle"
                        />
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </LocalizationProvider>
      </Paper>
    </>
  );
}

export { Create };
