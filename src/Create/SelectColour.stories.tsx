import { ComponentMeta, ComponentStory } from "@storybook/react";
import Paper from "@mui/material/Paper";
import { SelectColour } from "./SelectColour";

export default {
  title: "Create/SelectColour",
  component: SelectColour,
  decorators: [
    (Story) => (
      <Paper sx={{ padding: 2 }}>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    controls: {
      include: ["value", "disabled"],
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof SelectColour>;

const Template: ComponentStory<typeof SelectColour> = (args) => (
  <SelectColour {...args} />
);

export const Value = Template.bind({});
Value.args = {
  value: "gold",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "blue",
  disabled: true,
};
