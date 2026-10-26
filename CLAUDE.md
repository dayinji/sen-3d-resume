# CLAUDE.md

Conventions for **AI coding assistants** (Claude Code / Cursor / Copilot, etc.) working in this repo. This is a **scroll-driven personal 3D résumé** built on **React Three Fiber + TypeScript**: a fixed 3D background (a character model that reacts to scroll) plus scrollable HTML content in front (About → résumé → works). `README.md` explains the concept and usage for humans; this file adds the collaboration gotchas without repeating it.

## Repo layout (read this first)

The repo has three parts:

- **[`web/`](web)** — the front-end app (every code convention in this file lives here).
- **[`blender/`](blender)** — the 3D scene source `sen.blend` (character + camera animation + focus-anchor empties). The source you edit before exporting the glb.
- **[`tutor/`](tutor)** — fork-it-yourself tutorials for users (deployment, stickers, …; more coming).

**Every code / asset path below is relative to `web/`** (e.g. `src/App.tsx` means `web/src/App.tsx`), and npm commands run inside `web/`; docs like `LICENSE` / `NOTICE` / `CLAUDE.md` sit at the repo root.

## Commands

```bash
cd web             # all front-end commands run inside web/
npm install
npm run dev        # dev server at http://localhost:5173 (vite)
npm run build      # type-check + bundle to dist/
npm run preview    # preview the build output
npm run typecheck  # type-check only (tsc -b)
npm run lint       # ESLint (lightweight; `any` in the scene is allowed)
```

No tests. Linting is `npm run lint` (lightweight ESLint, `no-explicit-any` disabled to fit the scene code), type-checking is `npm run typecheck`; after editing, verify visually in the browser via `npm run dev`.

## Architecture

- **Pure front-end SPA**: `index.html` → `src/main.tsx` → `src/App.tsx` (one fixed `<Canvas>` 3D background + a scrollable HTML overlay). No backend, no router.
- **3D background**: `src/scene/Scene.tsx` — loads `public/models/me.glb` and, using the glb's own camera animation, wipes through it in 5 scroll-driven segments, layering auto-focus depth-of-field and eye-follows-cursor on top. Lighting comes from `src/scene/Env.tsx` (`public/textures/env.hdr` as IBL).
- **Scroll content**: `Hero` in `App.tsx` (About copy lives in `COPY`) → `src/ui/Resume.tsx` (résumé timeline) → `src/ui/Works.tsx` (works gallery + detail modal) → `src/ui/Closing.tsx` (about / vision / contact + footer). Site language is Arabic (RTL) only; the `Lang` type and `dirOf` live in `src/i18n.ts`.
- **Overlays**: `LoadingScreen` (masks the screen until the model finishes loading), `NoiseOverlay` (film grain), scroll-darken / frosted right rail / hero decorative frame (all in `App.tsx`).
- **Global state**: `src/store.ts` (zustand, lightweight).

## TypeScript conventions

This project is TypeScript (`strict` on). `App` / `ui` / `data` / `store` are fully typed (data shapes and component props are annotated); the imperative Three.js code in `Scene.tsx` (the `traverse` callback, glb camera / eye objects, DOM refs, etc.) is loosened with a few `any`s — follow that style, don't hard-type the 3D internals just to eliminate `any`. Make sure `npm run typecheck` passes after edits.

## Scene parameters (look here to change the look)

Every tunable in the scene (lights, camera, depth-of-field, Bloom, character position, background gradient, etc.) is a **plain constant** at the top of the relevant component in `Scene.tsx` (e.g. `const cam = { damping: 0.1, ... }`, `const top = '#6f906f'`). To change the default look, edit those constant values directly — there is no tweak panel or extra config file.

## Works content system (look here to change content)

- **List**: `src/data/works.ts` — section / work titles, meta, tags, external links, and cover mapping (`SECTION_COVERS`). Pure data; `Works.tsx` only renders it.
- **Detail**: one `src/content/works/<slug>.md` per work (frontmatter + markdown, spec in `src/data/workDocs.ts`), linked via the `slug` on each item in works.ts.
  - **This repo ships without concrete work details**: `content/works/` has only an `example.md` template (its slug matches no work, so it never renders); opening a detail falls back to a **shared placeholder** (intro text + image/video placeholder + empty jump button, copy in `works.ts`'s `detailPlaceholder / phImageLabel / phButtonLabel`). Drop in a `<slug>.md` following `example.md` to render a full detail.
- **Media**: put images / videos in `public/works/<slug>/` and reference them from the md with `/works/...` absolute paths. `public/works/` is gitignored by default (only the 4 section `covers/` are kept), see `.gitignore`.

## Rendering pipeline notes

- Post-processing is in `Scene.tsx`'s `<EffectComposer>`: order is DepthOfField → Bloom → SMAA; mind the order when changing effects, it affects compositing.
- Shadows: the `App.tsx` Canvas uses `shadows={PCFShadowMap}`, the character has `castShadow / receiveShadow`; camera motion is driven mainly by me.glb's glb animation + scroll.
- `base: './'` (`vite.config.ts`): output uses relative paths, deployable to any subdirectory; at runtime public assets are joined with `import.meta.env.BASE_URL`.

## Making it yours after a fork

- Swap the 3D character: replace `public/models/me.glb` (its source is `blender/sen.blend` at the repo root — edit it in Blender and export the glb), or rewrite `Scene.tsx` to use your own scene. The code looks these up in the glb **by object name**; whatever is missing, that feature breaks:
  - **Camera + camera-animation clip named `CameraAction`** — the scroll-driven camera path (played by wiping frame-by-frame through `useGLTF`'s `animations`). Its total frame count is read at runtime (24fps), not hardcoded.
  - **`focus-start`** (or `focus-0`) — the hero's starting focus anchor (an empty); both names are accepted.
  - **The timeline focus anchors** (empties) — one per résumé entry, listed in order in **`src/data/focusPoints.ts`** (`FOCUS_POINTS`, the single source of truth shared by `Scene.tsx` and `Resume.tsx`). The count is dynamic: change the list + `Resume.tsx`'s entries together and everything (node count, frame ranges) adapts. This repo ships `focus-1 / focus-2 / focus-3 / focus-4 / focus-5` (the hero anchor uses `focus-0`).
  - **`focus-works`** — the works-section focus anchor (an empty); optional — if absent, the works section reuses the last timeline anchor.
  - **A mesh whose name contains `eye`** — the eyes, used for eye-follows-cursor.
  - (Note: wind sway was removed, so a mesh named `man` is no longer needed.)
  - **Camera frame convention** (for authoring the `CameraAction` clip): frame `0` = hero (`focus-start`); frame `50·k` = the k-th timeline node; the **last frame** = works (`focus-works`). So each node is 50 frames apart, and the tail from the last node to the last frame is the works segment (any length).
- Edit the résumé in `src/ui/Resume.tsx`; works in `src/data/works.ts` + `src/content/works/*.md`; About in `App.tsx`'s `COPY`.
- Personal content / assets / the character model are copyright of the original author and **not covered by MIT** (see `NOTICE`) — after forking, be sure to replace them with your own.
