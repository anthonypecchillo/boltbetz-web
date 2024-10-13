import type { TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";

export function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) {
    return false;
  }
  return response.headers.has("Location");
}

export const extractMessageOrThrow =
  <T extends { type: string }, TType extends T["type"]>(expectedType: TType) =>
  async (response: TypedResponse<T>) => {
    const message = await response.json();

    if (message.type !== expectedType) {
      throw json(message, { status: response.status });
    }

    return message as Extract<T, { type: TType }>;
  };

export function assertResponse(
  condition: unknown,
  message = "Bad Request",
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(message, {
      status: 400,
      ...responseInit,
    });
  }
}
