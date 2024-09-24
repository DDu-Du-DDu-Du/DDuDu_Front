import "../src/app/_styles/globals.css";
import "./preview.css";

import { TanstackProvider } from "@/app/(route)/_components";
import type { Preview } from "@storybook/react";

import { SessionProvider } from "next-auth/react";

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
    (Story, { args }) => {
      return (
        <main id="app">
          <SessionProvider>
            <TanstackProvider>
              <Story args={args} />
            </TanstackProvider>
          </SessionProvider>
        </main>
      );
    },
  ],
};

export default preview;
