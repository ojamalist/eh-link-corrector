// Pure URL logic (no chrome.* APIs) so it can be unit-tested with node.

const GO_HOST = "go.servicetitan.com";

/** Pull the real destination out of an Avanan-wrapped link, or return null. */
export function unwrapAvanan(href) {
  let u;
  try { u = new URL(href); } catch { return null; }
  if (!u.hostname.endsWith("avanan.click")) return null;
  const m = href.match(/___(https?:.+?)___/i);
  if (!m) return null;
  try { return decodeURIComponent(m[1]); } catch { return m[1].replace(/%23/gi, "#"); }
}

/** Tenant slug as used in the eHub subdomain (underscores occur, e.g. larsonkeeneywi_sbet). */
export function isValidSlug(slug) {
  return /^[a-z0-9]([a-z0-9_-]*[a-z0-9])?$/i.test(slug || "");
}

/**
 * Given any URL and a tenant slug, return the eHub URL or null if the URL
 * isn't a GO link we should rewrite.
 *   go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/X
 *   go.servicetitan.com/#/task-center/tasks/X
 *   url.avanan.click/...___https://go.servicetitan.com/%23/task-center/tasks/X___...
 * -> https://<slug>.eh.go.servicetitan.com/#/task-center/tasks/X
 */
export function toEhubUrl(href, slug) {
  if (!isValidSlug(slug)) return null;
  const target = unwrapAvanan(href) ?? href;
  let u;
  try { u = new URL(target); } catch { return null; }
  if (u.hostname !== GO_HOST) return null;

  const path = u.pathname.replace(/^\/Auth\/ExternalLogin\/?/i, "/");
  const out = new URL(`https://${slug.toLowerCase()}.eh.go.servicetitan.com${path}${u.search}`);
  out.hash = u.hash;
  return out.toString();
}
