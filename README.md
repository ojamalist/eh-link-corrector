# EH Link Corrector

Unofficial browser extension (Manifest V3). ServiceTitan notification emails link
to the shared GO login, often wrapped by an email link scanner. If you sign in
through eHub, you need `https://<tenant>.eh.go.servicetitan.com/#/...` instead.
This extension rewrites the link when you click it.

    go.servicetitan.com/Auth/ExternalLogin#/task-center/tasks/ID
      -> https://<tenant>.eh.go.servicetitan.com/#/task-center/tasks/ID

Not affiliated with or endorsed by ServiceTitan.

## How it knows your tenant
Open your eHub site once (`<tenant>.eh.go.servicetitan.com`); the extension
remembers it. With several tenants, choose the active one in the toolbar popup,
or add one manually.

## Supported link wrappers
Avanan (`url.avanan.click`), Microsoft Safe Links, Proofpoint URL Defense v2, and
plain `go.servicetitan.com` links. Proofpoint v3 and Mimecast are not supported yet.

## Install (development)
`chrome://extensions` (or `brave://extensions`) -> Developer mode -> Load unpacked -> this folder.

## Test
    node test/convert.test.mjs

## Privacy
No data collection and no network requests; see [PRIVACY.md](PRIVACY.md).
