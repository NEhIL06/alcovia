import { NextRequest } from "next/server"

import { proxyJsonGet } from "@/lib/n8n-proxy"

const DEFAULT_WORKSHOP_ORDERS_DASHBOARD_URL = "https://n8n.alcovia.life/webhook/dashboard-workshop-orders"

export async function GET(req: NextRequest) {
  return proxyJsonGet(
    req,
    ["WORKSHOP_ORDERS_DASHBOARD_URL", "N8N_WORKSHOP_ORDERS_DASHBOARD_URL"],
    DEFAULT_WORKSHOP_ORDERS_DASHBOARD_URL
  )
}
