import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: [
      "components/dark-veil-background.tsx",
      "components/locale-provider.tsx",
      "components/theme-toggle.tsx",
      "components/website-check/website-check-tool.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".test-dist/**",
    "next-env.d.ts",
  ]),
]);
