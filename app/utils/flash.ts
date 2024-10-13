import { createCookieSessionStorage, redirect } from "@vercel/remix";
import invariant from "tiny-invariant";
import { mergeHeaders } from "~/sdk/v1";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET env var must be set");

const flashKey = "flash";

type Flash = {
  type: "success" | "error" | "info";
  message: string;
};

export type SessionFlashData = {
  flash: Flash;
};

export const flashSessionStorage = createCookieSessionStorage<SessionFlashData>(
  {
    cookie: {
      name: "appFlash",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  },
);

export async function redirectWithFlash(
  url: string,
  flash: Flash,
  init?: ResponseInit,
) {
  const session = await flashSessionStorage.getSession();
  session.flash(flashKey, flash);
  const cookie = await flashSessionStorage.commitSession(session);
  const cookieHeaders = new Headers({ "Set-Cookie": cookie });

  return redirect(url, {
    ...init,
    headers: mergeHeaders(init?.headers, cookieHeaders),
  });
}

export async function redirectWithSuccess(
  url: string,
  message: string,
  init?: ResponseInit,
) {
  return redirectWithFlash(url, { type: "success", message }, init);
}

export async function redirectWithError(
  url: string,
  message: string,
  init?: ResponseInit,
) {
  return redirectWithFlash(url, { type: "error", message }, init);
}

export async function getFlash(request: Request) {
  const session = await flashSessionStorage.getSession(
    request.headers.get("cookie"),
  );

  const flash = session.get(flashKey);
  return {
    flash,
    headers: flash
      ? new Headers({
          "Set-Cookie": await flashSessionStorage.destroySession(session),
        })
      : undefined,
  };
}
