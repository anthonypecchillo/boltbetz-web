type TypedResponse<T = unknown> = Omit<Response, "json"> & {
  json(): Promise<T>;
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
};

// const DEFAULT_HEADERS_WITH_BODY = {
//   ...DEFAULT_HEADERS,
//   "Content-Type": "application/json",
// };

// function combineUrlAndSearchParams(
//   url: URL,
//   ...urlSearchParams: (URLSearchParams | undefined)[]
// ): URL {
//   const searchParams = mergeUrlSearchParams(
//     url.searchParams,
//     ...urlSearchParams,
//   );
//   if (searchParams.size) {
//     url.search = searchParams.toString();
//   }

//   return url;
// }

// function mergeUrlSearchParams(
//   ...urlSearchParams: (URLSearchParams | undefined)[]
// ) {
//   const mergedUrlSearchParams = new URLSearchParams();

//   for (const searchParams of urlSearchParams) {
//     if (searchParams instanceof URLSearchParams) {
//       searchParams.forEach((value, name) => {
//         mergedUrlSearchParams.append(name, value);
//       });
//     }
//   }

//   return mergedUrlSearchParams;
// }

export function mergeHeaders(
  ...headerInits: (HeadersInit | undefined)[]
): Headers {
  const mergedHeaders = new Headers();
  for (const headerInit of headerInits) {
    if (headerInit instanceof Headers) {
      headerInit.forEach((value, name) => {
        mergedHeaders.append(name, value);
      });
    } else if (Array.isArray(headerInit)) {
      headerInit.forEach(([name, value]) => {
        mergedHeaders.append(name, value);
      });
    } else if (typeof headerInit === "object" && headerInit !== null) {
      Object.entries(headerInit).forEach(([name, value]) => {
        mergedHeaders.append(name, value);
      });
    }
  }

  return mergedHeaders;
}

export function getUser({ headers }: { headers?: HeadersInit }): Promise<
  // TypedResponse<V1.Message<"getUser", { jwt: string; user: V1.User }>>
  TypedResponse<{ sub: string; name: string; email: string; picture: string }>
> {
  return fetch(new URL("/userinfo", process.env.AUTH0_ISSUER_BASE_URL), {
    method: "GET",
    headers: mergeHeaders(headers, DEFAULT_HEADERS),
  });
}
