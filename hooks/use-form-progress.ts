"use client"

import { useCallback, useEffect, useRef } from "react"

const SESSION_STORAGE_PREFIX = "fp_session_id_"
const THROTTLE_INTERVAL_MS = 1000

export type FormProgressId = "workshop_checkout" | "registration_modal"

export type FormProgressSnapshot = Record<string, string | number | boolean | null | undefined>

interface UseFormProgressOptions {
  formId: FormProgressId
  active: boolean
  getSnapshot: () => FormProgressSnapshot
  formOpenSource?: string
}

interface UseFormProgressReturn {
  notifyChange: () => void
  flush: (extras?: { submitted?: boolean }) => void
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : undefined
}

function getOrCreateSessionId(formId: string): string {
  if (typeof window === "undefined") return ""
  const key = SESSION_STORAGE_PREFIX + formId
  try {
    let sid = window.sessionStorage.getItem(key)
    if (!sid) {
      const uuid =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
      sid = `${formId}-${uuid}`
      window.sessionStorage.setItem(key, sid)
    }
    return sid
  } catch {
    return `${formId}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  }
}

function readUtmParams(): Record<string, string | undefined> {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    ad_id: params.get("ad_id") || params.get("adset_id") || undefined,
  }
}

function readTrafficSource(): string {
  if (typeof window === "undefined") return ""
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get("utm_source")
  if (utmSource) return utmSource
  const ref = document.referrer
  if (!ref) return "direct"
  try {
    const host = new URL(ref).hostname
    if (host.includes("facebook") || host.includes("fb.com") || host.includes("instagram")) return "meta"
    if (host.includes("google")) return "google"
    if (host.includes("linkedin")) return "linkedin"
    if (host.includes("alcovia.life")) return "internal"
    return host
  } catch {
    return "direct"
  }
}

function isSnapshotMeaningful(snapshot: FormProgressSnapshot): boolean {
  for (const value of Object.values(snapshot)) {
    if (value === undefined || value === null) continue
    if (typeof value === "boolean") continue
    if (typeof value === "number") {
      if (value !== 0) return true
      continue
    }
    if (typeof value === "string" && value.trim().length > 0) return true
  }
  return false
}

function snapshotFingerprint(snapshot: FormProgressSnapshot): string {
  const keys = Object.keys(snapshot).sort()
  return keys.map((k) => `${k}=${String(snapshot[k] ?? "")}`).join("|")
}

function sendPayload(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload)
  const url = "/api/form-progress"
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" })
      const ok = navigator.sendBeacon(url, blob)
      if (ok) return
    }
  } catch {
    // fall through to fetch
  }
  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // swallow
  }
}

export function useFormProgress({
  formId,
  active,
  getSnapshot,
  formOpenSource,
}: UseFormProgressOptions): UseFormProgressReturn {
  const sessionIdRef = useRef<string>("")
  const firstSeenAtRef = useRef<string>("")
  const saveCountRef = useRef<number>(0)
  const lastFingerprintRef = useRef<string>("")
  const lastSendAtRef = useRef<number>(0)
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submittedRef = useRef<boolean>(false)
  const getSnapshotRef = useRef(getSnapshot)
  const formOpenSourceRef = useRef(formOpenSource)
  const activeRef = useRef(active)

  useEffect(() => {
    getSnapshotRef.current = getSnapshot
  }, [getSnapshot])

  useEffect(() => {
    formOpenSourceRef.current = formOpenSource
  }, [formOpenSource])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const buildPayload = useCallback(
    (extras?: { submitted?: boolean }) => {
      const snapshot = getSnapshotRef.current()
      if (!sessionIdRef.current) sessionIdRef.current = getOrCreateSessionId(formId)
      if (!firstSeenAtRef.current) firstSeenAtRef.current = new Date().toISOString()

      const filledFields = Object.entries(snapshot)
        .filter(([, v]) => {
          if (v === undefined || v === null) return false
          if (typeof v === "string") return v.trim().length > 0
          if (typeof v === "boolean") return v === true
          return true
        })
        .map(([k]) => k)

      const utm = readUtmParams()
      const submitted = extras?.submitted ?? submittedRef.current

      return {
        session_id: sessionIdRef.current,
        form_id: formId,
        page_url: typeof window !== "undefined" ? window.location.pathname : "",
        partial_data: snapshot,
        fields_filled: filledFields,
        form_open_source: formOpenSourceRef.current || "",
        traffic_source: readTrafficSource(),
        referrer: typeof document !== "undefined" ? document.referrer || "direct" : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        ad_id: utm.ad_id,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        first_seen_at: firstSeenAtRef.current,
        last_updated_at: new Date().toISOString(),
        save_count: ++saveCountRef.current,
        submitted,
      }
    },
    [formId]
  )

  const flush = useCallback(
    (extras?: { submitted?: boolean }) => {
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current)
        pendingTimerRef.current = null
      }
      const snapshot = getSnapshotRef.current()
      if (!isSnapshotMeaningful(snapshot) && !extras?.submitted) return
      const fingerprint = snapshotFingerprint(snapshot) + (extras?.submitted ? "|submitted" : "")
      if (fingerprint === lastFingerprintRef.current && !extras?.submitted) return
      lastFingerprintRef.current = fingerprint
      lastSendAtRef.current = Date.now()
      if (extras?.submitted) submittedRef.current = true
      sendPayload(buildPayload(extras))
    },
    [buildPayload]
  )

  const notifyChange = useCallback(() => {
    if (!activeRef.current) return
    const snapshot = getSnapshotRef.current()
    if (!isSnapshotMeaningful(snapshot)) return
    const fingerprint = snapshotFingerprint(snapshot)
    if (fingerprint === lastFingerprintRef.current) return

    const now = Date.now()
    const elapsed = now - lastSendAtRef.current
    const wait = Math.max(THROTTLE_INTERVAL_MS - elapsed, 0)

    if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current)
    pendingTimerRef.current = setTimeout(() => {
      pendingTimerRef.current = null
      flush()
    }, wait)
  }, [flush])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush()
    }
    const handlePageHide = () => flush()

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("pagehide", handlePageHide)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("pagehide", handlePageHide)
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current)
        pendingTimerRef.current = null
      }
    }
  }, [flush])

  return { notifyChange, flush }
}
