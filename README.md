# EasyCRM — landing page

Marketing site for EasyCRM, a CRM positioned for chemicals & minerals
distributors.

**Live at <https://saatvikminchem.com>** — deployed from `main` via GitHub Pages.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind 4 · static export (`output: "export"`).
No server runtime — the build produces plain files in `out/`.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site → out/
```

## Deploying

The site is host-agnostic because it exports to static files. Two paths:

### Vercel (intended host)

1. Import `divyam-agarwal/easycrm-landing` at vercel.com/new
2. Framework preset: Next.js. No env vars needed — leave
   `NEXT_PUBLIC_BASE_PATH` unset so the site serves from the root.
3. Add `saatvikminchem.com` under Project → Settings → Domains.
   Vercel prints a **project-specific** A record and CNAME target.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Requires the repo to be **public** (GitHub Pages is not available for private
repos on the free plan), and Pages set to "GitHub Actions" as its source.

The workflow picks its base path automatically: with no `public/CNAME` it
builds for the project subpath (`/easycrm-landing`); once `public/CNAME`
exists it builds for the domain root. So moving to the custom domain is a
one-file change.

## Connecting the domain

The domain is registered at Squarespace and uses Squarespace nameservers.
Google Workspace email runs off the same zone.

1. Squarespace → Domains → saatvikminchem.com → **disconnect from the parking
   page**. Until this is done the auto-managed A records cannot be removed.
2. Add these records (GitHub Pages' apex IPs are fixed):

   | Type | Host | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `divyam-agarwal.github.io` |

3. Then: `echo saatvikminchem.com > public/CNAME && git commit && git push`
4. **Leave the MX and SPF TXT records untouched** — they carry Google
   Workspace email. Removing them silently breaks mail.

## Known gaps

- `FORM_ENDPOINT` in `app/page.tsx` is empty, so the demo form composes a
  prefilled email in the visitor's mail client. Set it to a Formspree (or
  similar) endpoint for proper server-side capture.
- `CONTACT_EMAIL` is `hello@saatvikminchem.com` — confirm that mailbox exists.
- Pricing figures are a working proposal, not a decided price list.
