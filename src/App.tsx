import { RouterProvider } from "react-router-dom";

import { route } from "@/router";

import { QueryProvider } from "./api";

const App = () => {
  return (
    <QueryProvider>
      <RouterProvider router={route} />
    </QueryProvider>
  );
};

export default App;
