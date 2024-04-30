import type { StorybookConfig } from "@storybook/nextjs";

import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (prevConfig) => {
    const newConfig = { ...prevConfig };

    if (newConfig.resolve) {
      newConfig.resolve.alias = {
        ...newConfig.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }

    return newConfig;
  },

  staticDirs: ["../public"],
};
export default config;
