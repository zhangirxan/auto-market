export const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
export const BODIES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Wagon', 'Pickup']
export const TRANSMISSIONS = ['Automatic', 'Manual']
export const COLORS = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Yellow', 'Beige']
export const CITIES = ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe', 'Atyrau', 'Pavlodar', 'Kostanay']

const MODELS = [
  { make: 'Toyota', model: 'Camry', body: 'Sedan', price: 32000, fuels: ['Petrol', 'Hybrid'], hp: [181, 301], color: 'Silver', photo: 'a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg' },
  { make: 'Toyota', model: 'Corolla', body: 'Sedan', price: 23000, fuels: ['Petrol', 'Hybrid'], hp: [122, 169], color: 'White', photo: 'f/fe/Toyota_Corolla_Hybrid_%28E210%29_IMG_4338.jpg' },
  { make: 'Toyota', model: 'RAV4', body: 'SUV', price: 33000, fuels: ['Petrol', 'Hybrid'], hp: [173, 219], color: 'Silver', photo: '2/2d/2024_Toyota_RAV4_Prime_XSE_Premium_in_Silver_Sky_with_Midnight_Black_roof%2C_front_left.jpg' },
  { make: 'Toyota', model: 'Land Cruiser', body: 'SUV', price: 85000, fuels: ['Petrol', 'Diesel'], hp: [249, 409], color: 'White', photo: '6/6d/2021_Toyota_Land_Cruiser_300_3.4_ZX_%28Colombia%29_front_view_04.png' },
  { make: 'Toyota', model: 'Hilux', body: 'Pickup', price: 38000, fuels: ['Diesel'], hp: [150, 204], color: 'White', photo: '1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg' },
  { make: 'Lexus', model: 'RX', body: 'SUV', price: 58000, fuels: ['Petrol', 'Hybrid'], hp: [238, 366], color: 'White', photo: 'a/af/Lexus_RX_500h_F_SPORT%2B_%28V%29_%E2%80%93_f_14072024.jpg' },
  { make: 'Hyundai', model: 'Elantra', body: 'Sedan', price: 22000, fuels: ['Petrol'], hp: [128, 201], color: 'Silver', photo: 'a/a4/2023_Hyundai_Elantra_Limited_in_Silver%2C_front_left%2C_04-04-2026.jpg' },
  { make: 'Hyundai', model: 'Tucson', body: 'SUV', price: 30000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [150, 230], color: 'Gray', photo: '6/61/Hyundai_Tucson_1.6_T-GDI_PHEV_Prime_%28IV%29_%E2%80%93_f_05072025.jpg' },
  { make: 'Hyundai', model: 'Santa Fe', body: 'SUV', price: 38000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [180, 277], color: 'Gray', photo: 'e/e6/2024_Hyundai_Santa_Fe_Luxury_AWD_in_Hampton_Grey%2C_front_left%2C_2024-06-30.jpg' },
  { make: 'Kia', model: 'Rio', body: 'Hatchback', price: 17000, fuels: ['Petrol'], hp: [100, 123], color: 'Blue', photo: 'c/c4/2021_Kia_Rio_3_MHEV_facelift_1.0.jpg' },
  { make: 'Kia', model: 'K5', body: 'Sedan', price: 27000, fuels: ['Petrol'], hp: [180, 290], color: 'Blue', photo: 'f/ff/2022_Kia_K5_GT-Line_in_Pacific_Blue%2C_Front_Left%2C_09-05-2022.jpg' },
  { make: 'Kia', model: 'Sportage', body: 'SUV', price: 29000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [150, 227], color: 'White', photo: '5/5d/2025_Kia_Sportage_S_front_only.jpg' },
  { make: 'BMW', model: '3 Series', body: 'Sedan', price: 45000, fuels: ['Petrol', 'Diesel'], hp: [156, 382], color: 'Silver', photo: '9/91/BMW_G20_%282022%29_IMG_7316_%282%29.jpg' },
  { make: 'BMW', model: 'X5', body: 'SUV', price: 68000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [249, 523], color: 'Blue', photo: 'f/f1/2019_BMW_X5_M50d_Automatic_3.0.jpg' },
  { make: 'BMW', model: 'M4', body: 'Coupe', price: 80000, fuels: ['Petrol'], hp: [431, 523], color: 'Green', photo: 'e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg' },
  { make: 'Mercedes-Benz', model: 'C-Class', body: 'Sedan', price: 48000, fuels: ['Petrol', 'Diesel'], hp: [156, 258], color: 'Silver', photo: 'b/be/Mercedes-Benz_W206_IMG_6380.jpg' },
  { make: 'Mercedes-Benz', model: 'E-Class', body: 'Sedan', price: 60000, fuels: ['Petrol', 'Diesel', 'Hybrid'], hp: [184, 381], color: 'White', photo: 'f/fd/Mercedes-Benz_W214_1X7A1841.jpg' },
  { make: 'Mercedes-Benz', model: 'G-Class', body: 'SUV', price: 140000, fuels: ['Petrol', 'Diesel'], hp: [245, 585], color: 'Gray', photo: '3/38/Mercedes-Benz_W463_G_350_BlueTEC_01.jpg' },
  { make: 'Audi', model: 'A6', body: 'Sedan', price: 58000, fuels: ['Petrol', 'Diesel'], hp: [190, 340], color: 'Silver', photo: 'e/eb/Audi_A6_C9_IAA_2025_DSC_1920.jpg' },
  { make: 'Audi', model: 'Q7', body: 'SUV', price: 65000, fuels: ['Petrol', 'Diesel'], hp: [249, 340], color: 'Silver', photo: '5/5f/Audi_Q7_4M_FL2_3.0_V6_MHEV_quattro_Satellite_Silver_Metallic_01_%28cropped%29.jpg' },
  { make: 'Volkswagen', model: 'Golf', body: 'Hatchback', price: 26000, fuels: ['Petrol', 'Diesel'], hp: [110, 245], color: 'Silver', photo: '8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg' },
  { make: 'Volkswagen', model: 'Passat', body: 'Wagon', price: 31000, fuels: ['Petrol', 'Diesel'], hp: [150, 272], color: 'White', photo: '9/9b/VW_Passat_Variant_Elegance_%28B9%29_%E2%80%93_f_18052025.jpg' },
  { make: 'Tesla', model: 'Model 3', body: 'Sedan', price: 42000, fuels: ['Electric'], hp: [283, 510], color: 'Red', photo: 'a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg' },
  { make: 'Tesla', model: 'Model Y', body: 'SUV', price: 47000, fuels: ['Electric'], hp: [299, 456], color: 'White', photo: 'e/e7/Tesla_Model_Y_Premium_%28Facelift%29_%E2%80%93_f_05052026.jpg' },
  { make: 'Chevrolet', model: 'Tahoe', body: 'SUV', price: 62000, fuels: ['Petrol'], hp: [355, 420], color: 'White', photo: '2/22/2022_Chevrolet_Tahoe_RST%2C_front_3.7.22.jpg' },
  { make: 'Ford', model: 'Mustang', body: 'Coupe', price: 40000, fuels: ['Petrol'], hp: [315, 480], color: 'Blue', photo: '9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg' },
  { make: 'Ford', model: 'Ranger', body: 'Pickup', price: 35000, fuels: ['Petrol', 'Diesel'], hp: [170, 292], color: 'Yellow', photo: '2/28/Ford_Ranger_%28T6%2C_P703%29_Wildtrak_IMG_7320.jpg' },
  { make: 'Porsche', model: '911', body: 'Coupe', price: 120000, fuels: ['Petrol'], hp: [385, 640], color: 'Green', photo: 'a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg' },
]

export const MAKES = [...new Set(MODELS.map((m) => m.make))].sort()

const wikiPhoto = (path, width) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${width}px-${path.split('/').pop()}`

// seeded random, so everyone gets the same 120 cars
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
      color: m.color,
      city,
      horsepower: between(m.hp[0], m.hp[1]),
      photo: wikiPhoto(m.photo, 500),
      photoLarge: wikiPhoto(m.photo, 960),
      description:
        `${m.color} ${m.make} ${m.model} ${year}, ${transmission.toLowerCase()} gearbox, ` +
        `${fuel.toLowerCase()} engine. ${age <= 3 ? 'Almost new, under warranty.' : 'Regular service, no accidents.'} ` +
        `Located in ${city}, viewing any day.`,
      createdAt: new Date(BASE_DATE - i * 9 * 3600 * 1000).toISOString(),
    }
  })
}
