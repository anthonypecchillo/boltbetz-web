export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    VERCEL: process.env.VERCEL,
  };
}
