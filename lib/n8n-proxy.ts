import { NextRequest, NextResponse } from "next/server"

type EnvKey = string

function resolveTargetUrl(envKeys: EnvKey[], fallbackUrl?: string): string | undefined {
  for (const key of envKeys) {
    const value = process.env[key]?.trim()
    if (value) return value
  }

  return fallbackUrl?.trim() || undefined
}

export async function proxyJsonPost(
  req: NextRequest,
  envKeys: EnvKey[],
  fallbackUrl?: string
) {
  const targetUrl = resolveTargetUrl(envKeys, fallbackUrl)
  if (!targetUrl) {
    return NextResponse.json(
      { ok: false, error: "No upstream webhook configured." },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const text = await response.text()
    let json: unknown = null

    if (text) {
      try {
        json = JSON.parse(text)
      } catch {
        json = { raw: text }
      }
    }

    return NextResponse.json(json ?? { ok: response.ok }, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to proxy webhook request.",
      },
      { status: 500 }
    )
  }
}

export async function proxyJsonGet(
  req: NextRequest,
  envKeys: EnvKey[],
  fallbackUrl?: string
) {
  const targetUrl = resolveTargetUrl(envKeys, fallbackUrl)
  if (!targetUrl) {
    return NextResponse.json([], { status: 200 })
  }

  try {
    const upstreamUrl = new URL(targetUrl)
    req.nextUrl.searchParams.forEach((value, key) => {
      upstreamUrl.searchParams.set(key, value)
    })

    const response = await fetch(upstreamUrl.toString(), {
      method: "GET",
      cache: "no-store",
    })

    const text = await response.text()
    let json: unknown = []

    if (text) {
      try {
        json = JSON.parse(text)
      } catch {
        json = []
      }
    }

    return NextResponse.json(json, {
      status: response.ok ? 200 : response.status,
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate", "CDN-Cache-Control": "no-store" },
    })
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
