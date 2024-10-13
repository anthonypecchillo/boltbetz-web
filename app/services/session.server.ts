import { createCookieSessionStorage } from "@vercel/remix";
import invariant from "tiny-invariant";
import type * as V1 from "~/entities/v1";

invariant(process.env.AUTH0_SECRET, "AUTH0_SECRET must be set");

export type SessionData = {
  // session key from remix-auth
  user: {
    boltbetzJWT: string;
    boltbetzUser: V1.User;
  };
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "appSession",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.AUTH0_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 259000, // Seconds. Just under 3 days.
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
