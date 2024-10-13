/* eslint-disable no-case-declarations */
import { NavLink } from "@remix-run/react";
import clsx from "clsx";

export type GetGlobalSidebarMenuBackProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    iconLeft?: React.ReactNode;
    collapsed: boolean;
  };

export function getGlobalSidebarMenuBackProps<T extends typeof NavLink>(
  type: T,
  props: GetGlobalSidebarMenuBackProps<T>,
): React.ComponentPropsWithoutRef<T> {
  switch (type) {
    case NavLink:
      const { collapsed, iconLeft, children, ...rest } =
        props as GetGlobalSidebarMenuBackProps<typeof NavLink>;
      return {
        className: clsx(
          "sticky top-0 flex items-center bg-inherit text-xs text-blue-500 underline decoration-blue-400",
          {
            hidden: collapsed,
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
              <span className="shrink-0">{iconLeft}</span>
            ) : undefined}
            <span className="w-0 grow truncate">
              {typeof children === "function" ? children(props) : children}
            </span>
          </>
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}
