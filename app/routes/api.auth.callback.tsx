import type { LoaderFunctionArgs } from "@vercel/remix";
import { route } from "routes-gen";
import { authenticator } from "~/services/auth.server";
import { returnToCookie } from "~/services/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const returnTo = await returnToCookie.parse(request.headers.get("Cookie"));
  const successRedirect = returnTo ?? route("/wallet");

  return authenticator.authenticate("auth0", request, {
    successRedirect,
    failureRedirect: "/?failure=auth",
  });
}
