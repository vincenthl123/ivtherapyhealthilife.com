/**
 * POST /api/wa-click
 *
 * Receives the WhatsApp click payload from the website (src/lib/whatsapp.ts)
 * and stores the ref → attribution mapping in Vercel Blob so the respond.io
 * booking webhook (/api/respondio-webhook) can later attribute the
 * whatsapp_conversion back to the original GA4 client / ad click.
 *
 * Storage: wa-refs/<REF>.json  (e.g. wa-refs/HL-K3M9.json) in a private Blob
 * store. Auth is automatic on Vercel via OIDC + BLOB_STORE_ID (added when the
 * store was connected to the project).
 */
import { put } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const REF_RE = /^HL-[A-Z2-9]{4}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    // Client sends text/plain to avoid a CORS preflight, so body may be a raw string.
    const body: Record<string, unknown> =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};

    const ref = String(body.ref || "").trim().toUpperCase();
    if (!REF_RE.test(ref)) {
      return res.status(400).json({ error: "invalid_ref" });
    }

    const record = {
      ...body,
      ref,
      received_at: new Date().toISOString(),
    };

    await put(`wa-refs/${ref}.json`, JSON.stringify(record), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return res.status(200).json({ ok: true, ref });
  } catch (e) {
    console.error("wa-click error:", e);
    return res.status(500).json({ error: "internal" });
  }
}
