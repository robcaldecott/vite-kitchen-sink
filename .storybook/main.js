module.exports = {
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "storybook-dark-mode",
    "@storybook/addon-interactions",
    "storybook-addon-intl",
  ],
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  features: {
    interactionsDebugger: true,
    storyStoreV7: true,
  },
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
