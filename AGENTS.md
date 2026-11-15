# AGENTS.md — Hayden J. Weal personal website

Static portfolio site hosted on **GitHub Pages** (domain `haydenjweal.com`, see `CNAME`). No build step, no framework, no package manager. Edit HTML/CSS/JS directly and push to `main`.

## Project map

- `index.html` — home: full-screen hero video + bio/CV section.
- `director.html`, `editor.html`, `writer.html`, `actor.html` — role portfolios.
- `represent.html` — private pitch page for agents/representation. **Not in main nav, not indexed** (see DECISIONS.md D004). Do not link from public pages.
- `css/style.css` — global styles + shared components/design tokens.
- `css/{role}.css` — page-specific styles only.
- `script.js` — shared interactions for all pages.
- `img/`, `mov/`, `pdf/` — assets (images, videos, scripts/CV).
- `tools/check_consistency.py` — verifies nav/contact/shared assets match across pages. Run: `python3 tools/check_consistency.py`.
- `robots.txt`, `sitemap.xml`, `404.html` — SEO + not-found handling (GitHub Pages).
- `.gitignore`, `.gitattributes` — ignore OS/editor files; treat media as binary.

## Stack & conventions

- Plain HTML5 / CSS3 / vanilla JS. Keep it that way (D001).
- Each page is a full HTML document: `<!DOCTYPE html>`, head links `./css/style.css` then page CSS, favicon, shared header nav.
- Nav order (keep identical on every page): Director · Editor · Writer · Actor · Bio (`index.html#bio-cv`). Mark current page with `class="active"` on its `<li>`.
- Shared contact block at the bottom of every page.
- CSS tokens live in `:root` in `style.css` (`--primary-purple`, `--space-*`, fonts). Reuse them; don't hardcode new colors/spacing.
- Shared component classes: `project-title`, `project-meta`, `project-quote`, `project-award`, `script-button`, `dropdown-toggle`, `.button`.
- Page-prefixed wrappers: `{page}-project-item`, `{page}-projects-grid`.
- Images: prefer `.webp`; always include meaningful `alt`.
- Thumbnails: YouTube → `https://img.youtube.com/vi/{id}/hqdefault.jpg`; Vimeo → prefer direct `https://i.vimeocdn.com/...` URL for reliability (runtime oEmbed fetch can be blocked).

## Common tasks

- **Add a project:** copy an existing project block on the target page; update title/meta/quote/awards/thumbnail/video link. Add thumbnail to `img/` if not remote; add script PDF to `pdf/` for writer items.
- **Update bio/CV:** edit the bio section in `index.html` and replace `pdf/Hayden-J-Weal_CV.pdf`.
- **New page:** copy a career page template, update nav `active`, create `css/{name}.css`, and add the link to the nav on **all** pages (including `index.html`).
- **Styling:** shared → `style.css`; page-only → page CSS.

## Pitfalls

- No build: test by opening files locally. All paths are relative (`./`); keep them that way.
- GitHub Pages serves from repo root; `CNAME` must remain `haydenjweal.com`.
- `script.js` is shared — guard page-specific code with element checks (existing pattern).
- `represent.html` stays out of nav and unindexed.
- Large binaries in `mov/` and `pdf/`: don't add huge files; optimize images.
- Don't delete assets still referenced by any page.
- Don't introduce frameworks/build tools without discussion.
- After editing nav/contact/shared assets, run `python3 tools/check_consistency.py`.

## Agent workflow

1. Read `AGENTS.md`. Read `DECISIONS.md` only if the task touches structure/architecture or you need rationale; otherwise skim its last few entries. Keep token use low.
2. Make minimal, targeted edits matching existing patterns.
3. Verify: tags closed, links resolve, no console errors, nav consistent across pages.
4. Record a new entry in `DECISIONS.md` only for non-obvious/architectural choices.
5. Commit with a concise message; don't rewrite history.
6. Change history lives in **git** (`git log`), not a separate changelog file.

## Tracking files

- `AGENTS.md` — this file (agent-facing project guide).
- `DECISIONS.md` — lightweight ADR log of key decisions.
- No `CHANGELOG.md` by design; git history is the source of truth.