import { ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { CreateFab } from "./CreateFab";

export default {
  title: "Vehicles/CreateFab",
  component: CreateFab,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof CreateFab>;

export const Default = {};
