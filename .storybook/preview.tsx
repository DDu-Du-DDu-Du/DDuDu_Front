import { GlobalStyles, theme } from "../src/styles";

import { ThemeProvider } from "styled-components";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Stroy) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Stroy />
      </ThemeProvider>
    ),
  ],
};

export default preview;
