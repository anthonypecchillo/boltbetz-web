import { genericForwardRef } from "~/utils/react";
import type { GetButtonProps } from "./get-button-props";
import { getButtonProps } from "./get-button-props";

export const AnchorButton = genericForwardRef<
  React.ElementRef<"a">,
  GetButtonProps<"a">
>(function AnchorButton(props, ref) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...getButtonProps("a", props)} ref={ref} />
  );
});
