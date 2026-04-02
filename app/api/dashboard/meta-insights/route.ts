import { NextRequest } from "next/server"

import { proxyJsonGet } from "@/lib/n8n-proxy"

const DEFAULT_META_INSIGHTS_DASHBOARD_URL = "https://n8n.alcovia.life/webhook/dashboard-meta-insights"

export async function GET(req: NextRequest) {
  return proxyJsonGet(
    req,
    ["META_INSIGHTS_DASHBOARD_URL", "N8N_META_INSIGHTS_DASHBOARD_URL"],
    DEFAULT_META_INSIGHTS_DASHBOARD_URL
  )
}
