import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // App Router: Google Font <link> tags in the root layout's <head> are
      // the supported pattern when not using next/font. This rule predates
      // the App Router and only makes sense for the old pages/_document.js.
      "@next/next/no-page-custom-font": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
