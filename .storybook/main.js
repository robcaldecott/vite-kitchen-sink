module.exports = {
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: { backgrounds: false },
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
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    config.plugins = [
      ...config.plugins.filter((plugin) => {
        return !(
          Array.isArray(plugin) && plugin[0].name === "vite:react-babel"
        );
      }),
      require("@vitejs/plugin-react")({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        babel: { plugins: ["formatjs"] },
      }),
    ];
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: [
        ...(config?.optimizeDeps?.include || []),
        // Imports from preview.tsx
        "msw-storybook-addon",
        "storybook-dark-mode",
        "storybook-addon-intl",
        "react-intl",
        "react-query",
      ],
    };
    return config;
  },
};
