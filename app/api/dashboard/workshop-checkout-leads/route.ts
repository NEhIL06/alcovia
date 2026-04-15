import { NextRequest } from "next/server"

import { proxyJsonGet } from "@/lib/n8n-proxy"

const DEFAULT_WORKSHOP_CHECKOUT_LEADS_LIST_WEBHOOK =
  "https://n8n.alcovia.life/webhook/workshop-checkout-leads-list"

export async function GET(req: NextRequest) {
  return proxyJsonGet(
    req,
    [
      "WORKSHOP_CHECKOUT_LEADS_LIST_URL",
      "N8N_WORKSHOP_CHECKOUT_LEADS_LIST_URL",
    ],
    DEFAULT_WORKSHOP_CHECKOUT_LEADS_LIST_WEBHOOK
  )
}
