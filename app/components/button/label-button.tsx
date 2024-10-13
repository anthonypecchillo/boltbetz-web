import { genericForwardRef } from "~/utils/react";
import type { GetButtonProps } from "./get-button-props";
import { getButtonProps } from "./get-button-props";

export const LabelButton = genericForwardRef<
  React.ElementRef<"label">,
  GetButtonProps<"label">
>(function LabelButton(props, ref) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/label-has-associated-control
    <label {...getButtonProps("label", props)} ref={ref} />
  );
});
