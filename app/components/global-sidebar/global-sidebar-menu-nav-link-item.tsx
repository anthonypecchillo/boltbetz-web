import { NavLink } from "@remix-run/react";
import { useContext } from "react";
import { genericForwardRef } from "~/utils/react";
import type { GetGlobalSidebarMenuItemProps } from "./get-global-sidebar-menu-item-props";
import { getGlobalSidebarMenuItemProps } from "./get-global-sidebar-menu-item-props";
import { GlobalSidebarCollapsedContext } from "./global-sidebar-collapsed-context";

export const GlobalSidebarMenuNavLinkItem = genericForwardRef<
  React.ElementRef<typeof NavLink>,
  Omit<GetGlobalSidebarMenuItemProps<typeof NavLink>, "collapsed">
>(function GlobalSidebarMenuNavLinkItem(props, ref) {
  const collapsed = useContext(GlobalSidebarCollapsedContext);
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      ref={ref}
      {...getGlobalSidebarMenuItemProps(NavLink, { collapsed, ...props })}
    />
  );
});
