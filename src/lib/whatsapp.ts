/**
 * Dynamic WhatsApp URL builder.
 * Reads UTM/GCLID params at call-time and appends a structured pre-filled message.
 * Empty fields are omitted entirely (no "Term: " or "GCLID: " empty fragments).
 */
export const buildWaUrl = (prefix: string): string => {
  const phone = "66919991744";
  const base = `https://wa.me/${phone}?text=`;

  let search = "";
  let pathname = "/";
  if (typeof window !== "undefined") {
    search = window.location.search || "";
    pathname = window.location.pathname || "/";
  }

  const params = new URLSearchParams(search);
  const get = (k: string) => (params.get(k) || "").trim();

  const source = get("utm_source") || "direct";
  const medium = get("utm_medium") || "website";
  const campaign = get("utm_campaign") || "organic";
  const term = get("utm_term");
  const content = get("utm_content");
  const gclid = get("gclid");

  const fragments: string[] = [prefix];
  fragments.push(`Source: ${source}`);
  fragments.push(`Medium: ${medium}`);
  fragments.push(`Campaign: ${campaign}`);
  if (term) fragments.push(`Term: ${term}`);
  if (content) fragments.push(`Content: ${content}`);
  if (gclid) fragments.push(`GCLID: ${gclid}`);
  fragments.push(`Page: ${pathname}`);

  const message = fragments.join(" | ");
  return base + encodeURIComponent(message);
};
