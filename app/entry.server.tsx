/**
 * This file is mostly generated from the `remix reveal entry.server` command.
 * However, it's been modified to the Content Security Policy (CSP) headers and
 * nonce generation.
 */

import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import type { AppLoadContext, EntryContext } from "@vercel/remix";
import * as isbotModule from "isbot";
import { randomBytes } from "node:crypto";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { NonceContext } from "./components/nonce";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://1a78c50043146f9f1727d2e93fafcddb@o4508110816411648.ingest.us.sentry.io/4508110846296064",
    tracesSampleRate: 0.1,
  });
}

const NULL_CSP = {};

type CspName =
  | "base-uri"
  | "child-src"
  | "connect-src"
  | "default-src"
  | "font-src"
  | "form-action"
  | "frame-ancestors"
  | "frame-src"
  | "img-src"
  | "media-src"
  | "object-src"
  | "report-uri"
  | "script-src"
  | "style-src"
  | "worker-src";

type Csp = { [key in CspName]?: string[] };

if (!process.env.AUTH0_ISSUER_BASE_URL) {
  throw new Error(
    "Missing required environment variable AUTH0_ISSUER_BASE_URL",
  );
}

const BASE_CSP = {
  "base-uri": ["'none'"],
  "child-src": ["'self'"],
  "connect-src": ["'self'"],
  "default-src": ["'none'"],
  "font-src": ["'self'"],
  "form-action": ["'self'", process.env.AUTH0_ISSUER_BASE_URL],
  "frame-ancestors": ["'none'"],
  "frame-src": [],
  "img-src": ["'self'", "https:", "data:"],
  "media-src": ["'self'"],
  "object-src": ["'none'"],
  "report-uri": [],
  "script-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "worker-src": ["'self'"],
} satisfies Required<Csp>;

const DEVELOPMENT_CSP = {
  "connect-src": ["ws://localhost:3001", "https://*.amazonaws.com"],
} satisfies Csp;

const VERCEL_CSP = {
  "connect-src": [
    "https://vitals.vercel-analytics.com",
    "https://*.amazonaws.com",
  ],
} satisfies Csp;

const VERCEL_PREVIEW_CSP = {
  "connect-src": [
    "https://vercel.live",
    "wss://ws-us3.pusher.com",
    "https://sockjs-us3.pusher.com",
    "https://*.amazonaws.com",
    "https://o4508110816411648.ingest.sentry.io",
  ],
  "font-src": ["https://vercel.live"],
  "frame-src": ["https://vercel.live"],
  "script-src": ["'unsafe-inline'", "https://vercel.live"],
  "style-src": ["'unsafe-inline'", "https://vercel.live"],
} satisfies Csp;

const SENTRY_CSP = {
  "connect-src": [
    "https://o4508110816411648.ingest.sentry.io",
    "https://o4508110816411648.ingest.us.sentry.io",
  ],
  "report-uri": [
    `https://o4508110816411648.ingest.us.sentry.io/api/4508110846296064/security/?sentry_key=1a78c50043146f9f1727d2e93fafcddb&sentry_environment=${process.env.VERCEL_ENV}`,
  ],
  "child-src": ["blob:"],
  "worker-src": ["blob:"],
  "script-src": ["blob:", "https://o4508110816411648.ingest.sentry.io"],
} satisfies Csp;

const GOOGLE_FONTS_CSP = {
  "font-src": ["https://fonts.gstatic.com"],
  "style-src": ["'unsafe-inline'", "https://fonts.googleapis.com"],
};

function mergeCSP(...csps: Csp[]) {
  const merged: Csp = {};
  for (const csp of csps) {
    for (const [key, values] of Object.entries(csp) as [CspName, string[]][]) {
      merged[key] ??= [];
      merged[key] = Array.from(new Set(merged[key]?.concat(values)));
    }
  }
  return merged;
}

const STATIC_CSP = mergeCSP(
  BASE_CSP,
  GOOGLE_FONTS_CSP,
  process.env.NODE_ENV === "development" ? DEVELOPMENT_CSP : NULL_CSP,
  process.env.VERCEL ? VERCEL_CSP : NULL_CSP,
  process.env.VERCEL_ENV === "preview" ? VERCEL_PREVIEW_CSP : NULL_CSP,
  process.env.SENTRY_DSN ? SENTRY_CSP : NULL_CSP,
);

function getCSPHeader(nonce: string) {
  return Object.entries(
    mergeCSP(
      STATIC_CSP,
      process.env.VERCEL_ENV === "preview"
        ? NULL_CSP
        : ({ "script-src": [`'nonce-${nonce}'`] } satisfies Csp),
    ),
  )
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join(";");
}

function getHeaders(nonce: string) {
  return {
    "Content-Security-Policy": getCSPHeader(nonce),
    "Strict-Transport-Security": "max-age=63072000;",
    "X-XSS-Protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "origin-when-cross-origin",
  };
}

// export const handleError = wrapRemixHandleError;

export function handleDataRequest(response: Response) {
  // Set cache-control for data fetches caused by browser navigations
  const cacheControl = response.headers.get("cache-control") || "no-store";
  response.headers.set("cache-control", cacheControl);
  return response;
}

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  return isBotRequest(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
}

function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  // isbot >= 3.8.0, >4
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }

  // isbot < 3.8.0
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }

  return false;
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const nonce = randomBytes(16).toString("hex");
  for (const [key, value] of Object.entries(getHeaders(nonce))) {
    responseHeaders.set(key, value);
  }

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceContext.Provider value={nonce}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </NonceContext.Provider>,
      {
        nonce,
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const nonce = randomBytes(16).toString("hex");
  for (const [key, value] of Object.entries(getHeaders(nonce))) {
    responseHeaders.set(key, value);
  }

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceContext.Provider value={nonce}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </NonceContext.Provider>,
      {
        nonce,
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
