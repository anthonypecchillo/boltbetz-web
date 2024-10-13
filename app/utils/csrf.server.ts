import { createCookie } from "@vercel/remix";
import { CSRF, CSRFError } from "remix-utils/csrf/server";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined");
}

const cookie = createCookie("csrf", {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  secrets: [process.env.SESSION_SECRET],
});

export const csrf = new CSRF({ cookie, secret: process.env.SESSION_SECRET });

export function validateCsrf(...args: Parameters<typeof csrf.validate>) {
  try {
    return csrf.validate(...args);
  } catch (error) {
    if (error instanceof CSRFError) {
      throw new Response("Invalid CSRF token", { status: 403 });
    }
    throw error;
  }
}
