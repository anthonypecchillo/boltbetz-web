import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vercelPreset } from "@vercel/remix/vite";
import legacy from "@vitejs/plugin-legacy";
import { flatRoutes } from "remix-flat-routes";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const plugins: PluginOption[] = [tsconfigPaths()];
const isStorybook = process.argv[1]?.includes("storybook");

if (!isStorybook) {
  plugins.unshift(
    remix({
      basename: "/",
      serverModuleFormat: "esm",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      presets: [vercelPreset()],
      routes(defineRoutes) {
        return flatRoutes("routes", defineRoutes);
      },
    }),
  );
  plugins.push(legacy());
  if (process.env.SENTRY_AUTH_TOKEN) {
    // Put the Sentry vite plugin after all other plugins
    plugins.push(
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "apdevelopment",
        project: "boltbetz-web",
      }),
    );
  }
}

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    warmup: {
      ssrFiles: [
        "./app/**/*.server.ts",
        "./app/**/*.server.tsx",
        "./app/entry.server.tsx",
        "./app/root.tsx",
        "./app/routes/**/*.tsx",
      ],
      clientFiles: [
        "./app/**/*.client.ts",
        "./app/**/*.client.tsx",
        "./app/entry.client.tsx",
        "./app/root.tsx",
        "./app/routes/**/*.tsx",
      ],
    },
    port: 3000,
    fs: {
      // Restrict files that could be served by Vite's dev server.  Accessing
      // files outside this directory list that aren't imported from an allowed
      // file will result in a 403.  Both directories and files can be provided.
      // If you're comfortable with Vite's dev server making any file within the
      // project root available, you can remove this option.  See more:
      // https://vitejs.dev/config/server-options.html#server-fs-allow
      allow: ["app"],
    },
  },
  plugins,
});
