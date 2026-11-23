import assert from "node:assert/strict";
import { toEhubUrl, unwrap, slugFromEhubUrl, isValidSlug } from "../src/convert.js";
const id = "01a1d575-1921-73c2-9654-2b60ac814371";
const want = `https://batterbee.eh.go.servicetitan.com/#/task-center/tasks/${id}`;
const go = `https://go.servicetitan.com/#/task-center/tasks/${id}`;

const avanan = `https://url.avanan.click/v2/r01/___https://go.servicetitan.com/%23/task-center/tasks/${id}___.YXAzOmNhbm9weQ`;
const safe = `https://nam06.safelinks.protection.outlook.com/?url=${encodeURIComponent(go)}&data=05%7C02&reserved=0`;
const pp2 = `https://urldefense.proofpoint.com/v2/url?u=${go.replace(/-/g, "%2D").replace(/#/g, "%23").replace(/%/g, "-").replace(/\//g, "_")}&d=x`;

assert.equal(unwrap(avanan), go);
assert.equal(toEhubUrl(avanan, "batterbee"), want);
assert.equal(toEhubUrl(safe, "batterbee"), want);
assert.equal(toEhubUrl(pp2, "batterbee"), want);
assert.equal(toEhubUrl(`https://go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/${id}`, "batterbee"), want);
assert.equal(toEhubUrl(go, "BatterBee"), want);
assert.equal(toEhubUrl("https://example.com/", "batterbee"), null);
assert.equal(toEhubUrl(avanan, "bad slug!"), null);
assert.equal(toEhubUrl(avanan, "acme_sbet"), `https://acme_sbet.eh.go.servicetitan.com/#/task-center/tasks/${id}`);
assert.equal(slugFromEhubUrl("https://acme_sbet.eh.go.servicetitan.com/#/x"), "acme_sbet");
assert.equal(slugFromEhubUrl("https://go.servicetitan.com/"), null);
assert.equal(isValidSlug("a"), true);
console.log("ok");
