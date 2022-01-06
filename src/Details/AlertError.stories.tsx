import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AlertError } from "./AlertError";

export default {
  title: "Details/AlertError",
  component: AlertError,
} as ComponentMeta<typeof AlertError>;

const Template: ComponentStory<typeof AlertError> = (args) => (
  <AlertError {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: { status: 500, statusText: "Internal server error" } as Response,
};
