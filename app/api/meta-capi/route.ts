import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PIXEL_ID = process.env.META_PIXEL_ID || "1606881963979917"
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN

function hashSha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ error: "CAPI not configured" }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { event_name, event_id, phone, email, city, source_url, client_user_agent, fbc, fbp, custom_data } = body

    const userData: Record<string, unknown> = {}
    if (phone) userData.ph = [hashSha256(phone)]
    if (email) userData.em = [hashSha256(email)]
    if (city) userData.ct = [hashSha256(city)]
    if (client_user_agent) userData.client_user_agent = client_user_agent
    if (fbc) userData.fbc = fbc
    if (fbp) userData.fbp = fbp

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || undefined
    if (clientIp) userData.client_ip_address = clientIp

    const eventData = {
      data: [
        {
          event_name: event_name || "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: "website",
          event_source_url: source_url || undefined,
          user_data: userData,
          ...(custom_data && typeof custom_data === "object" ? { custom_data } : {}),
        },
      ],
    }

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    )

    const result = await res.json()
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Failed to send event" }, { status: 500 })
  }
}
