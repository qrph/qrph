import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";

import { routeTree } from "./routeTree.gen.js";
import { GlobalStyles } from "./styles/globalStyles";

const router = createRouter({
  routeTree,
});

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div>
        <GlobalStyles />
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
};
