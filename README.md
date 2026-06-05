# Asymmetry

## Web development setup

### Backend
- Copy `web/backend/.env.example` to `web/backend/.env`
- `npm install` then `npm run dev` inside `web/backend`

### Frontend
- `npm install` then `npm run dev` inside `web/frontend/vite-project`
- Optional: set `VITE_BACKEND_URL` in `web/frontend/vite-project/.env` to override the proxy target

## Data flow
- The frontend calls `/api/*` routes. Vite proxies these requests to the backend during development.
- The backend exposes `/api` routes, uses MongoDB for persistence, and maps requests to the `User` and `Entry` models.
- In development, the backend reverse-proxies non-API requests to the Vite dev server. In production, it serves the built frontend from `web/frontend/vite-project/dist`.

## Stitch 2.0 MCP integration plan (frontend discovery)

Use Stitch as the source of truth for UI design and implement React screens from it in `web/frontend/vite-project`.

### 1) Configure Stitch MCP access safely
- Do **not** commit Stitch API keys in code, docs, or `.env.example`.
- Store credentials in the GitHub `copilot` environment (Secrets/Variables) and pass them at runtime.
- MCP server endpoint used for Stitch: `https://stitch.googleapis.com/mcp`.

### 2) Proposed frontend structure for Stitch-driven UI
- `src/pages/` for route-level screens from Stitch (Home, Results, Scraper, etc.).
- `src/components/` for reusable design components (cards, filters, nav, layout blocks).
- `src/features/results/` for result-type specific views and state.
- `src/services/api/` for backend calls (`/api/results`, `/api/scraper`, `/api/users`, `/api/entries`).
- `src/styles/tokens.css` for Stitch-derived design tokens (color, spacing, typography).

### 3) Recommended implementation flow from Stitch designs
1. Extract design tokens and component specs from Stitch via MCP.
2. Build a reusable component layer first (buttons, cards, section headers, result list blocks).
3. Implement route screens with real API wiring.
4. Add responsive behavior matching Stitch constraints.
5. Validate with `npm run lint` and `npm run build`.

### 4) I    mmediate next coding steps
- Replace the default Vite starter UI in `src/App.jsx` with app layout + routing shell.
- Implement type-ordered results UI using backend result types (`hackathon`, `job`, `funding`, `scholarship`, `seminar`, `idea`).
- Add loading/error/empty states for scraper and results pages.
- Keep business logic in backend controllers/services; frontend should focus on rendering and interaction.
