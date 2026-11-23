// Pure URL logic (no chrome.* APIs) so it can be unit-tested with node.

const GO_HOST = "go.servicetitan.com";
export const EH_SUFFIX = ".eh.go.servicetitan.com";

function tryDecode(s) { try { return decodeURIComponent(s); } catch { return s; } }

/** Pull the real destination out of a supported email link-scanner wrapper, or null. */
export function unwrap(href) {
  let u;
  try { u = new URL(href); } catch { return null; }
  const h = u.hostname;

  // Avanan / Check Point: .../___https://dest___.signature
  if (h.endsWith("avanan.click")) {
    const m = href.match(/___(https?:.+?)___/i);
    return m ? tryDecode(m[1]) : null;
  }
  // Microsoft Defender Safe Links: ?url=<encoded>
  if (h.endsWith(".safelinks.protection.outlook.com")) {
    return u.searchParams.get("url");
  }
  // Proofpoint URL Defense v2 (v3 is not supported): /v2/url?u=<encoded with - for % and _ for />
  if (h === "urldefense.proofpoint.com") {
    const x = u.searchParams.get("u");
    return x ? tryDecode(x.replace(/-/g, "%").replace(/_/g, "/")) : null;
  }
  return null;
}

/** eHub tenant slug as used in the subdomain (underscores occur, e.g. acme_sbet). */
export function isValidSlug(slug) {
  return /^[a-z0-9]([a-z0-9_-]*[a-z0-9])?$/i.test(slug || "");
}

/** Slug from an eHub URL (https://<slug>.eh.go.servicetitan.com/...), or null. */
export function slugFromEhubUrl(href) {
  try {
    const h = new URL(href).hostname;
    if (!h.endsWith(EH_SUFFIX)) return null;
    const slug = h.slice(0, -EH_SUFFIX.length);
    return isValidSlug(slug) ? slug : null;
  } catch { return null; }
}

/**
 * Rewrite a GO link (optionally scanner-wrapped) to the tenant's eHub URL, or null.
 *   go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/X
 *   -> https://<slug>.eh.go.servicetitan.com/#/task-center/tasks/X
 */
export function toEhubUrl(href, slug) {
  if (!isValidSlug(slug)) return null;
  let u;
  try { u = new URL(unwrap(href) ?? href); } catch { return null; }
  if (u.hostname !== GO_HOST) return null;
  const path = u.pathname.replace(/^\/Auth\/ExternalLogin\/?/i, "/");
  const out = new URL(`https://${slug.toLowerCase()}${EH_SUFFIX}${path}${u.search}`);
  out.hash = u.hash;
  return out.toString();
}
