/**
 * Global Fillout booking-link interceptor.
 *
 * The booking flow finalises inside Fillout (healthilife.fillout.com/*,
 * form.fillout.com/*), often in a new tab / on a third-party domain — so a GA4
 * tag placed there can't see the original ad click. To attribute the booking
 * conversion correctly we must carry the click identity (GA4 client_id, gclid,
 * site) INTO Fillout as hidden URL fields; the Fillout webhook then sends
 * `booking_confirmed` to the right GA4 property on that client_id.
 *
 * This installs a capture-phase click listener that rewrites any anchor
 * pointing at fillout.com in place (preserving target/behaviour), plus a
 * window.open wrapper for programmatic opens. Mirrors wa-interceptor.ts.
 *
 * Opt out on any element with `data-fillout-skip="1"`.
 */
import { buildBookingUrl } from "./attribution";

const isFilloutUrl = (val: unknown): boolean =>
  typeof val === "string" && /(?:^|\/\/|\.)fillout\.com\//.test(val);

// Also treat the site's own /book path (reverse-proxied to Fillout) as a
// booking link, so attribution is stamped onto a clean same-origin URL that
// hides the fillout.com domain from the visitor.
const isBookingAnchor = (a: HTMLAnchorElement): boolean => {
  if (isFilloutUrl(a.href)) return true;
  try {
    const u = new URL(a.href);
    return (
      u.origin === window.location.origin &&
      (u.pathname === "/book" || u.pathname.startsWith("/book/"))
    );
  } catch {
    return false;
  }
};

const findFilloutAnchor = (
  start: EventTarget | null,
): HTMLAnchorElement | null => {
  let node = start as Node | null;
  while (node && node.nodeType !== 1) node = node.parentNode;
  let el = node as Element | null;
  let cursor = el;
  while (cursor) {
    if (cursor.hasAttribute && cursor.hasAttribute("data-fillout-skip")) return null;
    cursor = cursor.parentElement;
  }
  while (el) {
    if (el.tagName === "A" && isBookingAnchor(el as HTMLAnchorElement)) {
      return el as HTMLAnchorElement;
    }
    el = el.parentElement;
  }
  return null;
};

export const installFilloutInterceptor = (): (() => void) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented) return;
    const anchor = findFilloutAnchor(e.target);
    if (!anchor) return;
    const href = anchor.href || anchor.getAttribute("href") || "";
    if (!isBookingAnchor(anchor)) return;
    const ctx =
      anchor.getAttribute("data-booking-ctx") ||
      anchor.getAttribute("data-cta") ||
      "link";
    const finalUrl = buildBookingUrl(href, ctx);
    // Mutate the href in place; the default navigation (any modifier / target)
    // then proceeds to the attribution-stamped URL without us hijacking it.
    if (finalUrl !== href) anchor.setAttribute("href", finalUrl);
  };

  document.addEventListener("click", onClick, true);

  const originalOpen = window.open.bind(window);
  const wrappedOpen: typeof window.open = ((
    url?: string | URL,
    target?: string,
    features?: string,
  ) => {
    const s = typeof url === "string" ? url : String(url ?? "");
    if (isFilloutUrl(s)) {
      return originalOpen(buildBookingUrl(s, "programmatic"), target as string, features as string);
    }
    return originalOpen(url as string, target as string, features as string);
  }) as typeof window.open;
  window.open = wrappedOpen;

  return () => {
    document.removeEventListener("click", onClick, true);
    if (window.open === wrappedOpen) window.open = originalOpen;
  };
};
