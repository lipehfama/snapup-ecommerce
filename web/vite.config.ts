import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

interface CacheConfig {
  name: string;
  pattern: RegExp;
}
// Define cache configurations for different resources
const getCache = ({ name, pattern }: CacheConfig) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // 2 years
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: { enabled: true },
      includeAssets: ["favicon.ico", "icon-192x192.png", "icon-512x512.png"],
      manifest: {
        name: "Snapup Ecommerce",
        short_name: "Snapup",
        description: "Snapup ecommerce is a fictitious ecommerce, with a wide variety of products.",
        theme_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          getCache({
            name: "snapup-images-cache",
            pattern:
              /^(https|http):\/\/i\.dummyjson\.com\/data\/products\/\d+\/\d+\.(jpg|png|webp)$/
          })
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-expect-error - `api` isn't in the installed Vite version's types yet, but is a valid runtime option
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
