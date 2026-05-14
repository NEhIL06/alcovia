const UTM_KEY = "alcovia_utm"

interface StoredUtm {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  ad_id?: string
  traffic_source?: string
  referrer_raw?: string
  landing_page?: string
  fbclid?: string
}

export function persistUtmParams(): void {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)

  const hasUtm = params.get("utm_source") || params.get("fbclid") || params.get("ad_id")
  if (!hasUtm) return

  const ref = document.referrer
  let traffic_source = "direct"
  if (ref) {
    try {
      const hostname = new URL(ref).hostname.replace("www.", "").replace("l.", "").replace("lm.", "")
      const sources: Record<string, string> = {
        "instagram.com": "instagram", "facebook.com": "facebook", "fb.com": "facebook",
        "m.facebook.com": "facebook", "google.com": "google", "google.co.in": "google",
        "whatsapp.com": "whatsapp",
      }
      traffic_source = sources[hostname] || hostname
    } catch {
      traffic_source = ref
    }
  }

  const data: StoredUtm = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    ad_id: params.get("ad_id") || undefined,
    fbclid: params.get("fbclid") || undefined,
    traffic_source,
    referrer_raw: ref || "direct",
    landing_page: window.location.pathname,
  }

  sessionStorage.setItem(UTM_KEY, JSON.stringify(data))
}

export function getStoredUtm(): StoredUtm {
  if (typeof sessionStorage === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(UTM_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
