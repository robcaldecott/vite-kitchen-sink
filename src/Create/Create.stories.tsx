import { ComponentMeta, ComponentStory } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { rest } from "msw";
import { MemoryRouter, Route, Routes, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Create } from ".";

export default {
  title: "Create",
  component: Create,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/", "/create"]} initialIndex={1}>
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
                  to="/create"
                >
                  Create
                </Button>
              </>
            }
          />
          <Route path="/create" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Create>;

const Template: ComponentStory<typeof Create> = () => <Create />;

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.post("/api/vehicles", (req, res, ctx) => res(ctx.json({}))),
    ],
  },
};

const fillForm = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const body = within(document.body);
  await userEvent.click(canvas.getByLabelText(/make/i));
  await userEvent.click(await body.findByRole("option", { name: /audi/i }));
  await userEvent.type(
    canvas.getByRole("textbox", { name: /model/i }),
    "Model"
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /variant/i }),
    "Variant"
  );
  await userEvent.click(canvas.getByLabelText(/fuel/i));
  await userEvent.click(body.getByRole("option", { name: /electric/i }));
  await userEvent.click(canvas.getByLabelText(/colour/i));
  await userEvent.click(body.getByRole("option", { name: /black/i }));
  await userEvent.type(
    canvas.getByRole("textbox", { name: /registration number/i }),
    "REGNO"
  );
  await userEvent.type(canvas.getByRole("textbox", { name: /vin/i }), "VIN");
  await userEvent.type(
    canvas.getByRole("textbox", { name: /mileage/i }),
    "1234"
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /registration date/i }),
    "01/01/2000"
  );
};

export const Filled = Template.bind({});
Filled.parameters = Empty.parameters;
Filled.play = async ({ canvasElement }) => {
  await fillForm(canvasElement);
};

export const Submit = Template.bind({});
Submit.parameters = {
  msw: {
    handlers: [
      rest.post("/api/vehicles", (req, res, ctx) => res(ctx.delay("infinite"))),
    ],
  },
};
Submit.play = async ({ canvasElement }) => {
  await fillForm(canvasElement);
  // Submit
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /create/i }));
};

export const InvalidMileage = Template.bind({});
InvalidMileage.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.type(
    canvas.getByRole("textbox", { name: /mileage/i }),
    "abc"
  );
  await userEvent.tab();
  await canvas.findByText(/please enter a valid mileage/i);
};

export const InvalidDate = Template.bind({});
InvalidDate.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.type(
    canvas.getByRole("textbox", { name: /registration date/i }),
    "01"
  );
  await userEvent.tab();
};
