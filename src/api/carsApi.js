// Simulated REST API: async functions with network delay, random failures,
// JSON storage in localStorage. Search / filter / sort / pagination happen
// here, "on the server", like a real backend would do it.
import { generateSeed } from './seed.js'

const STORAGE_KEY = 'automarket:cars:v2'

// add ?fail=1 to the URL to force every request to fail (handy for showing the error state)
const FAIL_RATE = new URLSearchParams(window.location.search).has('fail') ? 1 : 0.05

function readDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // broken JSON or storage blocked -> start from seed
  }
  const seed = generateSeed()
  writeDb(seed)
  return seed
}

function writeDb(cars) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
  } catch {
    // storage full / blocked: data just won't persist
  }
}

function abortError() {
  return new DOMException('Request aborted', 'AbortError')
}

// fake network: random latency, can be cancelled with an AbortSignal
function network(signal) {
  const ms = 350 + Math.random() * 650
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError())
    const timer = setTimeout(() => {
      if (Math.random() < FAIL_RATE) reject(new Error('Server is not responding. Please try again.'))
      else resolve()
    }, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        reject(abortError())
      },
      { once: true }
    )
  })
}

// JSON round trip so callers never get references to the "database" objects
const clone = (data) => JSON.parse(JSON.stringify(data))

const SORTERS = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'year-desc': (a, b) => b.year - a.year,
  'mileage-asc': (a, b) => a.mileage - b.mileage,
  'power-desc': (a, b) => b.horsepower - a.horsepower,
}

export async function getCars(params = {}, { signal } = {}) {
  await network(signal)
  const {
    search = '', make = '', fuel = '', body = '', maxPrice = '', yearFrom = '',
    sort = 'newest', page = 1, pageSize = 12,
  } = params

  const words = search.toLowerCase().split(/\s+/).filter(Boolean)
  const filtered = readDb().filter((car) => {
    const text = `${car.make} ${car.model} ${car.year} ${car.city} ${car.color}`.toLowerCase()
    return (
      words.every((w) => text.includes(w)) &&
      (!make || car.make === make) &&
      (!fuel || car.fuel === fuel) &&
      (!body || car.body === body) &&
      (!maxPrice || car.price <= Number(maxPrice)) &&
      (!yearFrom || car.year >= Number(yearFrom))
    )
  })

  filtered.sort(SORTERS[sort] ?? SORTERS.newest)

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const items = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  return clone({ items, total, page: safePage, pageSize, totalPages })
}

export async function getCar(id, { signal } = {}) {
  await network(signal)
  const car = readDb().find((c) => c.id === Number(id))
  if (!car) {
    const error = new Error('This listing does not exist or was removed.')
    error.status = 404
    throw error
  }
  return clone(car)
}

export async function createCar(data) {
  await network()
  const cars = readDb()
  const car = {
    ...data,
    id: Math.max(0, ...cars.map((c) => c.id)) + 1,
    createdAt: new Date().toISOString(),
  }
  writeDb([car, ...cars])
  return clone(car)
}

export async function deleteCar(id) {
  await network()
  writeDb(readDb().filter((c) => c.id !== Number(id)))
}
