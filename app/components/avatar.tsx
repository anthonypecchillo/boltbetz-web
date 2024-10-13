import clsx from "clsx";
import { useState } from "react";

function sizeToPx(size: "md" | "lg" | "xl" | "xxl" | "xxxl" | undefined) {
  switch (size) {
    case "md":
      return 32;
    case "lg":
      return 40;
    case "xl":
      return 48;
    case "xxl":
      return 56;
    case "xxxl":
      return 80;
    default:
      return 24;
  }
}

export function Avatar({
  size,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"img"> & {
  size?: "md" | "lg" | "xl" | "xxl" | "xxxl";
  icon?: React.ReactNode;
}) {
  const [shouldFallback, setShouldFallback] = useState(false);
  return props.src && !shouldFallback ? (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...props}
      onError={() => setShouldFallback(true)}
      width={sizeToPx(size)}
      height={sizeToPx(size)}
      className={clsx(
        "inline-flex rounded-full border border-solid border-gray-300 shadow-[0px_0px_0px_1px_#ffffff]",
        {
          "h-6 w-6": size === undefined,
          "h-8 w-8": size === "md",
          "h-10 w-10": size === "lg",
          "h-12 w-12": size === "xl",
          "h-14 w-14": size === "xxl",
          "h-20 w-20": size === "xxxl",
        },
        props.className,
      )}
    />
  ) : (
    <span
      role="img"
      aria-label={props.alt}
      className={clsx(
        "inline-flex cursor-default items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-100 uppercase text-blue-700 shadow-[0px_0px_0px_1px_#ffffff]",
        {
          "h-6 w-6": size === undefined,
          "h-8 w-8": size === "md",
          "h-10 w-10": size === "lg",
          "h-12 w-12": size === "xl",
          "h-14 w-14": size === "xxl",
          "h-20 w-20": size === "xxxl",
        },
        props.className,
      )}
    >
      {icon ?? props.alt?.slice(0, 2)}
    </span>
  );
}
