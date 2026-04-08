"use client"

const DEFAULT_WORKSHOP_PAYMENT_URL = "https://rzp.io/rzp/mbJ5dfd"
const WORKSHOP_EVENT_ENDPOINT = "/api/workshop-funnel"
const WORKSHOP_CHECKOUT_STORAGE_KEY = "alcovia_workshop_checkout_context_v1"

export const WORKSHOP_DETAILS = {
  slug: "nike-playbook-workshop",
  title: "The Nike Playbook: Engineering a Cult Brand",
  dateIso: "2026-04-18",
  dateLabel: "April 18th, 2026",
  locationLabel: "One Horizon Centre, Gurgaon",
  amount: 3999,
  currency: "INR",
  paymentProvider: "razorpay",
} as const

export type WorkshopCtaSource =
  | "hero"
  | "mid"
  | "closing"
  | "mobile_floating"
  | "unknown"

export interface WorkshopTrackingContext {
  ad_id?: string
  checkout_attempt_id: string
  client_user_agent: string
  currency: string
  cta_source?: string
  event_id?: string
  event_name?: string
  fbc?: string
  fbp?: string
  funnel_name: string
  landing_page: string
  page_path: string
  payment_link_url: string
  payment_provider: string
  referrer_raw: string
  source_url: string
  timestamp: string
  traffic_source: string
  utm_campaign?: string
  utm_content?: string
  utm_medium?: string
  utm_source?: string
  utm_term?: string
  value: number
  workshop_date: string
  workshop_slug: string
  workshop_title: string
}

interface WorkshopEventOptions {
  ctaSource?: WorkshopCtaSource
  eventId?: string
}

interface ParsedRazorpayResult {
  errorCode?: string
  errorDescription?: string
  orderId?: string
  paymentId?: string
  signature?: string
  success: boolean
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : undefined
}

export function getWorkshopPaymentUrl(): string {
  return process.env.NEXT_PUBLIC_CULT_STRATEGY_WORKSHOP_PAYMENT_URL?.trim() || DEFAULT_WORKSHOP_PAYMENT_URL
}

export function getTrafficSource(): string {
  if (typeof document === "undefined") return "unknown"
  const referrer = document.referrer
  if (!referrer) return "direct"

  try {
    const hostname = new URL(referrer).hostname.replace("www.", "").replace("l.", "").replace("lm.", "")
    const sourceMap: Record<string, string> = {
      "google.com": "google",
      "google.co.in": "google",
      "bing.com": "bing",
      "yahoo.com": "yahoo",
      "duckduckgo.com": "duckduckgo",
      "chatgpt.com": "chatgpt",
      "chat.openai.com": "chatgpt",
      "perplexity.ai": "perplexity",
      "instagram.com": "instagram",
      "facebook.com": "facebook",
      "fb.com": "facebook",
      "whatsapp.com": "whatsapp",
      "web.whatsapp.com": "whatsapp",
      "twitter.com": "twitter",
      "x.com": "twitter",
      "t.co": "twitter",
      "linkedin.com": "linkedin",
      "youtube.com": "youtube",
      "reddit.com": "reddit",
      "telegram.org": "telegram",
      "web.telegram.org": "telegram",
      "pinterest.com": "pinterest",
      "quora.com": "quora",
      "snapchat.com": "snapchat",
      "alcovia.life": "internal",
    }

    return sourceMap[hostname] || hostname
  } catch {
    return referrer
  }
}

function createTrackingContext(ctaSource?: WorkshopCtaSource): WorkshopTrackingContext {
  const params = new URLSearchParams(window.location.search)

  return {
    ad_id: params.get("ad_id") || undefined,
    checkout_attempt_id: `checkout_${crypto.randomUUID()}`,
    client_user_agent: navigator.userAgent,
    currency: WORKSHOP_DETAILS.currency,
    cta_source: ctaSource,
    fbc: getCookie("_fbc"),
    fbp: getCookie("_fbp"),
    funnel_name: "workshop",
    landing_page: window.location.pathname,
    page_path: window.location.pathname,
    payment_link_url: getWorkshopPaymentUrl(),
    payment_provider: WORKSHOP_DETAILS.paymentProvider,
    referrer_raw: document.referrer || "direct",
    source_url: window.location.href,
    timestamp: new Date().toISOString(),
    traffic_source: getTrafficSource(),
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_source: params.get("utm_source") || undefined,
    utm_term: params.get("utm_term") || undefined,
    value: WORKSHOP_DETAILS.amount,
    workshop_date: WORKSHOP_DETAILS.dateIso,
    workshop_slug: WORKSHOP_DETAILS.slug,
    workshop_title: WORKSHOP_DETAILS.title,
  }
}

function sendBeaconJson(url: string, payload: unknown): boolean {
  if (typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") {
    return false
  }

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" })
    return navigator.sendBeacon(url, blob)
  } catch {
    return false
  }
}

export async function trackWorkshopEvent(
  eventName: string,
  options: WorkshopEventOptions = {}
): Promise<WorkshopTrackingContext> {
  const context = createTrackingContext(options.ctaSource)
  const payload = {
    ...context,
    event_id: options.eventId || `evt_${crypto.randomUUID()}`,
    event_name: eventName,
  }

  const sentViaBeacon = sendBeaconJson(WORKSHOP_EVENT_ENDPOINT, payload)
  if (!sentViaBeacon) {
    fetch(WORKSHOP_EVENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  }

  return payload
}

export function persistWorkshopCheckoutContext(context: WorkshopTrackingContext) {
  if (typeof sessionStorage === "undefined") return
  sessionStorage.setItem(WORKSHOP_CHECKOUT_STORAGE_KEY, JSON.stringify(context))
}

export function readWorkshopCheckoutContext(): WorkshopTrackingContext | null {
  if (typeof sessionStorage === "undefined") return null

  const raw = sessionStorage.getItem(WORKSHOP_CHECKOUT_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as WorkshopTrackingContext
  } catch {
    return null
  }
}

export function clearWorkshopCheckoutContext() {
  if (typeof sessionStorage === "undefined") return
  sessionStorage.removeItem(WORKSHOP_CHECKOUT_STORAGE_KEY)
}

export function getPurchaseTrackingStorageKey(identifier: string) {
  return `alcovia_workshop_purchase_tracked_${identifier}`
}

export function hasPurchaseBeenTracked(identifier: string): boolean {
  if (typeof sessionStorage === "undefined") return false
  return sessionStorage.getItem(getPurchaseTrackingStorageKey(identifier)) === "true"
}

export function markPurchaseTracked(identifier: string) {
  if (typeof sessionStorage === "undefined") return
  sessionStorage.setItem(getPurchaseTrackingStorageKey(identifier), "true")
}

export function parseRazorpayResult(searchParams: URLSearchParams): ParsedRazorpayResult {
  const paymentId =
    searchParams.get("razorpay_payment_id") ||
    searchParams.get("payment_id") ||
    undefined
  const orderId =
    searchParams.get("razorpay_order_id") ||
    searchParams.get("order_id") ||
    undefined
  const signature = searchParams.get("razorpay_signature") || undefined
  const errorCode =
    searchParams.get("error_code") ||
    searchParams.get("error[code]") ||
    undefined
  const errorDescription =
    searchParams.get("error_description") ||
    searchParams.get("error[description]") ||
    undefined

  return {
    errorCode,
    errorDescription,
    orderId,
    paymentId,
    signature,
    success: Boolean(paymentId || orderId),
  }
}

export async function beginWorkshopCheckout(ctaSource: WorkshopCtaSource) {
  const checkoutEventId = `checkout_${crypto.randomUUID()}`
  const payload = await trackWorkshopEvent("workshop_checkout_started", {
    ctaSource,
    eventId: checkoutEventId,
  })

  persistWorkshopCheckoutContext(payload)

  ;(window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "begin_checkout", {
    currency: WORKSHOP_DETAILS.currency,
    item_name: WORKSHOP_DETAILS.slug,
    value: WORKSHOP_DETAILS.amount,
  })

  ;(window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.(
    "track",
    "InitiateCheckout",
    {
      content_category: "Workshop",
      content_name: WORKSHOP_DETAILS.title,
      currency: WORKSHOP_DETAILS.currency,
      value: WORKSHOP_DETAILS.amount,
    },
    { eventID: checkoutEventId }
  )

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_user_agent: navigator.userAgent,
      event_id: checkoutEventId,
      event_name: "InitiateCheckout",
      fbc: payload.fbc,
      fbp: payload.fbp,
      source_url: window.location.href,
    }),
    keepalive: true,
  }).catch(() => {})

  window.location.assign(getWorkshopPaymentUrl())
}
