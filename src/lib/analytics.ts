declare global {
  interface Window { gtag?: (...a: unknown[]) => void; __GA4?: string }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function pageView(path: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  const url = new URL(window.location.href);
  ["token", "session_id"].forEach((k) => url.searchParams.delete(k));
  window.gtag("event", "page_view", { page_location: url.toString(), page_path: path, page_title: document.title });
}

export function setConsent(granted: boolean) {
  try { localStorage.setItem("fp-consent", granted ? "granted" : "denied"); } catch { /* geen opslag */ }
  window.gtag?.("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
}
