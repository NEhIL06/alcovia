import { NextRequest } from "next/server"

import { proxyJsonPost } from "@/lib/n8n-proxy"

const DEFAULT_WORKSHOP_CONFIRMATION_WEBHOOK = "https://n8n.alcovia.life/webhook/workshop-payment-success"

export async function POST(req: NextRequest) {
  return proxyJsonPost(
    req,
    [
      "WORKSHOP_PAYMENT_SUCCESS_WEBHOOK_URL",
      "N8N_WORKSHOP_PAYMENT_SUCCESS_WEBHOOK_URL",
      "WORKSHOP_CONFIRMATION_WEBHOOK_URL",
      "N8N_WORKSHOP_CONFIRMATION_WEBHOOK_URL",
    ],
    DEFAULT_WORKSHOP_CONFIRMATION_WEBHOOK
  )
}
