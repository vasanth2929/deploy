import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
    };
  } else {
    return {
      plugins: [react()],
      build: {
        outDir: "../server/dist/public",
        assetsDir: "static",
      },
    };
  }
});
