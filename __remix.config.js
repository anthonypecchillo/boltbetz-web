import { flatRoutes } from "remix-flat-routes";

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  cacheDirectory: "./node_modules/.cache/remix",
  serverModuleFormat: "esm",
  serverPlatform: "node",
  tailwind: true,
  postcss: true,
  watchPaths: ["./tailwind.config.ts"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
