import { Link } from "@remix-run/react";
import clsx from "clsx";
import { cloneElement } from "react";

export type GetButtonProps<T extends React.ElementType> = {
  fullWidth?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  intent?: "secondary" | "tertiary" | "accent" | "destructive";
  space?: "md" | "lg";
} & React.ComponentPropsWithoutRef<T>;

function classNameConfig<T extends React.ElementType>({
  space,
  fullWidth,
  intent,
}: Pick<GetButtonProps<T>, "fullWidth" | "space" | "intent">) {
  return clsx(getButtonSpaceClasses(space, undefined), {
    "flex w-full": fullWidth,
    "inline-flex": !fullWidth,
    "bg-green-600 text-white border-transparent hover:bg-green-700 focus:ring-2 focus:ring-gray-900 active:bg-green-800 aria-pressed:bg-green-900 aria-disabled:text-gray-300 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:aria-disabled:bg-gray-100":
      intent === undefined,
    "bg-white text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 focus:ring-2 focus:ring-gray-900 active:bg-gray-300 aria-pressed:bg-gray-300 aria-disabled:border-gray-300 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:disabled:bg-white hover:aria-disabled:bg-white":
      intent === "secondary",
    "bg-black text-white border-transparent hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 active:bg-gray-700 aria-pressed:bg-gray-900 aria-disabled:text-gray-300 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:aria-disabled:bg-gray-100":
      intent === "tertiary",
    "bg-white text-green-600 border-green-600 hover:bg-green-50 hover:border-green-700 focus:ring-2 focus:ring-green-700 active:bg-green-100 active:text-green-700 aria-pressed:bg-green-300 aria-disabled:border-green-300 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:disabled:bg-white hover:aria-disabled:bg-white":
      intent === "accent",
    "bg-red-500 text-white border-transparent hover:bg-red-600 focus:ring-2 focus:ring-gray-900 active:bg-red-700 aria-pressed:bg-red-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent aria-disabled:bg-gray-200 aria-disabled:text-gray-500 aria-disabled:border-transparent":
      intent === "destructive",
  });
}

export function getButtonSpaceClasses(
  space: GetButtonProps<React.ElementType>["space"],
  breakpoint: "sm" | "md" | "lg" | undefined,
) {
  switch (breakpoint) {
    // case "lg":
    //   return clsx({
    //     "lg:py-2 lg:px-4 lg:text-sm": space === "md",
    //     "lg:py-3 lg:px-10 lg:text-sm": space === "lg",
    //   });
    // case "md":
    //   return clsx({
    //     "md:py-2 md:px-4 md:text-sm": space === "md",
    //     "md:py-3 md:px-10 md:text-sm": space === "lg",
    //   });
    default:
      return clsx({
        "py-3 px-6 rounded-md text-body2": space === "md",
        "py-3 px-10 rounded-lg": space === "lg",
      });
  }
}

export function getButtonProps<
  T extends typeof Link | "button" | "a" | "label",
>(type: T, props: GetButtonProps<T>): React.ComponentPropsWithoutRef<T> {
  switch (type) {
    case "button": {
      const {
        space,
        fullWidth,
        intent,
        children,
        iconLeft,
        iconRight,
        className,
        ...rest
      } = props as GetButtonProps<"button">;
      return {
        className: clsx(
          "cursor-pointer select-none items-center justify-center gap-x-1.5 whitespace-nowrap rounded border text-center font-semibold outline-none disabled:cursor-default aria-disabled:cursor-default",
          classNameConfig({ space, fullWidth, intent }),
          className,
        ),
        children: (
          <>
            {iconLeft ? (
              <span>
                {cloneElement(iconLeft, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconLeft.props.className,
                  ),
                })}
              </span>
            ) : undefined}
            <span className="grow">{children}</span>
            {iconRight ? (
              <span>
                {cloneElement(iconRight, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconRight.props.className,
                  ),
                })}
              </span>
            ) : undefined}
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }
    case Link: {
      const {
        space,
        fullWidth,
        intent,
        children,
        iconLeft,
        iconRight,
        className,
        ...rest
      } = props as GetButtonProps<typeof Link>;
      return {
        className: clsx(
          "cursor-pointer select-none items-center justify-center gap-x-1.5 whitespace-nowrap rounded border text-center font-semibold outline-none disabled:cursor-default aria-disabled:cursor-default",
          classNameConfig({ space, fullWidth, intent }),
          className,
        ),
        children: (
          <>
            {iconLeft ? (
              <span>
                {cloneElement(iconLeft, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconLeft.props.className,
                  ),
                })}
              </span>
            ) : undefined}
            <span className="grow">{children}</span>
            {iconRight ? (
              <span>
                {cloneElement(iconRight, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconRight.props.className,
                  ),
                })}
              </span>
            ) : undefined}
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }

    case "a": {
      const {
        space,
        fullWidth,
        intent,
        children,
        iconLeft,
        iconRight,
        className,
        ...rest
      } = props as GetButtonProps<"a">;
      return {
        className: clsx(
          "cursor-pointer select-none items-center justify-center gap-x-1.5 whitespace-nowrap rounded border text-center font-semibold outline-none disabled:cursor-default aria-disabled:cursor-default",
          classNameConfig({ space, fullWidth, intent }),
          className,
        ),
        children: (
          <>
            {iconLeft ? (
              <span>
                {cloneElement(iconLeft, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconLeft.props.className,
                  ),
                })}
              </span>
            ) : undefined}
            <span className="grow">{children}</span>
            {iconRight ? (
              <span>
                {cloneElement(iconRight, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconRight.props.className,
                  ),
                })}
              </span>
            ) : undefined}
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }

    case "label": {
      const {
        space,
        fullWidth,
        intent,
        children,
        iconLeft,
        iconRight,
        className,
        ...rest
      } = props as GetButtonProps<"label">;
      return {
        className: clsx(
          "cursor-pointer select-none items-center justify-center gap-x-1.5 whitespace-nowrap rounded border text-center font-semibold outline-none disabled:cursor-default aria-disabled:cursor-default",
          classNameConfig({ space, fullWidth, intent }),
          className,
        ),
        children: (
          <>
            {iconLeft ? (
              <span>
                {cloneElement(iconLeft, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconLeft.props.className,
                  ),
                })}
              </span>
            ) : undefined}
            <span className="grow">{children}</span>
            {iconRight ? (
              <span>
                {cloneElement(iconRight, {
                  className: clsx(
                    {
                      "size-4": space === "md",
                      "size-6": space === "lg",
                    },
                    iconRight.props.className,
                  ),
                })}
              </span>
            ) : undefined}
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
