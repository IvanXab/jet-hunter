import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const SOURCE_DIRECTORY = decodeURIComponent(
  new URL("./src", import.meta.url).pathname,
);

export default defineConfig({
  plugins: [
    react({ babel: { plugins: ["babel-plugin-react-compiler"] } }),
    tailwindcss(),
  ],
  resolve: {
    alias: { "@": SOURCE_DIRECTORY },
  },
});
