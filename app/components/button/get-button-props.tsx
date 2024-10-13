import { Link } from "@remix-run/react";
import clsx from "clsx";
import { cloneElement } from "react";

export type GetButtonProps<T extends React.ElementType> = {
  fullWidth?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  intent?: "destructive" | "secondary" | "tertiary" | "constructive";
  space?: "xs" | "sm" | "lg";
} & React.ComponentPropsWithoutRef<T>;

function classNameConfig<T extends React.ElementType>({
  space,
  fullWidth,
  intent,
}: Pick<GetButtonProps<T>, "fullWidth" | "space" | "intent">) {
  return clsx(getButtonSpaceClasses(space, undefined), {
    "flex w-full": fullWidth,
    "inline-flex": !fullWidth,
    "bg-red-500 text-white border-transparent hover:bg-red-600 focus:ring-2 focus:ring-gray-900 active:bg-red-700 aria-pressed:bg-red-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent aria-disabled:bg-gray-200 aria-disabled:text-gray-500 aria-disabled:border-transparent":
      intent === "destructive",
    "bg-green-500 text-white border-transparent hover:bg-green-600 focus:ring-2 focus:ring-gray-900 active:bg-green-700 aria-pressed:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent aria-disabled:bg-gray-200 aria-disabled:text-gray-500 aria-disabled:border-transparent":
      intent === "constructive",
    // "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-gray-900 active:bg-gray-400 aria-pressed:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent aria-disabled:bg-gray-200 aria-disabled:text-gray-500 aria-disabled:border-transparent":
    //   intent === "secondary",
    "bg-white text-black border-blue-700 hover:bg-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-700 active:bg-gray-400 aria-pressed:bg-gray-400 aria-disabled:border-gray-300 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:disabled:bg-white hover:aria-disabled:bg-white":
      intent === "secondary",
    "bg-blue-700 text-white border-transparent hover:bg-blue-800 focus:ring-2 focus:ring-gray-900 active:bg-blue-700 aria-pressed:bg-blue-700 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 hover:aria-disabled:bg-blue-700":
      intent === undefined,
    "bg-yellow-500 text-gray-900 border-transparent hover:bg-yellow-600 focus:ring-2 focus:ring-gray-900 active:bg-yellow-700 aria-pressed:bg-yellow-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent aria-disabled:bg-gray-200 aria-disabled:text-gray-500 aria-disabled:border-transparent":
      intent === "tertiary",
  });
}

export function getButtonSpaceClasses(
  space: GetButtonProps<React.ElementType>["space"],
  breakpoint: "sm" | "md" | "lg" | undefined,
) {
  switch (breakpoint) {
    case "lg":
      return clsx({
        "lg:py-1 lg:px-4 lg:text-xs": space === "xs",
        "lg:py-1.5 lg:px-4 lg:text-sm": space === "sm",
        "lg:py-2 lg:px-4 lg:text-sm": space === undefined,
        "lg:py-2.5 lg:px-6 lg:text-sm": space === "lg",
      });
    case "md":
      return clsx({
        "md:py-1 md:px-4 md:text-xs": space === "xs",
        "md:py-1.5 md:px-4 md:text-sm": space === "sm",
        "md:py-2 md:px-4 md:text-sm": space === undefined,
        "md:py-2.5 md:px-6 md:text-sm": space === "lg",
      });
    case "sm":
      return clsx({
        "sm:py-1 sm:px-4 sm:text-xs": space === "xs",
        "sm:py-1.5 sm:px-4 sm:text-sm": space === "sm",
        "sm:py-2 sm:px-4 sm:text-sm": space === undefined,
        "sm:py-2.5 sm:px-6 sm:text-sm sm:rounded": space === "lg",
      });
    default:
      return clsx({
        "py-1 px-2.5 text-sm sm:text-xs": space === "xs",
        "py-1.5 px-4 text-sm": space === "sm",
        "py-2 px-4 text-sm": space === undefined,
        "py-2.5 px-6 rounded-lg": space === "lg",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
                      "size-3.5": space === "xs",
                      "size-4": space === undefined || space === "sm",
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
