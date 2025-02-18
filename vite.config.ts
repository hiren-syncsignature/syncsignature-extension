


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'), // Entry point for popup
        content: resolve(__dirname, 'src/content.ts'), // Entry point for content script
        // Add other entry points here (e.g., background script) if needed
      },
      output: {
        entryFileNames: `[name].js`,   // Output as name.js (content.js, popup.js)
        chunkFileNames: `[name].js`,   // For any shared code chunks
        assetFileNames: `[name].[ext]`, // Keep original asset names (images, etc.)
      },
    },
    // outDir: 'dist',       // Output directory (make sure this is where manifest.json expects files)
    // sourcemap: true,      // Generate sourcemaps for easier debugging
    // emptyOutDir: true,    // Clean the output directory before each build
  },
});