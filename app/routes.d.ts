declare module "routes-gen" {
  export type RouteParams = {
    "/": Record<string, never>;
    "/api/auth/callback": Record<string, never>;
    "/api/auth/login": Record<string, never>;
    "/api/auth/logout": Record<string, never>;
    "/my/profile": Record<string, never>;
  };

  export function route<
    T extends
      | ["/"]
      | ["/api/auth/callback"]
      | ["/api/auth/login"]
      | ["/api/auth/logout"]
      | ["/my/profile"]
  >(...args: T): typeof args[0];
}
