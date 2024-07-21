import { GlobalStyles, theme } from "@/styles";

import { ThemeProvider } from "styled-components";

import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/api";
import { route } from "@/router";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={route} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
