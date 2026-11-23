import { TENANTS } from "../src/tenants.js";
import { isValidSlug } from "../src/convert.js";

const $ = (id) => document.getElementById(id);
let current = null;

function render() {
  const q = $("search").value.toLowerCase();
  $("list").replaceChildren(...TENANTS
    .filter(t => t.name.toLowerCase().includes(q) || t.slug.includes(q))
    .map(t => {
      const li = document.createElement("li");
      li.className = t.slug === current ? "sel" : "";
      li.textContent = t.name;
      const s = document.createElement("small"); s.textContent = t.slug; li.append(s);
      li.onclick = () => save(t.slug);
      return li;
    }));
}

async function save(slug) {
  if (!isValidSlug(slug)) { $("status").textContent = "Invalid slug"; return; }
  current = slug.toLowerCase();
  await chrome.storage.sync.set({ tenantSlug: current });
  $("status").textContent = `Links will open at ${current}.eh.go.servicetitan.com`;
  render();
}

const { tenantSlug, enabled = true } = await chrome.storage.sync.get(["tenantSlug", "enabled"]);
current = tenantSlug || null;
$("enabled").checked = enabled;
$("enabled").onchange = (e) => chrome.storage.sync.set({ enabled: e.target.checked });
$("search").oninput = render;
$("save").onclick = () => save($("custom").value.trim());
if (current) $("status").textContent = `Current: ${current}`;
render();
