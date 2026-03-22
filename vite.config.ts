import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },

  build: {
    target: "es2020",
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true, pure_funcs: ["console.log"] },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          /* Core React — loads first */
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          /* Animation — deferred */
          "vendor-motion": ["framer-motion"],
          /* GSAP — deferred */
          "vendor-gsap": ["gsap"],
          /* Radix UI primitives */
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-tabs",
          ],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 4096,
  },

  /* Image optimization hints */
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
}));
