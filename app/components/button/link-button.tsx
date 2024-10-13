import { Link } from "@remix-run/react";
import { genericForwardRef } from "~/utils/react";
import type { GetButtonProps } from "./get-button-props";
import { getButtonProps } from "./get-button-props";

export const LinkButton = genericForwardRef<
  React.ElementRef<typeof Link>,
  GetButtonProps<typeof Link>
>(function LinkButton(props, ref) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <Link {...getButtonProps(Link, props)} ref={ref} />
  );
});
