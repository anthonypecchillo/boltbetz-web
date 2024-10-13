import { NavLink } from "@remix-run/react";
import { useContext } from "react";
import { genericForwardRef } from "~/utils/react";
import type { GetGlobalSidebarMenuBackProps } from "./get-global-sidebar-menu-back-props";
import { getGlobalSidebarMenuBackProps } from "./get-global-sidebar-menu-back-props";
import { GlobalSidebarCollapsedContext } from "./global-sidebar-collapsed-context";

export const GlobalSidebarMenuNavLinkBack = genericForwardRef<
  React.ElementRef<typeof NavLink>,
  Omit<GetGlobalSidebarMenuBackProps<typeof NavLink>, "collapsed">
>(function GlobalSidebarMenuNavLinkBack(props, ref) {
  const collapsed = useContext(GlobalSidebarCollapsedContext);
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      {...getGlobalSidebarMenuBackProps(NavLink, { collapsed, ...props })}
      ref={ref}
    />
  );
});
