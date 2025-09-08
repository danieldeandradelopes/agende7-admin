import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { writeFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: "generate-version",
      buildEnd() {
        const version = Date.now().toString(); // ou use package.json version
        writeFileSync("public/version.json", JSON.stringify({ version }));
      },
    },
  ],
  base: "/",
  build: {
    outDir: "dist", // pasta padrão do Vite
  },
});
