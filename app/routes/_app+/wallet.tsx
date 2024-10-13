import type { MetaDescriptor } from "@remix-run/node";
import background from "~/assets/login-background.svg";

export function meta() {
  return [{ title: "Wallet" }] satisfies MetaDescriptor[];
}

export default function Route() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 bg-contain bg-center bg-no-repeat lg:bg-cover"
      style={{
        // fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        backgroundImage: `url(${background})`,
      }}
    ></div>
  );
}
