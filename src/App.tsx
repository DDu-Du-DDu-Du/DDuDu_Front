import { GlobalStyles, theme } from "@/styles";

import { ThemeProvider } from "styled-components";

import { RouterProvider } from "react-router-dom";

import { ToastProvider } from "@/components";
import { QueryProvider } from "@/lib/api";
import { route } from "@/lib/router";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastProvider>
          <RouterProvider router={route} />
        </ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
