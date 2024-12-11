import { createRouter, RouterProvider } from "@tanstack/react-router";
import { GlobalStyles } from "./styles/globalStyles";
import React from "react";
import { routeTree } from "./routeTree.gen.js";

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
