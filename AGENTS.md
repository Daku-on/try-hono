# Repository Guidelines

## Project Structure & Module Organization
- `index.js`: Hono app entry (Node runtime).
- `build.js`: Static site generator; outputs to `dist/`.
- `dist/`: Build artifacts for Cloudflare Pages.
- `posts/`: Markdown posts with frontmatter (kebab-case filenames).
- `templates/`: HTML template modules (e.g., `layout.js`).
- `utils/`: Blog helpers (e.g., `blog.js`).

## Build, Test, and Development Commands
- `npm run dev`: Start local server with Hono (`node index.js`).
- `npm start`: Alias of `dev`.
- `npm run build`: Generate static site into `dist/` via `build.js`.
- `npm test`: Not configured yet (exits with error).

Examples:
```bash
npm install
npm run dev   # http://localhost:3000
npm run build # writes to ./dist
```

## Coding Style & Naming Conventions
- **Language**: Modern JS (ES Modules, `type: module`).
- **Indentation**: 2 spaces; keep lines under ~100 chars.
- **Naming**: Files/functions in `lowerCamelCase`; posts in `kebab-case.md`.
- **Imports**: Use relative ESM paths; avoid default-exports for shared utils.
- **Formatting**: No linter configured—match existing style and run Prettier locally if desired.

## Testing Guidelines
- No test framework configured. If adding tests:
  - Use `vitest` or `jest` with ESM support.
  - Name files `*.test.js` alongside sources in `utils/`.
  - Provide minimal fixtures in `posts/fixtures/` for parsing logic.

## Commit & Pull Request Guidelines
- **Commits**: Short, imperative messages; emoji prefix ok (e.g., `🎯 Fix 404 generation`).
- **Branches**: `feat/*`, `fix/*`, or `chore/*`.
- **PRs**: Include purpose, before/after notes, linked issues, and screenshots for UI.
- **Checks**: Ensure `npm run build` succeeds and `dist/` renders key routes locally.

## Security & Configuration Tips
- Do not commit secrets; this app needs none for local use.
- For Cloudflare Pages, ensure `dist/` contains `index.html` and 404 handling per `build.js`.
- Validate frontmatter fields in posts to avoid runtime errors (title, date, tags).
