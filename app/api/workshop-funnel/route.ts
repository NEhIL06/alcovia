import { NextRequest } from "next/server"

import { proxyJsonPost } from "@/lib/n8n-proxy"

const DEFAULT_WORKSHOP_FUNNEL_WEBHOOK = "https://n8n.alcovia.life/webhook/workshop-funnel"

export async function POST(req: NextRequest) {
  return proxyJsonPost(
    req,
    ["WORKSHOP_FUNNEL_WEBHOOK_URL", "N8N_WORKSHOP_FUNNEL_WEBHOOK_URL"],
    DEFAULT_WORKSHOP_FUNNEL_WEBHOOK
  )
}
