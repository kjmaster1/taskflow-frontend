# Taskflow Frontend

A production-grade React + TypeScript frontend for the [Taskflow API](https://github.com/kjmaster1/taskflow) — a multi-tenant task and workflow management application.

**Live:** https://taskflow-frontend-production-767c.up.railway.app  
**Backend:** https://github.com/kjmaster1/taskflow

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Static type safety |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| Lucide React | Icon library |

---

## Architecture

### Feature-Based Structure

```
src/
├── api/                  # Typed API layer
│   ├── axios.ts          # Axios instance with 401 interceptor
│   ├── auth.ts           # Authentication endpoints
│   ├── projects.ts       # Project CRUD endpoints
│   └── tasks.ts          # Task CRUD endpoints
├── components/
│   ├── projects/         # Project-specific components
│   │   ├── ProjectCard.tsx
│   │   └── CreateProjectModal.tsx
│   ├── tasks/            # Task-specific components
│   │   ├── TaskCard.tsx
│   │   └── CreateTaskModal.tsx
│   └── ui/               # Reusable component library
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── ErrorBanner.tsx
│       └── Spinner.tsx
├── context/
│   └── AuthContext.tsx   # Global auth state via React Context
├── hooks/
│   ├── useProjects.ts    # Project data fetching and mutations
│   └── useTasks.ts       # Task data fetching and mutations
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   └── ProjectPage.tsx
└── types/
    └── index.ts          # Shared TypeScript interfaces
```

### Key Design Decisions

**TypeScript throughout** — all API requests and responses are fully typed. Accessing a non-existent field on an API response is a compile error, not a silent runtime bug.

**Separated API layer** — `src/api/` encapsulates all HTTP calls behind typed functions. Pages and hooks never call Axios directly. This means changing an endpoint URL or request shape requires a change in one place.

**Custom hooks for data fetching** — `useProjects` and `useTasks` own their loading, error, and data state. Pages are kept clean — they consume hooks and render UI, with no data fetching logic mixed in.

**Reusable component library** — `Button`, `Input`, `Modal`, `ErrorBanner`, and `Spinner` are generic, reusable components with consistent prop interfaces. No copy-pasted JSX across pages.

**HttpOnly cookie authentication** — the JWT is stored in an HttpOnly cookie set by the backend. JavaScript cannot read it, eliminating the XSS attack surface entirely. `withCredentials: true` on the Axios instance ensures the browser includes the cookie on every cross-origin request automatically.

**401 interceptor** — a global Axios response interceptor catches 401 errors across the entire application. Stale auth state is cleared and the user is redirected to login without any per-page handling required.

**GuestRoute + ProtectedRoute** — authenticated users visiting `/login` or `/register` are redirected to the dashboard. Unauthenticated users visiting any protected route are redirected to login.

---

## Workflow Engine UI

The project detail page reflects the backend's state machine directly. Tasks move through three states in order:

```
TODO → IN_PROGRESS → DONE
```

Each transition sets timestamps on the backend (`startedAt`, `completedAt`) which are displayed on the task card. Invalid transitions are rejected by the backend and surfaced as error messages in the UI.

---

## Running Locally

**Prerequisites:** Node.js 18+, the [Taskflow API](https://github.com/kjmaster1/taskflow) running locally on port 8081.

```bash
git clone https://github.com/kjmaster1/taskflow-frontend
cd taskflow-frontend
npm install
```

Create `.env.local`:

```
VITE_API_URL=http://localhost:8081
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the Taskflow API | `https://taskflow-production-7b8c.up.railway.app` |

---

## Deployment

The frontend is deployed on [Railway](https://railway.app) using the following configuration:

**Build command:** `npm run build`  
**Start command:** `npm run preview -- --host --port $PORT`

Set `VITE_API_URL` to the backend Railway URL in the Railway environment variables dashboard.

The backend must have the frontend's Railway domain in its CORS allowed origins.

---

## Related

- **Backend repository:** https://github.com/kjmaster1/taskflow
- **Backend live URL:** https://taskflow-production-7b8c.up.railway.app
