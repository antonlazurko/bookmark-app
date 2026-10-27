# Bookmarkly

A bookmark manager built with Vue 3, Pinia and Vite. Live demo: https://antonlazurko.github.io/bookmark-app/

Log in, organize links into categories and save bookmarks with a title and preview image. The backend lives in a separate repo: [bookmark-server](https://github.com/antonlazurko/bookmark-server).

## Try it

1. Open the live demo: https://antonlazurko.github.io/bookmark-app/
2. Log in with the demo account:

   | Email                 | Password   |
   | --------------------- | ---------- |
   | `demo@bookmarkly.app` | `demo1234` |

3. Pick a category in the menu (on mobile, open it with the ☰ button) or create your own, then add a bookmark with the **+** card.

> **Heads-up**
>
> - The backend runs on Render's free plan and sleeps when idle, so the first login can take up to a minute. If you see an error, wait a bit and try again.
> - The demo data is shared between all visitors and may be reset at any time, so feel free to add, rename or delete anything.

## Features

- Login with a JWT token that persists across reloads; routes are protected by an auth guard
- Categories: create, rename (the URL follows the new alias) and delete with a confirmation popup
- Bookmarks: add by link, with an optional custom title and image (otherwise the server takes them from the page), open and delete
- Responsive bookmark grid that adapts to the number of cards, with enter / leave animations
- Toast notifications for successful actions and API errors
- Mobile-friendly layout: on phones and tablets the side menu turns into a slide-out drawer (see [Responsive layout](#responsive-layout))

## Tech stack

- [Vue 3](https://vuejs.org/) with `<script setup>`, Composition API and TypeScript
- [Pinia](https://pinia.vuejs.org/) for state, [Vue Router](https://router.vuejs.org/) for routing
- [Axios](https://axios-http.com/) with interceptors for the auth header and toasts
- [Vite](https://vite.dev/) for the dev server and build
- SCSS for component styles
- ESLint, oxlint, Prettier, Husky + lint-staged for code quality
- GitHub Actions + GitHub Pages for deployment

## Getting started

Requirements: Node.js 22.18+ and a running [bookmark-server](https://github.com/antonlazurko/bookmark-server) (local or deployed).

```bash
npm install
cp .env.example .env.local   # then set VITE_API_BASE if the API is not on localhost:3000
npm run dev
```

Without `VITE_API_BASE` the app talks to `http://localhost:3000/api`.

## Scripts

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the dev server                             |
| `npm run build`        | Type-check and build for production into `dist/` |
| `npm run preview`      | Serve the production build locally               |
| `npm run type-check`   | Type-check with `vue-tsc`                        |
| `npm run lint`         | Run oxlint and ESLint with auto-fix              |
| `npm run format`       | Format all files with Prettier                   |
| `npm run format:check` | Check formatting without changing files          |

A pre-commit hook runs ESLint and Prettier on staged files.

## Project structure

```
src/
├── api/                # Axios instance (http.ts) and requests per resource
├── constants.ts        # API base URL, API routes, storage keys
├── directives/         # Global directives (v-focus)
├── interfaces/         # TypeScript types for API data
├── stores/             # Pinia stores: auth, profile, categories, bookmarks, toast
├── router/index.ts     # Routes and the auth / category guard
├── assets/main.scss    # Global styles and CSS variables (colors, font)
├── views/
│   ├── AuthView.vue        # Login form
│   ├── MainView.vue        # Layout: profile + category menu + nested routes
│   ├── IndexView.vue       # Welcome screen
│   ├── CategoryView.vue    # Category header, rename / delete, bookmarks grid
│   ├── AddCategoryView.vue # New category form
│   └── NotFoundView.vue
└── components/
    ├── CategoryList.vue    # Side menu with categories
    ├── BookmarkCard.vue    # Single bookmark
    ├── AddBookmarkCard.vue # "+" card and the new bookmark popup
    ├── PopupBase.vue       # Popup shell: overlay, animation, Esc / outside click
    ├── PopupConfirm.vue    # Confirm dialog built on PopupBase
    ├── ToastContainer.vue
    ├── LoadingSpinner.vue
    ├── Button.vue
    ├── InputDefault.vue
    └── icons/              # SVG icons as components
```

### Data flow

Views call Pinia store actions, stores call functions from `src/api/`, and those use the shared Axios instance from `api/http.ts`:

- the request interceptor adds `Authorization: Bearer <token>` from `localStorage`
- the response interceptor shows a success toast when a request passes `successMessage`, and an error toast for any failed request (unless `silent: true`)

### Responsive layout

Styles are desktop-first, with media queries inside each component. Two breakpoints are used:

| Breakpoint | Changes                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `≤ 768px`  | The side menu becomes a drawer opened from a sticky header with a burger button. It closes on navigation, overlay click or `Esc`, and page scroll is locked while it is open. Forms wrap the label above the input; smaller paddings and headings |
| `≤ 480px`  | Bookmarks go into a single column, toasts span the screen width, smaller titles on the login and 404 pages                                                                                                                                        |

Also:

- Hover zoom on buttons and menu links only applies on devices with a mouse (`@media (hover: hover)`), so it doesn't stick after a tap
- Inputs use a 16px font on mobile so iOS Safari doesn't zoom in on focus
- Popups fit the screen with a 16px margin at any width

## Deployment

Each push to `master` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which lints, checks formatting, type-checks, builds and publishes the app to GitHub Pages.

One-time setup in the GitHub repository: **Settings → Pages → Source**: select **GitHub Actions**.

The production API URL is set in [`.env.production`](.env.production), which Vite loads on `vite build`. It is not a secret: the URL ends up in the client bundle anyway. Change it there if the backend moves.

The build uses `base: '/bookmark-app/'` (see [`vite.config.ts`](vite.config.ts)). If the repository is renamed, update `base` to match.

GitHub Pages has no SPA routing, so the workflow copies `index.html` to `404.html`. Opening a deep link like `/bookmark-app/main/work` loads the app and Vue Router shows the right page.

> **Note:** the backend on Render's free plan sleeps when idle, so the first request after a pause can take up to a minute.
