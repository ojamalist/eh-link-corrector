# Chrome Web Store listing – EH Link Corrector

Paste each section into the matching field of the Developer Dashboard.
Upload: `dist/eh-link-corrector-0.1.0.zip` (rebuild with `./build.sh`).

## Store listing tab

**Name** (max 75)
EH Link Corrector

**Summary / short description** (max 132)
Open ServiceTitan GO links from email in your eHub tenant, not the shared GO login. Unofficial.

**Category**
Productivity

**Language**
English

**Detailed description**
```
If you sign in to ServiceTitan through eHub, notification emails send you to the wrong place. The links point to the shared GO login (go.servicetitan.com) instead of your own eHub site, so you hit a login screen or land in the wrong environment.

EH Link Corrector fixes this automatically. Click a ServiceTitan link in your email and it opens in your eHub tenant:

  go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/…
  becomes
  your-tenant.eh.go.servicetitan.com/#/task-center/tasks/…

HOW IT WORKS
• Open your eHub site once. The extension remembers your tenant name, so there is nothing to set up.
• Work in more than one tenant? Choose the active one from the toolbar popup, or add a tenant by name.
• Works with links wrapped by email security scanners, including Avanan, Microsoft Safe Links, and Proofpoint URL Defense (v2). It works from any webmail or email client that opens links in your browser.
• Turn it off any time with the Enabled switch.

PRIVACY
• No accounts, no tracking, no analytics, no ads.
• The extension makes no network requests of its own and sends nothing anywhere.
• Your tenant name and on/off setting are stored in your browser's own extension storage.

OPEN SOURCE
Source code and issues: https://github.com/ojamalist/eh-link-corrector

DISCLAIMER
EH Link Corrector is an independent, unofficial tool. It is not affiliated with, endorsed by, or sponsored by ServiceTitan, Inc. "ServiceTitan" is a trademark of its respective owner and is used here only to describe what the extension works with.
```

**Graphic assets (you still need to make these)**
- Store icon 128×128 PNG – replace the blue placeholder in `icons/` first.
- At least 1 screenshot, 1280×800 (or 640×400). Suggested: (1) the popup with a tenant selected; (2) before/after of the address bar for a link.
- Small promo tile 440×280 (optional but recommended).

**Official URL / Homepage URL**
https://github.com/ojamalist/eh-link-corrector

**Support URL**
https://github.com/ojamalist/eh-link-corrector/issues

## Privacy tab

**Single purpose description**
```
Redirect ServiceTitan GO links opened from email to the user's own eHub tenant site.
```

**Permission justifications**

| Permission | Justification |
|---|---|
| `webNavigation` | Detects when the user navigates to a ServiceTitan GO link (or an email-security wrapper around one) so it can be redirected, and detects visits to the user's eHub site to learn the tenant name. |
| `storage` | Stores the user's eHub tenant name(s), the active tenant, and the on/off setting. |
| Host: `https://go.servicetitan.com/*` | The shared GO address that notification links point to; this is the link being corrected. |
| Host: `https://*.eh.go.servicetitan.com/*` | The user's eHub site. Visiting it lets the extension learn the tenant name from the address. |
| Host: `https://url.avanan.click/*` | Email link-scanner wrapper (Avanan) that contains the GO link. Needed to read and redirect it before the scanner's redirect runs. |
| Host: `https://*.safelinks.protection.outlook.com/*` | Same, for Microsoft Defender Safe Links. |
| Host: `https://urldefense.proofpoint.com/*` | Same, for Proofpoint URL Defense v2. |

**Remote code**
No, I am not using remote code.

**Data usage** (check none of the data-collection boxes)
The extension does not collect or transmit any user data. Certifications to tick:
- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

**Privacy policy URL**
https://github.com/ojamalist/eh-link-corrector/blob/master/PRIVACY.md

## Distribution tab
- Visibility: **Public**
- Regions: all regions
- Pricing: free

## Pre-submit checklist
- [ ] Replace placeholder icons in `icons/` (16, 48, 128) with real artwork, then `./build.sh`
- [ ] Take screenshots, ideally with a fake or redacted tenant name
- [ ] Test the exact zip: unzip it somewhere and Load unpacked in Chrome or Brave
- [ ] Test a real wrapped email link end to end (Avanan confirmed; Safe Links and Proofpoint v2 only have synthetic tests)
- [ ] Check your employment/IP agreement before publishing under your own account
- [ ] Register a developer account ($5 one-time) and enable 2-step verification
- [ ] Don't use ServiceTitan logos or branding anywhere in the listing or assets
