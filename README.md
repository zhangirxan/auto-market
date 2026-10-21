# AutoMarket — React Midterm Project

A car marketplace SPA: browse 120+ used-car listings from cities across Kazakhstan, search,
filter, sort, open a listing, publish your own car or remove a listing.

**Live demo:** https://zhangirxan.github.io/auto-market/

**Repository:** https://github.com/zhangirxan/auto-market

## Features

- **Catalog** with search (debounced), 5 filters (make, body, fuel, max price, year), 6 sort options and pagination (12 per page)
- **Details page** for every car with specs, description and "More from this make"
- **Sell your car** — controlled form with validation and a live preview card
- **Remove listing** with an inline confirmation
- Loading, error (with retry), empty and success states everywhere
- Responsive layout (desktop / tablet / phone)

## Tech

React 19 + Vite. Only `useState`, `useEffect` and `useCallback`. No router library, no UI kit,
no direct DOM manipulation.

## Data source — simulated API

`src/api/carsApi.js` behaves like a REST backend:

- every call returns a Promise with a random **350–1000 ms delay**;
- data is stored as **JSON in `localStorage`** (`automarket:cars:v2`);
- on first launch it is seeded with **120 listings** generated in `src/api/seed.js`
  (seeded random, so everyone gets the same data);
- **search, filtering, sorting and pagination are done by the API**, the UI only sends the query
  and renders `{ items, total, page, totalPages }`;
- ~5% of requests fail randomly. Open the app with **`?fail=1`** (https://zhangirxan.github.io/auto-market/?fail=1) to make every request fail and see the error state;
- requests accept an `AbortSignal`, so outdated requests can be cancelled.

To get the initial data back, clear the site's localStorage.

## Project structure

```
src/
├── api/
│   ├── seed.js            # 120 initial records + option lists
│   └── carsApi.js         # simulated API: getCars, getCar, createCar, deleteCar
├── hooks/
│   └── useHashRoute.js    # tiny hash router (#/, #/cars/:id, #/sell)
├── components/            # reusable UI
│   ├── Header.jsx
│   ├── SearchBar.jsx      # controlled input + debounce
│   ├── FilterPanel.jsx
│   ├── SortSelect.jsx
│   ├── Pagination.jsx
│   ├── CarCard.jsx
│   ├── CarImage.jsx       # SVG car drawn by body type and color
│   ├── SimilarCars.jsx
│   ├── FormField.jsx
│   ├── StatusView.jsx     # Loader / ErrorState / EmptyState
│   └── Toast.jsx
├── pages/
│   ├── CatalogPage.jsx    # list view
│   ├── CarDetailsPage.jsx # detail view
│   └── SellPage.jsx       # add form
├── utils/format.js
├── App.jsx
└── main.jsx
```

## Where state lives and why

| State | Component | Why there |
|---|---|---|
| `query` (search, filters, sort, page) | `App` | must survive going to a car page and back — `CatalogPage` unmounts, `App` doesn't |
| current route | `useHashRoute` in `App` | decides which page is rendered |
| toast `notice` | `App` | set by Sell / Details pages, shown above all pages |
| `result`, `status`, `error` of the list | `CatalogPage` | only the catalog needs them |
| search input text | `SearchBar` | changes on every keystroke; only the debounced value goes up |
| `car`, delete confirmation | `CarDetailsPage` | belongs to one listing |
| form fields, `saving`, `saveError` | `SellPage` | only the form needs them |

## Effects and cleanup

| Effect | Dependencies | Cleanup |
|---|---|---|
| load list (`CatalogPage`) | `[query, reloadKey]` | `AbortController.abort()` — cancels the old request when the query changes, so a slow stale response can't overwrite a newer one |
| load car (`CarDetailsPage`) | `[id, reloadKey]` | abort |
| similar cars (`SimilarCars`) | `[make, excludeId]` | abort |
| search debounce (`SearchBar`) | `[text, value, onSearch]` | `clearTimeout` — every keystroke cancels the previous timer |
| hash listener (`useHashRoute`) | `[]` | `removeEventListener` |
| toast auto-hide (`Toast`) | `[message, onClose]` | `clearTimeout` |
| scroll to top on page change (`App`) | `[route.name, route.id]` | — |

## Keys and component identity

- Lists use stable ids: `key={car.id}`.
- `<CarDetailsPage key={route.id} />` — opening another car creates a fresh page, so its state
  (loaded car, delete confirmation) is reset instead of leaking from the previous car.
- `<SearchBar key={resetVersion} />` — "Reset filters" bumps `resetVersion`, the search bar remounts
  and its local text is cleared.
- `<Toast key={notice.id} />` — a new message restarts the auto-hide timer.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

Builds the app and publishes `dist` to the `gh-pages` branch (GitHub Pages).
