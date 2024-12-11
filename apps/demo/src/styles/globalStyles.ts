import { createGlobalStyle } from "styled-components";
import type { Styles } from "styled-components/dist/types.js";
import tw, { css, globalStyles as builtinStyles } from "twin.macro";

const globalStyles = css`
  :root {
    --font-geist-sans: "Geist", system-ui, -apple-system, BlinkMacSystemFont;
    --font-geist-mono: "Geist Mono", "SFMono-Regular", Consolas,
      "Liberation Mono", Menlo, Courier, monospace;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    /* text-decoration-skip-ink: none; */
  }

  html {
    ${tw`antialiased text-gray-900 bg-white`}
    font-smooth: never;
  }

  /** default border color */
  *,
  ::before,
  ::after {
    ${tw`border-gray-500`}
  }
`;

export const GlobalStyles = createGlobalStyle`

  ${css(builtinStyles as Styles<object>)}
  ${globalStyles}
`;
