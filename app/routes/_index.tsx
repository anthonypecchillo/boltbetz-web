import type { MetaDescriptor } from "@vercel/remix";
import { AuthButton } from "~/components/auth-button";
import { Logo } from "~/components/logo";
// import { /*useNavigate, */ useRouteLoaderData } from "@remix-run/react";
// import { useEffect } from "react";
// import type { loader as rootLoader } from "~/root";

export function meta() {
  return [
    { title: "Boltbetz" },
    { name: "description", content: "Welcome to Boltbetz!" },
  ] satisfies MetaDescriptor[];
}

export default function Index() {
  // const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  // const navigate = useNavigate();

  // const boltbetzUser = rootLoaderData?.session?.boltbetzUser;
  // const isLoggedIn = Boolean(boltbetzUser);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/wallet");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex w-full max-w-xl justify-center">
        <Logo />
      </div>
      <span className="text-2xl text-white">⚡️ December 2024 ⚡️</span>
      <AuthButton />
    </>
  );
}
