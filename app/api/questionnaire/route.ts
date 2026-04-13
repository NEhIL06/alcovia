import { NextRequest } from "next/server"

import { proxyJsonPost } from "@/lib/n8n-proxy"

const DEFAULT_QUESTIONNAIRE_WEBHOOK = process.env.QUESTIONNAIRE_WEBHOOK_URL 

export async function POST(req: NextRequest) {
  return proxyJsonPost(
    req,
    ["QUESTIONNAIRE_WEBHOOK_URL", "N8N_QUESTIONNAIRE_WEBHOOK_URL"],
    DEFAULT_QUESTIONNAIRE_WEBHOOK
  )
}
