import { createCookie } from "@vercel/remix";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined");
}

export const returnToCookie = createCookie("returnTo", {
  secrets: [process.env.SESSION_SECRET],
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60,
});
