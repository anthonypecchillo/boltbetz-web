import type { ActionFunctionArgs } from "@vercel/remix";
import { logout } from "~/utils/request.server";

export async function action({ request }: ActionFunctionArgs) {
  return await logout(request);
}
