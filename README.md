# Asymmetry

## Web development setup

### Backend
- Copy `web/backend/.env.example` to `web/backend/.env`
- `npm install` then `npm run dev` inside `web/backend`

### Frontend
- `npm install` then `npm run dev` inside `web/frontend/vite-project`

## Data flow
- The frontend calls `/api/*` routes. Vite proxies these requests to the backend during development.
- The backend exposes `/api` routes, uses MongoDB for persistence, and maps requests to the `User` and `Entry` models.
- In development, the backend reverse-proxies non-API requests to the Vite dev server. In production, it serves the built frontend from `web/frontend/vite-project/dist`.
