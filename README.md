# EH Link Corrector

Chrome extension (Manifest V3). ServiceTitan notification emails link to the
shared GO environment (often wrapped by Avanan). Staff who log in through eHub
need `https://<tenant>.eh.go.servicetitan.com/#/...` instead. This extension
rewrites the link on click.

    url.avanan.click/...___https://go.servicetitan.com/%23/task-center/tasks/ID___...
    go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/ID
      -> https://<tenant>.eh.go.servicetitan.com/#/task-center/tasks/ID

## Install (dev)
1. `chrome://extensions` -> enable Developer mode -> Load unpacked -> select this folder.
2. Click the toolbar icon and pick your tenant.

## Test
    node test/convert.test.mjs

## Layout
- `src/convert.js` – pure URL conversion (unit tested)
- `src/background.js` – webNavigation listener that redirects the tab
- `src/tenants.js` – tenant name/slug list
- `popup/` – tenant picker UI

## Roadmap
- Microsoft sign-in to auto-detect tenant (needs an Entra app registration + `chrome.identity`; tenant mapping source TBD)
- Load tenant list from a hosted JSON instead of bundling it
