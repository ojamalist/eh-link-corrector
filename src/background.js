import { toEhubUrl, slugFromEhubUrl } from "./convert.js";

// Rewrite GO links (possibly wrapped by an email link scanner) to the user's eHub tenant.
async function rewrite(details) {
  if (details.frameId !== 0) return;
  const { activeSlug, enabled = true } = await chrome.storage.sync.get(["activeSlug", "enabled"]);
  if (!enabled || !activeSlug) return;
  const dest = toEhubUrl(details.url, activeSlug);
  if (dest && dest !== details.url) chrome.tabs.update(details.tabId, { url: dest });
}

// Learn tenants automatically when the user visits their eHub site.
async function learn(details) {
  if (details.frameId !== 0) return;
  const slug = slugFromEhubUrl(details.url);
  if (!slug) return;
  const { tenants = [], activeSlug } = await chrome.storage.sync.get(["tenants", "activeSlug"]);
  const next = {};
  if (!tenants.includes(slug)) next.tenants = [...tenants, slug];
  if (!activeSlug) next.activeSlug = slug;
  if (Object.keys(next).length) await chrome.storage.sync.set(next);
}

const wrappers = [
  { hostEquals: "url.avanan.click" },
  { hostSuffix: ".safelinks.protection.outlook.com" },
  { hostEquals: "urldefense.proofpoint.com" },
  { hostEquals: "go.servicetitan.com" }
];
chrome.webNavigation.onBeforeNavigate.addListener(rewrite, { url: wrappers });
chrome.webNavigation.onCommitted.addListener(rewrite, { url: wrappers });
chrome.webNavigation.onCommitted.addListener(learn, { url: [{ hostSuffix: ".eh.go.servicetitan.com" }] });
