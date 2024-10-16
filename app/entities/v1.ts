export type Message<
  TType extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TPayload extends Record<string, any>,
> = {
  payload: TPayload;
  type: TType;
};

export type Success = { message: string };

export type Error = {
  message: string;
};

export type ValidationError = {
  errors: {
    [Key in "query" | "body" | "headers" | "params"]?: Record<string, string>;
  };
  message: string;
};

export type ErrorMessage = Message<"error", { error: Error }>;
export type ValidationErrorMessage = Message<
  "validationError",
  { validationError: ValidationError }
>;

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string | null;
// };

export type User = {
  sub: string;
  name: string;
  email: string;
  picture: string;
};
