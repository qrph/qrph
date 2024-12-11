import { configs } from "@macalinao/eslint-config";

export default [
  ...configs.base,
  ...configs.react,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import-x/extensions": ["error", "ignorePackages"],
    },
  },
];
