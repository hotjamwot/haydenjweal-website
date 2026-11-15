# DECISIONS.md — Architecture Decision Log

Lightweight ADR log. Format: **ID · Date · Status · Decision · Rationale · Consequences**.  
Add an entry when making a non-obvious or structural choice. Keep entries short.

**Token/size guard:** keep this file under ~120 lines. When it grows, move older entries to `DECISIONS-archive.md` and leave a one-line pointer here. Prefer editing an existing entry over adding a new one.

---

## D001 — Static HTML/CSS/JS, no build system
- **Date:** 2026-11-16 (recorded; adopted earlier)
- **Status:** Accepted
- **Decision:** Plain static site (HTML/CSS/vanilla JS) hosted on GitHub Pages. No framework, bundler, or package manager.
- **Rationale:** Simplest possible hosting/deploy; owner edits content directly; no tooling to maintain.
- **Consequences:** No components/templating; shared markup (nav, contact) is duplicated across pages and must be kept in sync manually.

## D002 — One page per role
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Separate HTML pages per role (director/editor/writer/actor) plus home and represent.
- **Rationale:** Clean URLs, good SEO, trivial static hosting, no client-side routing.
- **Consequences:** Nav and contact blocks duplicated; new pages require updating nav on all pages.

## D003 — Shared `script.js` with feature detection
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** One shared script loaded on every page; page-specific behavior guarded by element/class checks.
- **Rationale:** Avoids multiple script tags and duplication; keeps interactions consistent.
- **Consequences:** Script must stay defensive; new page features need guards to avoid errors on other pages.

## D004 — `represent.html` unlinked and non-indexed
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** `represent.html` is a private pitch page: not in main nav, carries `<meta name="robots" content="noindex, nofollow">`, and is not referenced from public pages.
- **Rationale:** Intended only for direct sharing with agents/representation, not public discovery.
- **Consequences:** Do not add it to nav or sitemaps; keep the noindex meta tag.

## D005 — Vimeo thumbnails: direct URLs preferred
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** For Vimeo items, prefer a direct `i.vimeocdn.com` thumbnail URL in markup; runtime oEmbed fetch (`loadVimeoThumbnails`) remains as enhancement/fallback.
- **Rationale:** Runtime fetch can be blocked (ad blockers/CORS) and causes layout shift; direct URLs are reliable.
- **Consequences:** New Vimeo entries should ship a direct thumbnail; keep oEmbed code for legacy items.

## D006 — Design tokens + consolidated shared CSS
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Design tokens in `:root` (`style.css`); shared component styles consolidated in `style.css`; page files hold only page-specific rules.
- **Rationale:** Single source of truth for colors/spacing; avoids drift across pages.
- **Consequences:** Don't redefine tokens per page; new shared components go in `style.css`.

## D007 — Assets committed as binaries; prefer WebP
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Images/videos/PDFs are committed directly; prefer `.webp` for images; optimize before committing.
- **Rationale:** GitHub Pages serves static files; no asset pipeline exists.
- **Consequences:** Repo size grows with media; avoid adding large/unoptimized files.

## D008 — No separate CHANGELOG; git is source of truth
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** No `CHANGELOG.md`. Change history lives in git commits (use concise messages).
- **Rationale:** Avoids duplicating git history and maintenance drift; keeps repo minimal.
- **Consequences:** Agents must write meaningful commit messages; use `git log` for history.

## D009 — Contact email
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Single contact email `haydenweal@gmail.com` used across all pages.
- **Rationale:** One consistent point of contact.
- **Consequences:** Update all pages if email changes.

## D011 — Dark mode + cyan accent
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Site defaults to dark mode with a light/dark toggle (persisted in localStorage, respects nothing on first visit — dark is default). Accent color changed from purple `#8A4FFF` to cyan `#3fc6c6`. Theme tokens defined in `style.css` (`:root` light, `[data-theme="dark"]` dark) plus `represent.css` own tokens; `theme.js` runs in `<head>` to set `data-theme` before paint and avoid FOUC. Toggle button injected by `script.js`.
- **Rationale:** Darker, sleeker look requested; cyan accent preferred; toggle keeps flexibility for visitors.
- **Consequences:** All new CSS must use theme tokens (not hardcoded colors); `--white` stays pure white for text on accent; card backgrounds use `--surface`. New pages must include `theme.js` in `<head>`.

## D010 — Site hygiene pass
- **Date:** 2026-11-16
- **Status:** Accepted
- **Decision:** Added `tools/check_consistency.py` (nav/contact/shared-asset drift check); localized fragile external actor images to `img/actor/`; added focus-visible reveal for `.play-button`; added `poster` to hero video; added `robots.txt`, `sitemap.xml`, `404.html`; added `.gitignore`/`.gitattributes` (media treated as binary); fixed missing `</head>`, stray `</a>`, CSS typo, "New Zealandb" typo; removed dead director JS block; Vimeo support in actor popup.
- **Rationale:** Improve robustness, accessibility, SEO, and repo hygiene without changing stack.
- **Consequences:** Run `python3 tools/check_consistency.py` after nav/contact/shared edits; new actor images should be localized when host is fragile.