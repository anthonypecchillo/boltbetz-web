import type * as V1 from "~/entities/v1";

function transformPath(path: string): string {
  // Replace all occurrences of a slash followed by a number with the bracket notation
  return path.replace(/\/(\d+)/g, "[$1]").replace(/\//g, ".");
}
export function errorMessageToReplyOptions(
  message: V1.ErrorMessage | V1.ValidationErrorMessage,
) {
  switch (message.type) {
    case "error":
      return {
        formErrors: [message.payload.error.message],
      };
    case "validationError":
      return {
        formErrors: [message.payload.validationError.message],
        fieldErrors: message.payload.validationError.errors.body
          ? Object.entries(message.payload.validationError.errors.body).reduce(
              (record, [key, value]) => {
                record[transformPath(key)] = [value];
                return record;
              },
              {} as Record<string, string[]>,
            )
          : undefined,
      };
  }
}

function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

export function getNonBlankStringOrDefault<const U = undefined>(
  value: unknown,
  defaultValue?: U,
): string | U {
  return isNonBlankString(value) ? value : (defaultValue as U);
}

function isMessage(
  data: unknown,
): data is V1.Message<string, Record<string, unknown>> {
  return (
    isNonNullObject(data) &&
    "type" in data &&
    typeof data.type === "string" &&
    "payload" in data &&
    isNonNullObject(data.payload)
  );
}

export function isErrorMessage(data: unknown): data is V1.ErrorMessage {
  return (
    isMessage(data) &&
    data.type === "error" &&
    "error" in data.payload &&
    isNonNullObject(data.payload.error) &&
    "message" in data.payload.error &&
    typeof data.payload.error.message === "string"
  );
}

export function isValidationErrorMessage(
  data: unknown,
): data is V1.ValidationErrorMessage {
  return (
    isMessage(data) &&
    data.type === "validationError" &&
    "validationError" in data.payload &&
    isNonNullObject(data.payload.validationError) &&
    "message" in data.payload.validationError &&
    typeof data.payload.validationError.message === "string" &&
    "errors" in data.payload.validationError &&
    isNonNullObject(data.payload.validationError.errors)
  );
}

export function getStringOrEmptyString(value: unknown) {
  return typeof value !== "string" ? "" : value;
}

export const generalError = {
  type: "error",
  payload: {
    error: {
      message: "Something went wrong. Please try again.",
    },
  },
} satisfies V1.Message<"error", { error: V1.Error }>;

export function getInitFromResponse(response: Response): ResponseInit {
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  };
}
