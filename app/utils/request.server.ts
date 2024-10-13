import type { TypedResponse } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { returnToCookie } from "~/services/cookies.server";
import { destroySession, getSession } from "~/services/session.server";
import { getAbsoluteURL } from "./url";

export async function dataFnMiddleware<T>(
  request: Request,
  responsePromise: Promise<TypedResponse<T>>,
) {
  if (!process.env.AUTH0_ISSUER_BASE_URL) {
    throw new Error("AUTH0_ISSUER_BASE_URL is not defined");
  } else if (!process.env.AUTH0_CLIENT_ID) {
    throw new Error("AUTH0_CLIENT_ID is not defined");
  }
  const response = await responsePromise;
  if (response.status === 401) {
    const session = await getSession(request.headers.get("Cookie"));

    const url = new URL(request.url);
    const returnToafterLogin = url.pathname + url.search;

    const headers = new Headers();
    headers.append("Set-Cookie", await destroySession(session));
    headers.append(
      "Set-Cookie",
      await returnToCookie.serialize(returnToafterLogin),
    );

    const logoutURL = new URL("/v2/logout", process.env.AUTH0_ISSUER_BASE_URL);
    logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID);
    logoutURL.searchParams.set(
      "returnTo",
      getAbsoluteURL(request, "/api/auth/login"),
    );

    throw redirect(logoutURL.toString(), {
      headers,
    });
  }

  if (!response.headers.get("Content-Type")?.includes("application/json")) {
    throw response;
  }

  return response;
}

export async function logout(request: Request) {
  if (!process.env.AUTH0_ISSUER_BASE_URL) {
    throw new Error("AUTH0_ISSUER_BASE_URL is not defined");
  } else if (!process.env.AUTH0_CLIENT_ID) {
    throw new Error("AUTH0_CLIENT_ID is not defined");
  }

  const session = await getSession(request.headers.get("Cookie"));
  const logoutURL = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout`);

  logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID);
  logoutURL.searchParams.set("returnTo", getAbsoluteURL(request, "/"));

  const headers = new Headers();
  headers.append("Set-Cookie", await destroySession(session));
  headers.append(
    "Set-Cookie",
    await returnToCookie.serialize("", {
      expires: new Date(0),
      maxAge: undefined,
    }),
  );

  throw redirect(logoutURL.toString(), {
    headers,
  });
}
