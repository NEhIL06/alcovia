"use client"

const DEFAULT_WORKSHOP_PAYMENT_URL = "https://rzp.io/rzp/superfood"
const WORKSHOP_EVENT_ENDPOINT = "/api/workshop-funnel"
const WORKSHOP_CHECKOUT_LEAD_ENDPOINT = "/api/workshop-checkout-lead"
const WORKSHOP_CHECKOUT_STORAGE_KEY = "alcovia_workshop_checkout_context_v1"
const WORKSHOP_LAST_LEAD_STORAGE_KEY = "alcovia_workshop_last_lead_v1"

export interface WorkshopCheckoutLeadInput {
  parent_name: string
  parent_phone: string
  student_name: string
  grade: string
  school: string
  whatsapp_optin: boolean
}

export const WORKSHOP_DETAILS = {
  slug: "edible-engineering-workshop",
  title: "Edible Engineering: Architecting the Next Superfood",
  dateIso: "2026-05-02",
  dateLabel: "May 2nd, 2026",
  locationLabel: "Horizon Center, Gurgaon",
  amount: 3999,
  currency: "INR",
  paymentProvider: "razorpay",
} as const

export type WorkshopCtaSource =
  | "navbar"
  | "hero"
  | "mid"
  | "closing"
  | "mobile_floating"
  | "callback"
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

interface BeginWorkshopCheckoutOptions {
  lead?: WorkshopCheckoutLeadInput
  leadId?: string
}

function buildRazorpayUrl(
  base: string,
  options: BeginWorkshopCheckoutOptions,
  context: WorkshopTrackingContext
): string {
  const url = new URL(base)
  const { lead, leadId } = options

  if (lead) {
    const fullPhone = lead.parent_phone.startsWith("+")
      ? lead.parent_phone
      : `+91${lead.parent_phone.replace(/\D/g, "")}`
    url.searchParams.set("prefill[name]", lead.parent_name)
    url.searchParams.set("prefill[contact]", fullPhone)
    url.searchParams.set("notes[parent_name]", lead.parent_name)
    url.searchParams.set("notes[parent_phone]", fullPhone)
    url.searchParams.set("notes[student_name]", lead.student_name)
    url.searchParams.set("notes[grade]", lead.grade)
    url.searchParams.set("notes[school]", lead.school)
  }

  if (leadId) {
    url.searchParams.set("notes[lead_id]", leadId)
  }
  url.searchParams.set("notes[cta_source]", context.cta_source || "unknown")
  url.searchParams.set("notes[checkout_attempt_id]", context.checkout_attempt_id)

  if (context.utm_source) url.searchParams.set("notes[utm_source]", context.utm_source)
  if (context.utm_campaign) url.searchParams.set("notes[utm_campaign]", context.utm_campaign)
  if (context.utm_medium) url.searchParams.set("notes[utm_medium]", context.utm_medium)
  if (context.utm_content) url.searchParams.set("notes[utm_content]", context.utm_content)
  if (context.ad_id) url.searchParams.set("notes[ad_id]", context.ad_id)

  return url.toString()
}

function persistLastLead(lead: WorkshopCheckoutLeadInput, leadId: string | undefined) {
  if (typeof sessionStorage === "undefined") return
  try {
    sessionStorage.setItem(
      WORKSHOP_LAST_LEAD_STORAGE_KEY,
      JSON.stringify({ ...lead, lead_id: leadId })
    )
  } catch {
    /* ignore storage errors */
  }
}

export function readLastWorkshopLead():
  | (WorkshopCheckoutLeadInput & { lead_id?: string })
  | null {
  if (typeof sessionStorage === "undefined") return null
  const raw = sessionStorage.getItem(WORKSHOP_LAST_LEAD_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function submitWorkshopCheckoutLead(
  lead: WorkshopCheckoutLeadInput,
  ctaSource: WorkshopCtaSource
): Promise<{ leadId: string }> {
  const clientLeadId = `lead_${crypto.randomUUID()}`
  const fullPhone = `+91${lead.parent_phone.replace(/\D/g, "")}`
  const params = new URLSearchParams(window.location.search)

  const payload = {
    lead_id: clientLeadId,
    parent_name: lead.parent_name,
    parent_phone: fullPhone,
    student_name: lead.student_name,
    grade: lead.grade,
    school: lead.school,
    whatsapp_optin: lead.whatsapp_optin,
    cta_source: ctaSource,
    funnel_name: "workshop",
    workshop_slug: WORKSHOP_DETAILS.slug,
    workshop_title: WORKSHOP_DETAILS.title,
    workshop_date: WORKSHOP_DETAILS.dateIso,
    amount: WORKSHOP_DETAILS.amount,
    currency: WORKSHOP_DETAILS.currency,
    payment_status: "pending",
    landing_page: window.location.pathname,
    source_url: window.location.href,
    referrer_raw: document.referrer || "direct",
    traffic_source: getTrafficSource(),
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
    ad_id: params.get("ad_id") || undefined,
    fbc: getCookie("_fbc"),
    fbp: getCookie("_fbp"),
    client_user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  }

  const response = await fetch(WORKSHOP_CHECKOUT_LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  })

  let leadId = clientLeadId
  if (response.ok) {
    try {
      const json = (await response.clone().json()) as { lead_id?: string; id?: string }
      if (json?.lead_id) leadId = json.lead_id
      else if (json?.id) leadId = json.id
    } catch {
      /* use client-generated id */
    }
  } else {
    throw new Error(`Lead submission failed with status ${response.status}`)
  }

  persistLastLead(lead, leadId)
  return { leadId }
}

export async function beginWorkshopCheckout(
  ctaSource: WorkshopCtaSource,
  options: BeginWorkshopCheckoutOptions = {}
) {
  const checkoutEventId = `checkout_${crypto.randomUUID()}`
  const payload = await trackWorkshopEvent("workshop_checkout_started", {
    ctaSource,
    eventId: checkoutEventId,
  })

  const contextWithLead: WorkshopTrackingContext = {
    ...payload,
    ...(options.leadId ? { checkout_attempt_id: payload.checkout_attempt_id } : {}),
  }

  persistWorkshopCheckoutContext(contextWithLead)

  ;(window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", "begin_checkout", {
    currency: WORKSHOP_DETAILS.currency,
    item_name: WORKSHOP_DETAILS.slug,
    value: WORKSHOP_DETAILS.amount,
  })

  // InitiateCheckout and Lead events now fire in workshop-checkout-context.tsx
  // beginWorkshopCheckout opens Razorpay modal on the same page

  const rzpKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_8tsJHaKJ3ORpf1"
  const { lead } = options

  const loadRazorpay = (): Promise<void> =>
    new Promise((resolve) => {
      if ((window as Window & { Razorpay?: unknown }).Razorpay) { resolve(); return }
      const s = document.createElement("script")
      s.src = "https://checkout.razorpay.com/v1/checkout.js"
      s.onload = () => resolve()
      s.onerror = () => {
        const finalUrl = buildRazorpayUrl(getWorkshopPaymentUrl(), options, contextWithLead)
        window.location.assign(finalUrl)
      }
      document.head.appendChild(s)
    })

  await loadRazorpay()

  const RazorpayClass = (window as Window & { Razorpay?: new (opts: Record<string, unknown>) => { open: () => void } }).Razorpay
  if (!RazorpayClass) {
    const finalUrl = buildRazorpayUrl(getWorkshopPaymentUrl(), options, contextWithLead)
    window.location.assign(finalUrl)
    return
  }

  const fullPhone = lead ? (lead.parent_phone.startsWith("+") ? lead.parent_phone : `+91${lead.parent_phone.replace(/\D/g, "")}`) : ""

  const rzp = new RazorpayClass({
    key: rzpKeyId,
    amount: WORKSHOP_DETAILS.amount * 100,
    currency: WORKSHOP_DETAILS.currency,
    name: "Alcovia",
    description: WORKSHOP_DETAILS.title,
    prefill: {
      name: lead?.parent_name || "",
      contact: fullPhone,
    },
    notes: {
      parent_name: lead?.parent_name || "",
      parent_phone: fullPhone,
      student_name: lead?.student_name || "",
      grade: lead?.grade || "",
      school: lead?.school || "",
      cta_source: contextWithLead.cta_source || "unknown",
      checkout_attempt_id: contextWithLead.checkout_attempt_id,
      utm_source: contextWithLead.utm_source || "",
      utm_campaign: contextWithLead.utm_campaign || "",
      lead_id: options.leadId || "",
    },
    theme: { color: "#22C55E" },
    handler: (response: { razorpay_payment_id?: string; razorpay_order_id?: string; razorpay_signature?: string }) => {
      const params = new URLSearchParams()
      if (response.razorpay_payment_id) params.set("razorpay_payment_id", response.razorpay_payment_id)
      if (response.razorpay_order_id) params.set("razorpay_order_id", response.razorpay_order_id)
      if (response.razorpay_signature) params.set("razorpay_signature", response.razorpay_signature)
      window.location.assign(`/workshop/thank-you?${params.toString()}`)
    },
    modal: {
      ondismiss: () => {
        trackWorkshopEvent("workshop_payment_dismissed", { ctaSource }).catch(() => {})
      },
    },
  })
  rzp.open()
}
