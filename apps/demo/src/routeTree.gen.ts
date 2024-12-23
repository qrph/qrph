/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root.tsx"

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")()
const PayCodeLazyImport = createFileRoute("/pay/$code")()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy.tsx").then((d) => d.Route))

const PayCodeLazyRoute = PayCodeLazyImport.update({
  id: "/pay/$code",
  path: "/pay/$code",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/pay/$code.lazy.tsx").then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    "/pay/$code": {
      id: "/pay/$code"
      path: "/pay/$code"
      fullPath: "/pay/$code"
      preLoaderRoute: typeof PayCodeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexLazyRoute
  "/pay/$code": typeof PayCodeLazyRoute
}

export interface FileRoutesByTo {
  "/": typeof IndexLazyRoute
  "/pay/$code": typeof PayCodeLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  "/": typeof IndexLazyRoute
  "/pay/$code": typeof PayCodeLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: "/" | "/pay/$code"
  fileRoutesByTo: FileRoutesByTo
  to: "/" | "/pay/$code"
  id: "__root__" | "/" | "/pay/$code"
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PayCodeLazyRoute: typeof PayCodeLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PayCodeLazyRoute: PayCodeLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pay/$code"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/pay/$code": {
      "filePath": "pay/$code.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
