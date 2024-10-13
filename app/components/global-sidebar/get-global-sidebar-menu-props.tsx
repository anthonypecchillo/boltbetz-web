import clsx from "clsx";

export type GetGlobalSidebarMenuProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    collapsed: boolean;
  };

export function getGlobalSidebarMenuProps<T extends "div">(
  type: T,
  props: GetGlobalSidebarMenuProps<T>,
): React.ComponentPropsWithoutRef<T> {
  switch (type) {
    case "div": {
      const { collapsed, ...rest } = props as GetGlobalSidebarMenuProps<"div">;
      return {
        className: clsx(
          "flex grow flex-col gap-y-2 overflow-y-auto bg-inherit p-6 lg:pt-0",
          {
            "lg:px-0 lg:pb-5": !collapsed,
            "lg:p-0 lg:gap-y-3": collapsed,
          },
        ),
        ...rest,
      } as React.ComponentPropsWithoutRef<T>;
    }
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
