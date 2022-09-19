import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf'],
  server: {
    hmr: {
      // port: 443,
      clientPort: 443
    }
  }
});
