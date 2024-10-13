import type { ErrorResponse } from "@remix-run/react";
import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { isErrorMessage, isValidationErrorMessage } from "~/utils/data";
import { getErrorMessage } from "~/utils/error";

type StatusHandler = (props: StatusHandlerProps) => JSX.Element | null;

type StatusHandlerProps = {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
};

function getErrorMessageFromErrorResponse(
  error: Omit<ErrorResponse, "data"> & { data: unknown },
) {
  if (typeof error.data === "string") {
    return error.data;
  } else if (isErrorMessage(error.data)) {
    return error.data.payload.error.message;
  } else if (isValidationErrorMessage(error.data)) {
    return error.data.payload.validationError.message;
  }

  return error.statusText;
}

export function DefaultGenericStatusHandler({ error }: StatusHandlerProps) {
  return (
    <>
      <h2 className="text-9xl font-bold text-gray-200">{error.status}</h2>
      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {getErrorMessageFromErrorResponse(error)}
      </p>
    </>
  );
}

function DefaultUnexpectedErrorHandler(error: unknown) {
  return (
    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {getErrorMessage(error)}
    </p>
  );
}

export function GeneralErrorBoundary({
  GenericStatusHandler = DefaultGenericStatusHandler,
  UnexpectedErrorHandler = DefaultUnexpectedErrorHandler,
  statusHandlers,
}: {
  GenericStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  UnexpectedErrorHandler?: (props: { error: unknown }) => JSX.Element | null;
}) {
  const error = useRouteError();
  const params = useParams();

  if (typeof document !== "undefined") {
    console.error(error);
  }

  if (!isRouteErrorResponse(error)) {
    if (process.env.NODE_ENV === "production") {
      captureRemixErrorBoundaryError(error);
    }

    return (
      <article className="container mx-auto flex grow flex-col items-center justify-center px-10 py-20">
        <UnexpectedErrorHandler error={error} />
      </article>
    );
  }

  if (error.status >= 500 && process.env.NODE_ENV === "production") {
    captureRemixErrorBoundaryError(error);
  }

  const ErrorComponent = statusHandlers?.[error.status] ?? GenericStatusHandler;

  return (
    <article className="container mx-auto flex grow flex-col items-center justify-center px-10 py-20">
      <ErrorComponent error={error} params={params} />
    </article>
  );
}
