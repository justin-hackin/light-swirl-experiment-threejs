import { defineConfig } from "vite";
const glsl = (await import('vite-plugin-glsl')).default;
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  assetsInclude: ['**/*.gltf'],
});
