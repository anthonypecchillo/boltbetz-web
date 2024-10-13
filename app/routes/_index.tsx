import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import type { MetaDescriptor } from "@vercel/remix";
import { useEffect } from "react";
import background from "~/assets/login-background.svg";
import { AuthButton } from "~/components/auth-button";
import { Logo } from "~/components/logo";
import type { loader as rootLoader } from "~/root";

export function meta() {
  return [
    { title: "Boltbetz" },
    { name: "description", content: "Welcome to Boltbetz!" },
  ] satisfies MetaDescriptor[];
}

export default function Index() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  const navigate = useNavigate();

  const boltbetzUser = rootLoaderData?.session?.boltbetzUser;
  const isLoggedIn = Boolean(boltbetzUser);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/wallet");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 bg-contain bg-center bg-no-repeat lg:bg-cover"
      style={{
        // fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        backgroundImage: `url(${background})`,
      }}
    >
      {!boltbetzUser ? (
        <>
          <div className="flex w-full max-w-xl justify-center">
            <Logo />
          </div>
          <AuthButton />
          <span className="mt-6 text-2xl text-white">
            ⚡️ December 2024 ⚡️
          </span>
        </>
      ) : undefined}
    </div>
  );
}
