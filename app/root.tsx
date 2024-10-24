Object.hasOwn ??= (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

import type { ShouldRevalidateFunctionArgs } from "@remix-run/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { withSentry } from "@sentry/remix";
import type {
  HeadersFunction,
  LinkDescriptor,
  LoaderFunctionArgs,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { route } from "routes-gen";
import faviconUrl from "~/assets/bolt.svg?url";
import background from "~/assets/login-background.svg";
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
  const nonce = useNonce();

  return (
    <html lang="en" className="font-manrope">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Welcome to Boltbetz!" />

        <meta property="og:title" content="Boltbetz" />
        <meta property="og:description" content="Welcome to Boltbetz!" />
        <meta
          property="og:image"
          content="https://boltbetz-web.vercel.app/og-logo.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://boltbetz-web.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boltbetz" />
        <meta name="twitter:description" content="Welcome to Boltbetz!" />
        <meta
          name="twitter:image"
          content="https://boltbetz-web.vercel.app/og-logo.jpg"
        />

        <title>Boltbetz</title>
        <link rel="canonical" href="https://boltbetz-web.vercel.app/" />

        <Meta />
        <Links />
      </head>
      <body
        className="flex min-h-screen flex-col items-center justify-center bg-gray-50 bg-contain bg-center bg-no-repeat lg:bg-cover"
        style={{
          // fontFamily: "system-ui, sans-serif",
          lineHeight: "1.8",
          backgroundImage: `url(${background})`,
        }}
      >
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default withSentry(App);
