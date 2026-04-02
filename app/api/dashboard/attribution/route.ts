import { NextRequest } from "next/server"

import { proxyJsonGet } from "@/lib/n8n-proxy"

const DEFAULT_ATTRIBUTION_DASHBOARD_URL = "https://n8n.alcovia.life/webhook/dashboard-attribution"

export async function GET(req: NextRequest) {
  return proxyJsonGet(
    req,
    ["ATTRIBUTION_DASHBOARD_URL", "N8N_ATTRIBUTION_DASHBOARD_URL"],
    DEFAULT_ATTRIBUTION_DASHBOARD_URL
  )
}
