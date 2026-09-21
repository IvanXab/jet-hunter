import { config } from "@repo/eslint-config/react";

export default [
  ...config,
  {
    files: ["*.config.ts"],
    rules: {
      // Vite читает конфиг только через default-экспорт
      "no-restricted-syntax": "off",
    },
  },
];
