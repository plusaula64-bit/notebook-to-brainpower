// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Copia de la app (HTML de inicio) guardada al instalar el service worker. Usa una URL
// propia para que la ruta de precarga no intercepte "/" y las páginas sigan en red primero.
const OFFLINE_SHELL = "/?pwa-shell=1";
const BUILD_ID = Date.now().toString(36);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        strategies: "generateSW",
        registerType: "autoUpdate",
        injectRegister: null, // el registro lo hace solo src/lib/pwa-register.ts
        devOptions: { enabled: false },
        filename: "sw.js",
        manifest: false, // el manifest vive en public/manifest.webmanifest
        // Los archivos públicos del build viven en dist/client: el SW debe quedar ahí
        // (servido en /sw.js) y precargar rutas relativas a esa carpeta.
        outDir: "dist/client",
        workbox: {
          globDirectory: "dist/client",
          globPatterns: ["**/*.{js,mjs,css,html,ico,png,jpg,jpeg,webp,svg,woff,woff2,webmanifest}"],
          // La app se sirve con SSR (no existe /index.html): se precarga una copia del HTML de
          // inicio y se usa como respaldo cuando no hay red (ver precacheFallback abajo).
          additionalManifestEntries: [{ url: OFFLINE_SHELL, revision: BUILD_ID }],
          navigateFallback: null,
          clientsClaim: true,
          skipWaiting: true,
          cleanupOutdatedCaches: true,
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
          runtimeCaching: [
            {
              // Navegaciones/HTML: red primero, caché como respaldo offline.
              urlPattern: ({ request, url }: { request: Request; url: URL }) =>
                url.origin === self.location.origin &&
                !url.pathname.startsWith("/~oauth") &&
                !url.pathname.startsWith("/api/") &&
                (request.mode === "navigate" || (request.method === "GET" && url.pathname === "/")),
              handler: "NetworkFirst",
              options: {
                cacheName: "aulaplus-pages",
                networkTimeoutSeconds: 3,
                cacheableResponse: { statuses: [200] },
                // Sin red ni copia de esa página: sirve el HTML de inicio precargado.
                precacheFallback: { fallbackURL: OFFLINE_SHELL },
              },
            },
            {
              // Tipografía Nunito (Google Fonts): disponible también sin conexión.
              urlPattern: ({ url }: { url: URL }) =>
                url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "aulaplus-fonts",
                cacheableResponse: { statuses: [0, 200] },
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
            {
              // Assets con hash del propio sitio: caché primero.
              urlPattern: ({ url, request }: { url: URL; request: Request }) =>
                url.origin === self.location.origin &&
                ["style", "script", "worker", "font", "image"].includes(request.destination),
              handler: "CacheFirst",
              options: {
                cacheName: "aulaplus-assets",
                expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
    ],
  },
});
