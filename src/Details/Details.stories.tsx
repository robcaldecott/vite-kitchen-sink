import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { DefaultBodyType, PathParams, rest } from "msw";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Vehicle } from "../queries";
import { Details } from ".";

export default {
  title: "Details/Details",
  component: Details,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/", "/vehicles/123"]} initialIndex={1}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Typography variant="h4" component="h1" gutterBottom>
                  Home
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/vehicles/123"
                >
                  Details
                </Button>
              </>
            }
          />
          <Route path="/vehicles/:vehicleId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = () => <Details />;

export const Loading = Template.bind({});
Loading.parameters = {
  msw: {
    handlers: [
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.delay("infinite"))
      ),
    ],
  },
};

let vehicle = {
  id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
  manufacturer: "Volkswagen",
  model: "Explorer",
  type: "Cargo Van",
  fuel: "Gasoline",
  vin: "1USTAN9Z5MNT86399",
  color: "teal",
  mileage: 70609,
  registrationDate: "2005-07-08T16:58:36.380Z",
  registrationNumber: "TE52 HWW",
};

export const Success = Template.bind({});
Success.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultBodyType, PathParams, Vehicle>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json(vehicle))
      ),
      rest.delete<DefaultBodyType, PathParams, { id: string }>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json({ id: "123" }))
      ),
    ],
  },
};

export const LoadingError = Template.bind({});
LoadingError.parameters = {
  msw: {
    handlers: [
      rest.get("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.status(500))
      ),
    ],
  },
};

export const Delete = Template.bind({});
Delete.parameters = Success.parameters;
Delete.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.click(
    await canvas.findByRole("button", { name: /delete vehicle/i })
  );
};

export const DeleteError = Template.bind({});
DeleteError.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultBodyType, PathParams, Vehicle>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json(vehicle))
      ),
      rest.delete("/api/vehicles/:vehicleId", (req, res, ctx) =>
        res(ctx.status(500))
      ),
    ],
  },
};
DeleteError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const body = within(document.body);
  // Click on the Delete Vehicle button
  await userEvent.click(
    await canvas.findByRole("button", { name: /delete vehicle/i })
  );
  // Wait for the dialog and click the Delete button
  const dialog = within(
    await body.findByRole("dialog", { name: /delete vehicle/i })
  );
  // Delete
  await userEvent.click(dialog.getByRole("button", { name: /delete/i }));
};

export const HomeBreadcrumb = Template.bind({});
HomeBreadcrumb.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultBodyType, PathParams, Vehicle>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json(vehicle))
      ),
    ],
  },
};
HomeBreadcrumb.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Wait for the card to load
  await canvas.findByLabelText(/vehicle details/i);
  // Click the Home button
  await userEvent.click(canvas.getByRole("link", { name: /home/i }));
  // Wait for the home page
  await canvas.findByRole("heading", { name: /home/i, level: 1 });
};
