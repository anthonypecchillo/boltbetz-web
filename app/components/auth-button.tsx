import { Form, useRouteLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { route } from "routes-gen";
import type { loader as rootLoader } from "~/root";

export function AuthButton() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");

  const boltbetzUser = rootLoaderData?.session?.boltbetzUser;
  const isLoggedIn = Boolean(boltbetzUser);

  const formActionRoute = isLoggedIn ? "/api/auth/logout" : "/api/auth/login";
  const buttonText = isLoggedIn ? "Sign Out" : "Sign In";

  return (
    <Form action={route(formActionRoute)} method="POST">
      <button
        type="submit"
        className={clsx("mt-10 rounded-md px-6 py-2 font-semibold text-white", {
          "bg-red-500 hover:bg-red-600": isLoggedIn,
          "bg-green-600 hover:bg-green-700": !isLoggedIn,
        })}
      >
        {buttonText}
      </button>
    </Form>
  );
}
