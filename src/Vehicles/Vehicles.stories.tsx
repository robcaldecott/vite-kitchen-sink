import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { DefaultRequestBody, PathParams, rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { Vehicle } from "../queries";
import { FilterProvider } from "../FilterProvider";
import { Vehicles } from ".";

export default {
  title: "Vehicles/Vehicles",
  component: Vehicles,
  decorators: [
    (Story) => (
      <FilterProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </FilterProvider>
    ),
  ],
} as ComponentMeta<typeof Vehicles>;

const Template: ComponentStory<typeof Vehicles> = () => <Vehicles />;

const vehicles: Vehicle[] = [
  {
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
  },
  {
    id: "76156b22-516e-44e7-b38b-3bacd47e34fa",
    manufacturer: "Ferrari",
    model: "Challenger",
    type: "Passenger Van",
    fuel: "Hybrid",
    vin: "8PE1CGGMU9G882341",
    color: "orchid",
    mileage: 48410,
    registrationDate: "2004-05-15T23:10:44.873Z",
    registrationNumber: "WY24 DGE",
  },
];

export const Loading = Template.bind({});
Loading.parameters = {
  msw: {
    handlers: [
      rest.get("/api/vehicles", (req, res, ctx) => res(ctx.delay("infinite"))),
    ],
  },
};

export const Success = Template.bind({});
Success.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
        "/api/vehicles",
        (req, res, ctx) => res(ctx.json(vehicles))
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get("/api/vehicles", (req, res, ctx) => res(ctx.status(500))),
    ],
  },
};

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
        "/api/vehicles",
        (req, res, ctx) => res(ctx.json([]))
      ),
    ],
  },
};

export const Filtered = Template.bind({});
Filtered.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultRequestBody, PathParams, Vehicle[]>(
        "/api/vehicles",
        (req, res, ctx) => res(ctx.json(vehicles))
      ),
    ],
  },
};
Filtered.play = async (context) => {
  const canvas = within(context.canvasElement);
  const input = await canvas.findByRole("textbox");
  await userEvent.type(input, "volk");
};
