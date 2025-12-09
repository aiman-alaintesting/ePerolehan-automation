# ePerolehan-automation — Playwright setup

This repository contains a minimal Playwright Test scaffold and a sample test.

Quick setup (PowerShell):

```powershell
# 1. Install dependencies (run in repo root)
npm install

# 2. Install browser binaries
npx playwright install

# 3. Run tests
npm test

# 4. Open HTML report
npx playwright show-report
```

Files added:

- `package.json` — scripts + devDependency for `@playwright/test`
- `playwright.config.js` — minimal config (test dir `tests`, baseURL set to `https://example.com`)
- `tests/example.spec.js` — sample test checking page title
- `.gitignore` — excludes `node_modules` and `playwright-report`

Notes:
- If you already have Playwright installed globally, still run `npm install` to add it to the project.
- To switch to TypeScript, run `npx playwright test --init` and choose TypeScript; I can convert files if you want.
