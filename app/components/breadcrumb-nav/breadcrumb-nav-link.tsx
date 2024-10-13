import { NavLink } from "@remix-run/react";
import clsx from "clsx";

export function BreadcrumbNavLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavLink>) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      {...props}
      className="inline-flex items-center gap-x-1.5 text-sm/7 font-medium text-blue-700 duration-100 ease-linear md:gap-x-2"
    >
      {(childrenProps) => (
        <>
          <span
            className={clsx({
              "underline decoration-gray-400 underline-offset-6":
                !childrenProps.isActive,
            })}
          >
            {children instanceof Function ? children(childrenProps) : children}
          </span>
          {childrenProps.isActive ? undefined : (
            <span aria-hidden className="pl-1">
              /
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
