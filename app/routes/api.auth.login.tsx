import type { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";
import { route } from "routes-gen";
import { authenticator } from "~/services/auth.server";
import { returnToCookie } from "~/services/cookies.server";
import { isRedirect as isRedirectResponse } from "~/utils/response";

export async function action({ request }: ActionFunctionArgs) {
  return await login(request);
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await login(request);
}

async function login(request: Request) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo");

  try {
    return await authenticator.authenticate("auth0", request, {
      successRedirect: returnTo ?? route("/wallet"),
      failureRedirect: "/",
    });
  } catch (error) {
    if (!returnTo) {
      throw error;
    }
    if (error instanceof Response && isRedirectResponse(error)) {
      error.headers.append(
        "Set-Cookie",
        await returnToCookie.serialize(returnTo),
      );
      return error;
    }
    throw error;
  }
}
