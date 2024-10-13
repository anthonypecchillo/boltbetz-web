import { NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Spinner } from "../spinner";

export type GetGlobalSidebarMenuItemProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    collapsed: boolean;
    title: string;
  };

export function getGlobalSidebarMenuItemProps<
  T extends "button" | typeof NavLink,
>(
  type: T,
  props: GetGlobalSidebarMenuItemProps<T>,
): React.ComponentPropsWithoutRef<T> {
  switch (type) {
    case NavLink: {
      const { children, iconLeft, iconRight, collapsed, ...rest } =
        props as GetGlobalSidebarMenuItemProps<typeof NavLink>;
      return {
        className: clsx(
          "group flex items-center gap-x-2 border-transparent text-left text-sm font-medium text-sidebarInactiveText transition-colors hover:text-white hover:underline aria-current-page:border-l-4 aria-current-page:border-green-400 aria-current-page:bg-sidebarActiveBgColor aria-current-page:text-white",
          {
            "p-3 w-full": !collapsed,
            "p-1.5 lg:self-center": collapsed,
          },
        ),
        children: (
          props: React.ComponentPropsWithoutRef<
            // eslint-disable-next-line @typescript-eslint/ban-types
            Extract<typeof children, Function>
          >,
        ) => (
          <>
            {iconLeft ? (
              <span className="shrink-0">
                {props.isPending ? (
                  <Spinner
                    aria-label="Loading..."
                    className="animate-spin fill-blue-700 text-gray-300"
                    role="status"
                  />
                ) : (
                  iconLeft
                )}
              </span>
            ) : undefined}
            <span
              className={clsx("w-0 grow truncate", {
                "lg:hidden": collapsed,
              })}
            >
              {typeof children === "function" ? children(props) : children}
            </span>
            {iconRight ? (
              <span
                className={clsx("shrink-0 rounded-full", {
                  "lg:hidden": collapsed,
                })}
              >
                {iconRight}
              </span>
            ) : undefined}
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }
    case "button": {
      const { children, iconLeft, iconRight, collapsed, ...rest } =
        props as GetGlobalSidebarMenuItemProps<"button">;
      return {
        className: clsx(
          "group flex items-center gap-x-2 rounded-lg border border-transparent text-left text-sm font-medium text-sidebarInactiveText transition-colors hover:bg-blue-50 hover:text-blue-600 aria-pressed:border-blue-300 aria-pressed:bg-blue-100 aria-pressed:text-blue-700",
          {
            "p-3 w-full": !collapsed,
            "lg:p-1.5 lg:w-auto lg:self-center": collapsed,
          },
        ),
        children: (
          <>
            {iconLeft ? (
              <span className="shrink-0">{iconLeft}</span>
            ) : undefined}
            <span
              className={clsx("w-0 grow truncate", {
                "lg:hidden": collapsed,
              })}
            >
              {children}
            </span>
            {iconRight ? (
              <span
                className={clsx("shrink-0 rounded-full", {
                  "lg:hidden": collapsed,
                })}
              >
                {iconRight}
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
