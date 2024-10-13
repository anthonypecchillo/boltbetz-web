/**
 * This file is mostly generated from the `remix reveal entry.client` command.
 * However, it's been modified to include Sentry's BrowserTracing integration.
 */
//
import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { StrictMode, startTransition, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://1a78c50043146f9f1727d2e93fafcddb@o4508110816411648.ingest.us.sentry.io/4508110846296064",
    integrations: [
      Sentry.browserTracingIntegration({ useEffect, useLocation, useMatches }),
      // See this Git Issue for rationale behind eslint-disable on next line:
      // https://github.com/getsentry/sentry-javascript/issues/9728
      // eslint-disable-next-line
      Sentry.replayIntegration({
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
      }),
    ],
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/dev\.app\.boltbetz\.com/,
      /^https:\/\/app\.boltbetz\.com/,
      /^https:\/\/boltbetz-web\.vercel\.app/,
    ],
    tracesSampleRate: 0.1,
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
