import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    react(),

    // Copiar el service worker desde src/ hacia dist/
    viteStaticCopy({
      targets: [
        {
          src: "src/sw.js",
          dest: ".", // lo deja como /dist/sw.js
          transform: (content) =>
            content.toString().replace("__APP_VERSION__", pkg.version),
        },
      ],
    }),
  ],

  publicDir: "public",

  resolve: {
    alias: {
      "@": "/src/",
      "@components": "/src/components",
      "@routes": "/src/routes",
      "@utils": "/src/utils",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@redux": "/src/redux",
    },
  },

  server: {
    port: 5000,
  },

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
