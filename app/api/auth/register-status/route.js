import { getRegisterStatus } from "@/lib/dal";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const enabled = await getRegisterStatus();
    return NextResponse.json({ enabled });
  } catch (err) {
    console.error("GET /api/auth/register-status error:", err);
    return NextResponse.json({ enabled: true });
  }
}
