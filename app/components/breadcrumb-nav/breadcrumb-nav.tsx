import clsx from "clsx";

export function BreadcrumbNav({
  padding,
  ...props
}: React.ComponentPropsWithoutRef<"nav"> & { padding?: "narrow" }) {
  return (
    <nav
      {...props}
      className={clsx("flex flex-wrap items-center gap-2 p-4 md:gap-3 md:p-8", {
        "lg:px-10": padding === undefined,
        "lg:px-8": padding === "narrow",
      })}
    />
  );
}
