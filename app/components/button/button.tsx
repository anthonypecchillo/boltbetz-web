import { genericForwardRef } from "~/utils/react";
import type { GetButtonProps } from "./get-button-props";
import { getButtonProps } from "./get-button-props";

export const Button = genericForwardRef<
  React.ElementRef<"button">,
  GetButtonProps<"button">
>(function Button(props, ref) {
  return <button {...getButtonProps("button", props)} ref={ref} />;
});
