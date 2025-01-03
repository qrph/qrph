// @ts-expect-error something wrong with the types
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },

  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },

  plugins: [
    tsconfigPaths(),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    TanStackRouterVite({
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
      addExtensions: true,
      quoteStyle: "double",
    }),
    svgr(),
    react({
      exclude: /packages\//,
      babel: {
        plugins: [
          "babel-plugin-twin",
          "babel-plugin-macros",
          "babel-plugin-styled-components",
        ],
      },
    }),
  ],

  build: {
    sourcemap: true,
  },
});
