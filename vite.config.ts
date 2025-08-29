import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import autoImport from "unplugin-auto-import/vite";
import vueRouter from "unplugin-vue-router/vite";
import routesConfiguration from "./src/packages/router/configuration";
import tailwindcss from "@tailwindcss/vite";
import pocketbasePlugin from "./src/packages/pocketbase/plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    // ⚠️ VueRouter must be placed before vue
    vueRouter(
      /* options */
      routesConfiguration
    ),
    vue(),
    vueJsx(),
    vueDevTools(),
    autoImport({
      imports: [
        "vue",
        "pinia",
        "vue-router"
      ],
      dts: true,
    }),
    // pocketbasePlugin({
    //   nameSuffix:''
    // })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
