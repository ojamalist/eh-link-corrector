import { toEhubUrl } from "./convert.js";

async function getSlug() {
  const { tenantSlug, enabled = true } = await chrome.storage.sync.get(["tenantSlug", "enabled"]);
  return enabled ? tenantSlug : null;
}

async function handle(details) {
  if (details.frameId !== 0) return;
  const slug = await getSlug();
  if (!slug) return;
  const dest = toEhubUrl(details.url, slug);
  if (dest && dest !== details.url) chrome.tabs.update(details.tabId, { url: dest });
}

const filter = { url: [{ hostEquals: "url.avanan.click" }, { hostEquals: "go.servicetitan.com" }] };
// Catch the wrapped link before Avanan redirects; onCommitted is a fallback
// if the user lands on go.servicetitan.com some other way.
chrome.webNavigation.onBeforeNavigate.addListener(handle, filter);
chrome.webNavigation.onCommitted.addListener(handle, filter);
