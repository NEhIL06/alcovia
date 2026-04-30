import { NextRequest } from "next/server"

import { proxyJsonPost } from "@/lib/n8n-proxy"

const DEFAULT_FORM_PROGRESS_WEBHOOK = "https://n8n.alcovia.life/webhook/form-progress"

export async function POST(req: NextRequest) {
  return proxyJsonPost(
    req,
    ["FORM_PROGRESS_WEBHOOK_URL", "N8N_FORM_PROGRESS_WEBHOOK_URL"],
    DEFAULT_FORM_PROGRESS_WEBHOOK
  )
}
