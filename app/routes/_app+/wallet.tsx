import type { LoaderFunctionArgs, MetaDescriptor } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";
import { getRequiredUserHeaders } from "~/services/auth.server";

export function meta() {
  return [{ title: "Wallet" }] satisfies MetaDescriptor[];
}

export async function loader({ request }: LoaderFunctionArgs) {
  // const headers = mergeHeaders(
  //   getRequestIdHeaders(request),
  //   await getRequiredUserHeaders(request),
  // );

  // TODO: Delete this
  const headers = await getRequiredUserHeaders(request);

  // const {
  //   payload: { user },
  // } = await dataFnMiddleware(
  //   request,
  //   getUser({
  //     headers,
  //   }),
  // ).then(extractMessageOrThrow("getUser"));

  // return json({ user });
  return json(headers);
}

export default function Route() {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Wallet Header */}
      <div className="mb-2 mt-14 flex items-center justify-between px-4">
        <h1 className="text-title2 font-semibold text-white">Wallet</h1>
        <button className="rounded-md bg-gray-800 p-2 text-white">
          <Icon name="gear" />
        </button>
      </div>

      {/* Balance Section */}
      <div className="mb-6 px-4 text-white">
        <div className="mb-10 flex items-center">
          <Icon name="wallet" />
          <span className="px-1.5 text-xl font-bold">Available Balance</span>
        </div>
        <h2 className="text-center text-title1 font-bold">$1,547,429.75</h2>
      </div>

      <div className="h-full bg-gray-100 p-4">
        <div className="flex flex-col rounded-b-lg bg-white px-3 py-6 shadow-custom">
          {/* Buttons */}
          <div className="space-y-4">
            <Button space="md" fullWidth>
              Add Money
            </Button>
            <Button intent="tertiary" space="md" fullWidth>
              Withdraw Funds
            </Button>
            <Button intent="accent" space="md" fullWidth>
              Tip Bartender
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
