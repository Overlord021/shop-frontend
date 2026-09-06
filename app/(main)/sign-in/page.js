import SignInClient from "./SignInClient";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("signIn");
  return { title };
}

export default function SignInPage() {
  return <SignInClient />;
}
