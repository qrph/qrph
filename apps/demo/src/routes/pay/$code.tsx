import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pay/$code")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pay/$code"!</div>;
}
