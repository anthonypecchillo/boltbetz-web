import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { route } from "routes-gen";
import { getUser } from "~/sdk/v1";
import type { SessionData } from "./session.server";
import { sessionStorage } from "./session.server";

export const sessionKey = "user";

if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error("AUTH0_CLIENT_ID is not defined");
} else if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error("AUTH0_CLIENT_SECRET is not defined");
} else if (!process.env.AUTH0_ISSUER_BASE_URL) {
  throw new Error("AUTH0_ISSUER_BASE_URL is not defined");
}

export const authenticator = new Authenticator<SessionData["user"]>(
  sessionStorage,
  {
    sessionKey,
  },
).use(
  new Auth0Strategy(
    {
      callbackURL: "/api/auth/callback",
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: new URL(process.env.AUTH0_ISSUER_BASE_URL).hostname,
      scope: "openid profile email api-access",
      // audience: "https://bbdev1.490s.com:8000/api/",
    },
    async ({ accessToken /*, extraParams*/ }) => {
      // if (!extraParams.id_token) {
      //   console.error("Auth0 Strat: Missing id_token");
      //   throw new Error("Failed to authenticate with Auth0");
      // }

      if (!accessToken) {
        console.error("Auth0 Strat: Missing access_token");
        throw new Error("Failed to authenticate with Auth0");
      }

      const response = await getUser({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error("Auth0 Strat: Failed to authenticate with Boltbetz API");
        throw new Error("Failed to authenticate with Boltbetz API");
      }

      const user = await response.json();

      return {
        boltbetzUser: user,
        boltbetzJWT: accessToken,
      };
    },
  ),
  "auth0",
);

export async function getRequiredUser(request: Request) {
  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;
  return await authenticator.isAuthenticated(request, {
    failureRedirect: `${route("/api/auth/login")}?${new URLSearchParams({
      returnTo,
    })}`,
  });
}

export function getRequestIdHeaders(request: Request) {
  const vercelRequestId = request.headers.get("x-vercel-id");

  if (!vercelRequestId) {
    return undefined;
  }

  return new Headers({
    "request-id": vercelRequestId.replace(/^\w+::/, ""),
  });
}

export async function getRequiredUserHeaders(request: Request) {
  const user = await getRequiredUser(request);

  return new Headers({
    Authorization: `Bearer ${user.boltbetzJWT}`,
  });
}
