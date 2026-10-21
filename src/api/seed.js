// Generates the initial 120 listings. Uses a seeded random generator,
// so every visitor gets exactly the same data on first launch.

export const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
export const BODIES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Wagon', 'Pickup']
export const TRANSMISSIONS = ['Automatic', 'Manual']
export const COLORS = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Beige']
export const CITIES = ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe', 'Atyrau', 'Pavlodar', 'Kostanay']

const MODELS = [
  { make: 'Toyota', model: 'Camry', body: 'Sedan', price: 32000, fuels: ['Petrol', 'Hybrid'], hp: [181, 301] },
  { make: 'Toyota', model: 'Corolla', body: 'Sedan', price: 23000, fuels: ['Petrol', 'Hybrid'], hp: [122, 169] },
  { make: 'Toyota', model: 'RAV4', body: 'SUV', price: 33000, fuels: ['Petrol', 'Hybrid'], hp: [173, 219] },
  { make: 'Toyota', model: 'Land Cruiser', body: 'SUV', price: 85000, fuels: ['Petrol', 'Diesel'], hp: [249, 409] },
  { make: 'Toyota', model: 'Hilux', body: 'Pickup', price: 38000, fuels: ['Diesel'], hp: [150, 204] },
  { make: 'Lexus', model: 'RX', body: 'SUV', price: 58000, fuels: ['Petrol', 'Hybrid'], hp: [238, 366] },
  { make: 'Hyundai', model: 'Elantra', body: 'Sedan', price: 22000, fuels: ['Petrol'], hp: [128, 201] },
  { make: 'Hyundai', model: 'Tucson', body: 'SUV', price: 30000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [150, 230] },
  { make: 'Hyundai', model: 'Santa Fe', body: 'SUV', price: 38000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [180, 277] },
  { make: 'Kia', model: 'Rio', body: 'Hatchback', price: 17000, fuels: ['Petrol'], hp: [100, 123] },
  { make: 'Kia', model: 'K5', body: 'Sedan', price: 27000, fuels: ['Petrol'], hp: [180, 290] },
  { make: 'Kia', model: 'Sportage', body: 'SUV', price: 29000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [150, 227] },
  { make: 'BMW', model: '3 Series', body: 'Sedan', price: 45000, fuels: ['Petrol', 'Diesel'], hp: [156, 382] },
  { make: 'BMW', model: 'X5', body: 'SUV', price: 68000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [249, 523] },
  { make: 'BMW', model: 'M4', body: 'Coupe', price: 80000, fuels: ['Petrol'], hp: [431, 523] },
  { make: 'Mercedes-Benz', model: 'C-Class', body: 'Sedan', price: 48000, fuels: ['Petrol', 'Diesel'], hp: [156, 258] },
  { make: 'Mercedes-Benz', model: 'E-Class', body: 'Sedan', price: 60000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [184, 381] },
  { make: 'Mercedes-Benz', model: 'G-Class', body: 'SUV', price: 140000, fuels: ['Petrol', 'Diesel'], hp: [245, 585] },
  { make: 'Audi', model: 'A6', body: 'Sedan', price: 58000, fuels: ['Petrol', 'Diesel'], hp: [190, 340] },
  { make: 'Audi', model: 'Q7', body: 'SUV', price: 65000, fuels: ['Petrol', 'Diesel'], hp: [249, 340] },
  { make: 'Volkswagen', model: 'Golf', body: 'Hatchback', price: 26000, fuels: ['Petrol', 'Diesel'], hp: [110, 245] },
  { make: 'Volkswagen', model: 'Passat', body: 'Wagon', price: 31000, fuels: ['Petrol', 'Diesel'], hp: [150, 272] },
  { make: 'Tesla', model: 'Model 3', body: 'Sedan', price: 42000, fuels: ['Electric'], hp: [283, 510] },
  { make: 'Tesla', model: 'Model Y', body: 'SUV', price: 47000, fuels: ['Electric'], hp: [299, 456] },
  { make: 'Chevrolet', model: 'Tahoe', body: 'SUV', price: 62000, fuels: ['Petrol'], hp: [355, 420] },
  { make: 'Ford', model: 'Mustang', body: 'Coupe', price: 40000, fuels: ['Petrol'], hp: [315, 480] },
  { make: 'Ford', model: 'Ranger', body: 'Pickup', price: 35000, fuels: ['Petrol', 'Diesel'], hp: [170, 292] },
  { make: 'Porsche', model: '911', body: 'Coupe', price: 120000, fuels: ['Petrol'], hp: [385, 640] },
]

export const MAKES = [...new Set(MODELS.map((m) => m.make))].sort()

// mulberry32: tiny seeded PRNG
function createRandom(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CURRENT_YEAR = 2026
const BASE_DATE = Date.UTC(2026, 9, 1)

export function generateSeed(count = 120) {
  const rand = createRandom(2026)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const between = (min, max) => Math.round(min + rand() * (max - min))

  return Array.from({ length: count }, (_, i) => {
    const m = pick(MODELS)
    const year = between(2010, 2025)
    const age = CURRENT_YEAR - year
    const fuel = pick(m.fuels)
    const mileage = Math.round((age * between(7000, 22000)) / 500) * 500
    const price = Math.round((m.price * 0.93 ** age * (0.9 + rand() * 0.2)) / 100) * 100
    const transmission = fuel === 'Electric' || rand() < 0.8 ? 'Automatic' : 'Manual'
    const color = pick(COLORS)
    const city = pick(CITIES)

    return {
      id: i + 1,
      make: m.make,
      model: m.model,
      year,
      price,
      mileage,
      fuel,
      body: m.body,
      transmission,
      color,
      city,
      horsepower: between(m.hp[0], m.hp[1]),
      description:
        `${color} ${m.make} ${m.model} ${year}, ${transmission.toLowerCase()} gearbox, ` +
        `${fuel.toLowerCase()} engine. ${age <= 3 ? 'Almost new, under warranty.' : 'Regular service, no accidents.'} ` +
        `Located in ${city}, viewing any day.`,
      createdAt: new Date(BASE_DATE - i * 9 * 3600 * 1000).toISOString(),
    }
  })
}
