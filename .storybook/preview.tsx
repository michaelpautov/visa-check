import React from 'react';
import { Preview } from '@storybook/react';
import "@/app/globals.css";

import {withThemeByClassName} from '@storybook/addon-themes';
import {ThemeProvider} from "@/components/theme-provider";

const withThemeProvider = (Story, context) => {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground">
          <Story {...context} />
        </div>
      </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    withThemeProvider,
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
