import { ComponentMeta, ComponentStory } from "@storybook/react";
import Typography from "@mui/material/Typography";
import { AppHeader } from ".";

export default {
  title: "AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Application Title",
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  title: "The quick brown fox jumps over the lazy dog",
};

export const PageContent = Template.bind({});
PageContent.args = {
  title: "Scrollable Content Example",
};
PageContent.decorators = [
  (Story) => (
    <>
      <Story />
      {[...Array(100).keys()].map((key) => (
        <Typography key={key}>This is line {key + 1}</Typography>
      ))}
    </>
  ),
];
