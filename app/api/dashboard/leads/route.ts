import { NextRequest } from "next/server"

import { proxyJsonGet } from "@/lib/n8n-proxy"

const DEFAULT_LEADS_DASHBOARD_URL = "https://n8n.alcovia.life/webhook/dashboard-data"

export async function GET(req: NextRequest) {
  return proxyJsonGet(
    req,
    ["LEADS_DASHBOARD_URL", "N8N_LEADS_DASHBOARD_URL"],
    DEFAULT_LEADS_DASHBOARD_URL
  )
}
