import SignUpClient from "./SignUpClient";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("signUp");
  return { title };
}

export default function SignUpPage() {
  return <SignUpClient />;
}
