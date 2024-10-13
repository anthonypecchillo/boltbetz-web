Object.hasOwn ??= (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

import type { ShouldRevalidateFunctionArgs } from "@remix-run/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { withSentry } from "@sentry/remix";
import { Analytics } from "@vercel/analytics/react";
import type {
  HeadersFunction,
  LinkDescriptor,
  LoaderFunctionArgs,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { route } from "routes-gen";
import faviconUrl from "~/assets/bolt.svg?url";
import {
  DefaultGenericStatusHandler,
  GeneralErrorBoundary,
} from "~/components/general-error-boundary";
import { useNonce } from "~/components/nonce";
import { mergeHeaders } from "~/sdk/v1";
import { authenticator } from "~/services/auth.server";
import tailwindStylesheetUrl from "~/styles/tailwind.css?url";
import { csrf } from "~/utils/csrf.server";
import { getEnv } from "~/utils/env.server";
import { getFlash } from "~/utils/flash";
import { AnchorButton } from "./components/button";

export function meta() {
  return [
    { title: "Boltbetz" },
    { name: "description", content: "Welcome to Boltbetz!" },
    { property: "og:title", content: "Boltbetz" },
    { property: "og:description", content: "Welcome to Boltbetz!" },
    {
      property: "og:image",
      content:
        "https://boltbetz-evugdy7sp-anthonypecchillos-projects.vercel.app/og-logo.jpg",
    },
    {
      property: "og:url",
      content:
        "https://boltbetz-evugdy7sp-anthonypecchillos-projects.vercel.app/",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Boltbetz" },
    { name: "twitter:description", content: "Welcome to Boltbetz!" },
    {
      name: "twitter:image",
      content:
        "https://boltbetz-evugdy7sp-anthonypecchillos-projects.vercel.app/og-logo.jpg",
    },
  ];
}

export function links(): LinkDescriptor[] {
  return [
    {
      rel: "icon",
      href: faviconUrl,
      type: "image/svg+xml",
    },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
}

export const headers: HeadersFunction = ({
  loaderHeaders,
  actionHeaders,
  errorHeaders,
  parentHeaders,
}) => {
  // Set cache-control for full-page loads
  const cacheControl =
    errorHeaders?.get("cache-control") ||
    loaderHeaders.get("cache-control") ||
    actionHeaders.get("cache-control") ||
    parentHeaders.get("cache-control") ||
    "no-store";

  return {
    "cache-control": cacheControl,
  };
};

export function shouldRevalidate({
  currentUrl,
  defaultShouldRevalidate,
  nextUrl,
}: ShouldRevalidateFunctionArgs) {
  if (currentUrl.toString() !== nextUrl.toString()) {
    return true;
  }
  return defaultShouldRevalidate;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // home page will be publicly cached so never display flash messages there.
  const isHomePage = request.url === "/";
  const { flash, headers } = isHomePage
    ? { flash: undefined, headers: undefined }
    : await getFlash(request);

  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);

  return json(
    {
      flash,
      session: await authenticator.isAuthenticated(request),
      csrfToken,
      ENV: getEnv(),
    },
    {
      headers: mergeHeaders(
        headers,
        csrfCookieHeader
          ? {
              "Set-Cookie": csrfCookieHeader,
            }
          : undefined,
      ),
    },
  );
}

function App() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <AuthenticityTokenProvider token={loaderData.csrfToken}>
      <Outlet />
    </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ error, params }) => (
          <>
            <DefaultGenericStatusHandler error={error} params={params} />
            <p className="mb-6 mt-4 text-gray-600">
              We can&apos;t find that page.
            </p>
            <AnchorButton href={route("/wallet")}>Return Home</AnchorButton>
          </>
        ),
      }}
    />
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const nonce = useNonce();

  return (
    <html lang="en" className="font-manrope">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        {loaderData?.ENV.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : undefined}
      </body>
    </html>
  );
}

export default withSentry(App);
