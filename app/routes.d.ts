declare module "routes-gen" {
  export type RouteParams = {
    "/": Record<string, never>;
    "/api/auth/callback": Record<string, never>;
    "/api/auth/login": Record<string, never>;
    "/api/auth/logout": Record<string, never>;
    "/wallet": Record<string, never>;
  };

  export function route<
    T extends
      | ["/"]
      | ["/api/auth/callback"]
      | ["/api/auth/login"]
      | ["/api/auth/logout"]
      | ["/wallet"]
  >(...args: T): typeof args[0];
}
