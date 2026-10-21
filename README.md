# AutoMarket

React midterm project. A car marketplace where you can browse used cars from cities across
Kazakhstan, search and filter them, open a listing, sell your own car with a photo or remove a listing.

Live: https://zhangirxan.github.io/auto-market/

## Features

- Catalog: search, 5 filters (make, body, fuel, max price, year), 6 sort options, pagination (12 per page)
- Car page with photo, specs, description and other cars of the same make
- "Sell your car" form with validation, photo upload and live preview
- Remove a listing (with confirmation)
- Loading, error, empty and success states
- Works on desktop and phone

React 19 + Vite. Hooks: `useState`, `useEffect`, `useCallback`, `useRef`. No router library, no UI kit.

## Data

There is no backend, `src/api/carsApi.js` works like one:

- every request returns a Promise and takes 350–1000 ms
- data is kept as JSON in `localStorage` (key `automarket:cars:v3`)
- on the first visit it is filled with **120 cars** from `src/api/seed.js` (seeded random, so the data is the same for everyone)
- search, filters, sorting and pagination are done inside the API, the page only sends a query and gets back `{ items, total, page, totalPages }`
- requests can be cancelled with an `AbortSignal`
- open the app with `?fail=1` to make every request fail and see the error state:
  https://zhangirxan.github.io/auto-market/?fail=1

Uploaded photos are resized to max 1000 px and saved as JPEG data URLs together with the listing.
To reset the data, clear the site's localStorage.

Car photos for the initial data are from [Wikimedia Commons](https://commons.wikimedia.org/) (CC licenses).
If a photo can't load, a drawn car in the right color is shown instead.

## Structure

```
src/
├── api/
│   ├── seed.js            120 initial cars, lists of makes / fuels / cities
│   └── carsApi.js         getCars, getCar, createCar, deleteCar
├── hooks/
│   └── useHashRoute.js    #/  #/cars/:id  #/sell
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── SortSelect.jsx
│   ├── Pagination.jsx
│   ├── CarCard.jsx
│   ├── CarImage.jsx       photo, or a drawing if there is none
│   ├── PhotoPicker.jsx
│   ├── SimilarCars.jsx
│   ├── FormField.jsx
│   ├── StatusView.jsx     Loader / ErrorState / EmptyState
│   └── Toast.jsx
├── pages/
│   ├── CatalogPage.jsx    list
│   ├── CarDetailsPage.jsx details
│   └── SellPage.jsx       add form
├── utils/format.js
├── App.jsx
└── main.jsx
```

## State

| State | Where | Why |
|---|---|---|
| `query` (search, filters, sort, page) | `App` | has to survive opening a car and going back: `CatalogPage` unmounts, `App` doesn't |
| route | `useHashRoute` in `App` | picks the page |
| `notice` (toast) | `App` | set from Sell and Details pages, shown on top of everything |
| list `result`, `status`, `error` | `CatalogPage` | only the catalog uses them |
| search text | `SearchBar` | changes on every key, only the final value goes up |
| `car`, delete confirmation | `CarDetailsPage` | belongs to one listing |
| form fields, `saving`, `saveError` | `SellPage` | only the form uses them |
| `busy`, `error` of the photo | `PhotoPicker` | only the picker uses them |

## Effects

| Effect | Dependencies | Cleanup |
|---|---|---|
| load list (`CatalogPage`) | `[query, reloadKey]` | abort the request, so an old slow response can't replace a newer one |
| load car (`CarDetailsPage`) | `[id, reloadKey]` | abort |
| similar cars (`SimilarCars`) | `[make, excludeId]` | abort |
| search debounce (`SearchBar`) | `[text, value, onSearch]` | `clearTimeout` |
| hash listener (`useHashRoute`) | `[]` | `removeEventListener` |
| toast auto-hide (`Toast`) | `[message, onClose]` | `clearTimeout` |
| scroll to top (`App`) | `[route.name, route.id]` | — |

If the user picks two photos quickly, `PhotoPicker` only keeps the result of the last pick.

## Keys

- lists use ids: `key={car.id}`
- `<CarDetailsPage key={route.id} />`: another car means a fresh page, nothing is left from the previous one
- `<SearchBar key={resetVersion} />`: "Reset filters" remounts the search bar and clears its text
- `<Toast key={notice.id} />`: a new message restarts the timer

## Run

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

Builds the app and pushes `dist` to the `gh-pages` branch.
