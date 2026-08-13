import { NextRequest, NextResponse } from "next/server";

// Proxies order creation to the NestJS backend so the client never needs
// to know internal backend routing. Works for both guest and signed-in users.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  try {
    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ message: "Failed to reach order service" }, { status: 502 });
  }
}
