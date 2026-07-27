/**
 * Evenement de conversion standard — porte depuis le satellite skin
 * (taxonomie John/Vincent validee le 2026-07-24). AJOUT PUR : ce fichier ne
 * modifie ni ne remplace src/lib/tracking.ts.
 *
 * CE QU IL NE FAIT PAS, ET POURQUOI
 *
 * La version skin embarque aussi un intercepteur de clics tel:/booking. Elle
 * n est PAS reprise ici : ce satellite compte deja ses appels et ses clics
 * WhatsApp dans tracking.ts, et un second ecouteur produirait un double
 * comptage sur des conversions deja mesurees. Ce fichier ne sert qu a l
 * aboutissement du formulaire, qui n etait mesure nulle part.
 *
 * Double emission volontaire :
 *   1. dataLayer.push — la seule forme que les declencheurs GTM ecoutent.
 *   2. gtag('event', ..., {send_to}) — send_to explicite obligatoire : gtag.js
 *      peut etre charge deux fois (fan-out GTM + snippet differe), et les
 *      evenements routes sans send_to n emettaient aucun hit reseau (sonde
 *      2026-07-24).
 */

interface StandardEventsWindow extends Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

const GA4_MEASUREMENT_ID = "G-K9R2HXK3QT";
const PAGE_SOURCE = "iv";

// Un meme aboutissement peut atteindre cette fonction par plusieurs chemins.
const DEDUPE_MS = 1500;
const lastFiredAt: Record<string, number> = {};

export function trackStandardEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - (lastFiredAt[eventName] ?? 0) < DEDUPE_MS) return;
  lastFiredAt[eventName] = now;
  try {
    const win = window as StandardEventsWindow;
    const payload = {
      page_source: PAGE_SOURCE,
      page_path: window.location.pathname,
      ...params,
    };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ event: eventName, ...payload });
    // Le snippet gtag est differe au load. Si l evenement part au premier
    // paint — c est le cas sur /merci — on empile une entree de style gtag ;
    // gtag.js vide la file a son chargement.
    const gaParams = { send_to: GA4_MEASUREMENT_ID, ...payload };
    if (typeof win.gtag === "function") {
      win.gtag("event", eventName, gaParams);
    } else {
      (function () {
        // eslint-disable-next-line prefer-rest-params
        (win.dataLayer as unknown[]).push(arguments);
      })("event", eventName, gaParams);
    }
  } catch {
    /* le tracking ne doit jamais casser la page */
  }
}
