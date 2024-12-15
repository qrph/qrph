import { createLazyFileRoute } from "@tanstack/react-router";

const HomePage: React.FC = () => {
  return (
    <div tw="max-w-2xl mx-auto text-center pt-64">
      <header>
        <h1 tw="text-7xl font-semibold mb-4 relative tracking-tight text-black">
          QR Ph Tools
        </h1>
        <p tw="text-gray-600 text-xl">
          A collection of libraries and tools for QR Ph.
        </p>
      </header>
      <main></main>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: () => <HomePage />,
});
