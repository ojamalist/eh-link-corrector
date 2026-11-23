import { isValidSlug } from "../src/convert.js";

const $ = (id) => document.getElementById(id);
let { tenants = [], activeSlug, enabled = true } = await chrome.storage.sync.get(["tenants", "activeSlug", "enabled"]);

function render() {
  $("tenant").replaceChildren(...(tenants.length ? tenants : [""]).map(s => {
    const o = document.createElement("option");
    o.value = s; o.textContent = s || "None yet — open your eHub site once";
    o.selected = s === activeSlug;
    return o;
  }));
  $("tenant").disabled = !tenants.length;
  $("status").textContent = activeSlug ? `Links open at ${activeSlug}.eh.go.servicetitan.com` : "";
}

$("enabled").checked = enabled;
$("enabled").onchange = (e) => chrome.storage.sync.set({ enabled: e.target.checked });
$("tenant").onchange = async (e) => { activeSlug = e.target.value; await chrome.storage.sync.set({ activeSlug }); render(); };
$("add").onclick = async () => {
  const slug = $("custom").value.trim().toLowerCase();
  if (!isValidSlug(slug)) { $("status").textContent = "Invalid tenant name"; return; }
  if (!tenants.includes(slug)) tenants = [...tenants, slug];
  activeSlug = slug; $("custom").value = "";
  await chrome.storage.sync.set({ tenants, activeSlug });
  render();
};
render();
